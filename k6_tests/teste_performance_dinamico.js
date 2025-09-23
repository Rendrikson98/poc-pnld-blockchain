import { check, sleep } from 'k6';
import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

// Métricas customizadas para análise detalhada
const dataAccuracyRate = new Rate('data_accuracy_rate');
const responseValidationRate = new Rate('response_validation_rate');
const networkLatencyTTFB = new Trend('network_latency_ttfb');
const bandwidthUtilization = new Gauge('bandwidth_utilization_bytes');
const throughputRate = new Counter('throughput_requests_per_second');
const serviceTime = new Trend('service_time_ms');
const errorRate = new Rate('error_rate');
const dataSent = new Counter('data_sent_bytes');
const dataReceived = new Counter('data_received_bytes');

// Configuração do teste com múltiplos cenários
export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Ramp up inicial
    { duration: '2m', target: 10 },   // Carga normal
    { duration: '30s', target: 20 },  // Aumento de carga
    { duration: '2m', target: 20 },   // Carga alta sustentada
    { duration: '30s', target: 50 },  // Pico de carga
    { duration: '1m', target: 50 },   // Teste de estresse
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],           // Taxa de erro < 5%
    http_req_duration: ['p(95)<3000'],        // 95% das requisições < 3s
    http_req_waiting: ['p(95)<1500'],         // 95% TTFB < 1.5s
    data_accuracy_rate: ['rate>0.98'],        // Precisão dos dados > 98%
    response_validation_rate: ['rate>0.98'],  // Validação de resposta > 98%
    error_rate: ['rate<0.05'],                // Taxa de erro customizada < 5%
    network_latency_ttfb: ['p(95)<1000'],     // 95% TTFB < 1s
    service_time_ms: ['p(95)<2500'],          // 95% tempo de serviço < 2.5s
  },
};

// Dados de teste dinâmicos
const testData = {
  edital: {
    id_edital: Math.floor(Math.random() * 1000) + 1,
    title: `Teste Performance K6 - ${new Date().getTime()}`,
    year: 2024 + Math.floor(Math.random() * 3),
    url_document: `https://example.com/document-${Math.random().toString(36).substr(2, 9)}.pdf`,
    ator: "MEC",
    contas_editoras: ["0x4E4452FfDFC74A7F6725d69B9338C8eea74e462d"]
  },
  obra: {
    id_editora: Math.floor(Math.random() * 10) + 1,
    razao_social: `Editora Teste ${Math.random().toString(36).substr(2, 5)}`,
    id_obra: Math.floor(Math.random() * 100) + 1,
    ator: "MEC"
  },
  avaliadores: {
    ids_avaliadores: [1, 2, 3],
    ids_equipes: [1, 2, 3],
    id_obra: Math.floor(Math.random() * 100) + 1,
    ator: "MEC"
  }
};

// Função para validar resposta com métricas detalhadas
function validateResponse(response, expectedStatus = 200, stepName = '') {
  const isValid = response.status === expectedStatus;
  responseValidationRate.add(isValid);

  if (!isValid) {
    console.log(`❌ ${stepName}: Status ${response.status} (esperado: ${expectedStatus})`);
    if (response.body) {
      console.log(`   Resposta: ${response.body.substring(0, 200)}...`);
    }
  } else {
    console.log(`✅ ${stepName}: Status ${response.status} OK`);
  }

  return isValid;
}

// Função para calcular precisão dos dados
function calculateDataAccuracy(response, expectedFields = [], stepName = '') {
  try {
    const data = JSON.parse(response.body);
    let accuracy = 0;
    let presentFields = 0;

    if (expectedFields.length > 0) {
      presentFields = expectedFields.filter(field => {
        const hasField = data.hasOwnProperty(field) || (typeof data === 'object' && data[field] !== undefined);
        return hasField;
      }).length;
      accuracy = presentFields / expectedFields.length;
    } else {
      accuracy = response.status === 200 ? 1 : 0;
    }

    const isAccurate = accuracy > 0.8;
    dataAccuracyRate.add(isAccurate);

    if (!isAccurate) {
      console.log(`⚠️  ${stepName}: Precisão ${(accuracy * 100).toFixed(1)}% (${presentFields}/${expectedFields.length} campos)`);
    }

    return accuracy;
  } catch (e) {
    console.log(`❌ ${stepName}: Erro ao analisar resposta JSON: ${e.message}`);
    dataAccuracyRate.add(false);
    return 0;
  }
}

// Função para registrar métricas de rede e performance
function recordNetworkMetrics(response, stepName = '') {
  const ttfb = response.timings.waiting;
  const duration = response.timings.duration;
  const sending = response.timings.sending;
  const receiving = response.timings.receiving;

  // Métricas de latência
  networkLatencyTTFB.add(ttfb);
  serviceTime.add(duration);

  // Métricas de banda
  const sentBytes = response.body ? response.body.length : 0;
  const receivedBytes = response.body ? response.body.length : 0;

  dataSent.add(sentBytes);
  dataReceived.add(receivedBytes);
  bandwidthUtilization.add(sentBytes + receivedBytes);

  // Log de performance
  console.log(`📊 ${stepName}: TTFB=${ttfb.toFixed(2)}ms, Duration=${duration.toFixed(2)}ms, Size=${(sentBytes + receivedBytes)}bytes`);
}

// Função para extrair ID da resposta
function extractIdFromResponse(response, fieldName = 'event_id') {
  try {
    const data = JSON.parse(response.body);
    return data[fieldName] || data.id || data.eventId || null;
  } catch (e) {
    console.log(`⚠️  Erro ao extrair ID da resposta: ${e.message}`);
    return null;
  }
}

// Função para extrair ID específico para submissão (publisher_id)
function extractSubmissionIdFromResponse(response) {
  try {
    const data = JSON.parse(response.body);
    return data.event_id || data.publisher_id || null;
  } catch (e) {
    console.log(`⚠️  Erro ao extrair ID de submissão: ${e.message}`);
    return null;
  }
}

// Função para extrair ID específico para avaliação (event_id da resposta)
function extractAvaliacaoIdFromResponse(response) {
  try {
    const data = JSON.parse(response.body);
    return data.event_id || null;
  } catch (e) {
    console.log(`⚠️  Erro ao extrair ID de avaliação: ${e.message}`);
    return null;
  }
}

// Função principal do fluxo de teste
export default function () {
  const baseUrl = 'http://localhost:3000/api';
  let editalEventId = null;
  let submissionEventId = null;
  let avaliacaoEventId = null;

  console.log(`\n🚀 Iniciando fluxo de teste - VU ${__VU}, Iteração ${__ITER}`);

  // 1. Receber edital
  console.log('1️⃣  Testando: Receber edital');
  let response = http.post(`${baseUrl}/edital/receber-metadados`, JSON.stringify(testData.edital), {
    headers: { 'Content-Type': 'application/json' },
    tags: { step: 'receber_edital' }
  });

  const step1Valid = validateResponse(response, 201, 'Receber Edital');
  const step1Accuracy = calculateDataAccuracy(response, ['event_id', 'call_id', 'event_type', 'title', 'year', 'actor'], 'Receber Edital');
  recordNetworkMetrics(response, 'Receber Edital');

  if (step1Valid) {
    editalEventId = extractIdFromResponse(response);
    if (editalEventId) {
      console.log(`✅ ID do edital recebido: ${editalEventId}`);
    } else {
      console.log('❌ FALHA: Não foi possível extrair ID do edital. Encerrando fluxo.');
      return; // Encerra o processo se não conseguir extrair o ID
    }
  } else {
    console.log('❌ FALHA: Receber edital falhou. Encerrando fluxo.');
    return; // Encerra o processo se a etapa 1 falhar
  }

  check(response, {
    'Receber edital - Status 201': (r) => r.status === 201,
    'Receber edital - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
    'Receber edital - TTFB < 1.5s': (r) => r.timings.waiting < 1500,
    'Receber edital - Tem corpo da resposta': (r) => r.body && r.body.length > 0,
  });

  errorRate.add(response.status !== 201);
  sleep(1);

  // 2. Atualizar edital
  if (editalEventId) {
    console.log(`2️⃣  Testando: Atualizar edital (ID: ${editalEventId})`);

    const editalUpdate = {
      id_edital: testData.edital.id_edital,
      new_values: {
        ator: "MEC",
        year: testData.edital.year + 1,
        title: `${testData.edital.title} - Atualizado`,
        id_edital: testData.edital.id_edital,
        url_document: testData.edital.url_document
      },
      old_values: {
        ator: "MEC",
        year: testData.edital.year,
        title: testData.edital.title,
        id_edital: testData.edital.id_edital,
        url_document: testData.edital.url_document
      },
      ator: "MEC"
    };

    response = http.put(`${baseUrl}/edital/alterar-edital/${editalEventId}`, JSON.stringify(editalUpdate), {
      headers: { 'Content-Type': 'application/json' },
      tags: { step: 'atualizar_edital' }
    });

    const step2Valid = validateResponse(response, 200, 'Atualizar Edital');
    const step2Accuracy = calculateDataAccuracy(response, ['event_id', 'call_id', 'event_type', 'old_values', 'new_values', 'actor'], 'Atualizar Edital');
    recordNetworkMetrics(response, 'Atualizar Edital');

    check(response, {
      'Atualizar edital - Status 200': (r) => r.status === 200,
      'Atualizar edital - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
    });

    errorRate.add(response.status !== 200);
    sleep(1);
  }

  // 3. Enviar metadados para próxima fase
  if (editalEventId) {
    console.log(`3️⃣  Testando: Enviar metadados para próxima fase (ID: ${editalEventId})`);

    response = http.put(`${baseUrl}/edital/enviar-proxima-fase/${editalEventId}`, JSON.stringify({ ator: "MEC" }), {
      headers: { 'Content-Type': 'application/json' },
      tags: { step: 'enviar_proxima_fase_edital' }
    });

    const step3Valid = validateResponse(response, 201, 'Enviar Próxima Fase Edital');
    const step3Accuracy = calculateDataAccuracy(response, ['event_id', 'publisher_id', 'book_status', 'event_type', 'actor'], 'Enviar Próxima Fase Edital');
    recordNetworkMetrics(response, 'Enviar Próxima Fase Edital');

    if (step3Valid) {
      const newEventId = extractSubmissionIdFromResponse(response);
      if (newEventId) {
        submissionEventId = newEventId;
        console.log(`✅ Novo ID para submissão: ${submissionEventId}`);
      } else {
        console.log('❌ FALHA: Não foi possível extrair ID de submissão. Encerrando fluxo.');
        return; // Encerra o processo se não conseguir extrair o ID
      }
    } else {
      console.log('❌ FALHA: Enviar próxima fase edital falhou. Encerrando fluxo.');
      return; // Encerra o processo se a etapa 3 falhar
    }

    check(response, {
      'Enviar próxima fase edital - Status 201': (r) => r.status === 201,
      'Enviar próxima fase edital - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
    });

    errorRate.add(response.status !== 201);
    sleep(1);
  }

  // 4. Registrar obra
  if (!submissionEventId) {
    console.log('❌ FALHA: ID de submissão não disponível. Encerrando fluxo.');
    return;
  }

  console.log(`4️⃣  Testando: Registrar obra (ID: ${submissionEventId})`);

  response = http.post(`${baseUrl}/submission/registrar-obra/${submissionEventId}`, JSON.stringify(testData.obra), {
    headers: { 'Content-Type': 'application/json' },
    tags: { step: 'registrar_obra' }
  });

  const step4Valid = validateResponse(response, 201, 'Registrar Obra');
  const step4Accuracy = calculateDataAccuracy(response, ['event_id', 'publisher_id', 'publisher_name', 'book_id', 'book_status', 'actor'], 'Registrar Obra');
  recordNetworkMetrics(response, 'Registrar Obra');

  check(response, {
    'Registrar obra - Status 201': (r) => r.status === 201,
    'Registrar obra - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
  });

  errorRate.add(response.status !== 201);
  sleep(1);

  // 5. Emitir relatório (submissão)
  if (!submissionEventId) {
    console.log('❌ FALHA: ID de submissão não disponível. Encerrando fluxo.');
    return;
  }

  console.log(`5️⃣  Testando: Emitir relatório submissão (ID: ${submissionEventId})`);

  const relatorioSubmission = {
    id_obra: testData.obra.id_obra,
    id_editora: testData.obra.id_editora,
    titulo: `Relatório Performance Test - ${new Date().getTime()}`,
    url_documento: `https://example.com/relatorio-${Math.random().toString(36).substr(2, 9)}.pdf`,
    ator: "MEC"
  };

  response = http.put(`${baseUrl}/submission/emitir-relatorio/${submissionEventId}`, JSON.stringify(relatorioSubmission), {
    headers: { 'Content-Type': 'application/json' },
    tags: { step: 'emitir_relatorio_submission' }
  });

  const step5Valid = validateResponse(response, 200, 'Emitir Relatório Submissão');
  const step5Accuracy = calculateDataAccuracy(response, ['event_id', 'publisher_id', 'book_id', 'book_status', 'document_url', 'actor'], 'Emitir Relatório Submissão');
  recordNetworkMetrics(response, 'Emitir Relatório Submissão');

  check(response, {
    'Emitir relatório submissão - Status 200': (r) => r.status === 200,
    'Emitir relatório submissão - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 6. Enviar para próxima fase (submissão)
  if (!submissionEventId) {
    console.log('❌ FALHA: ID de submissão não disponível. Encerrando fluxo.');
    return;
  }

  console.log(`6️⃣  Testando: Enviar para próxima fase submissão (ID: ${submissionEventId})`);

  const proximaFaseSubmission = {
    id_edital: testData.edital.id_edital,
    id_book: Math.floor(Math.random() * 10) + 1,
    ator: "MEC"
  };

  response = http.put(`${baseUrl}/submission/enviar-proxima-fase/${submissionEventId}`, JSON.stringify(proximaFaseSubmission), {
    headers: { 'Content-Type': 'application/json' },
    tags: { step: 'enviar_proxima_fase_submission' }
  });

  const step6Valid = validateResponse(response, 200, 'Enviar Próxima Fase Submissão');
  const step6Accuracy = calculateDataAccuracy(response, ['event_id', 'book_id', 'call_id', 'book_status', 'event_type'], 'Enviar Próxima Fase Submissão');
  recordNetworkMetrics(response, 'Enviar Próxima Fase Submissão');

  if (step6Valid) {
    const newEventId = extractAvaliacaoIdFromResponse(response);
    if (newEventId) {
      avaliacaoEventId = newEventId;
      console.log(`✅ Novo ID para avaliação: ${avaliacaoEventId}`);
    } else {
      console.log('❌ FALHA: Não foi possível extrair ID de avaliação. Encerrando fluxo.');
      return; // Encerra o processo se não conseguir extrair o ID
    }
  } else {
    console.log('❌ FALHA: Enviar próxima fase submissão falhou. Encerrando fluxo.');
    return; // Encerra o processo se a etapa 6 falhar
  }

  check(response, {
    'Enviar próxima fase submissão - Status 200': (r) => r.status === 200,
    'Enviar próxima fase submissão - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 7. Receber avaliadores
  if (!avaliacaoEventId) {
    console.log('❌ FALHA: ID de avaliação não disponível. Encerrando fluxo.');
    return;
  }

  console.log(`7️⃣  Testando: Receber avaliadores (ID: ${avaliacaoEventId})`);

  response = http.post(`${baseUrl}/avaliacao/receber-avaliadores/${avaliacaoEventId}`, JSON.stringify(testData.avaliadores), {
    headers: { 'Content-Type': 'application/json' },
    tags: { step: 'receber_avaliadores' }
  });

  const step7Valid = validateResponse(response, 201, 'Receber Avaliadores');
  const step7Accuracy = calculateDataAccuracy(response, ['event_id', 'book_id', 'reviewers_json', 'event_type', 'actor'], 'Receber Avaliadores');
  recordNetworkMetrics(response, 'Receber Avaliadores');

  check(response, {
    'Receber avaliadores - Status 201': (r) => r.status === 201,
    'Receber avaliadores - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
  });

  errorRate.add(response.status !== 201);
  sleep(1);

  // 8. Emitir relatório (avaliação)
  if (!avaliacaoEventId) {
    console.log('❌ FALHA: ID de avaliação não disponível. Encerrando fluxo.');
    return;
  }

  console.log(`8️⃣  Testando: Emitir relatório avaliação (ID: ${avaliacaoEventId})`);

  const relatorioAvaliacao = {
    doc: `Documento de avaliação ${new Date().getTime()}`,
    historico_criterios: ["Critério 1", "Critério 2", "Critério 3", "Critério 4"],
    st_criterios: ["Status 1", "Status 2", "Status 3", "Status 4"],
    review_description: `Avaliação de performance realizada via K6 - ${new Date().toISOString()}`,
    ator: "MEC"
  };

  response = http.put(`${baseUrl}/avaliacao/emitir-relatorio/${avaliacaoEventId}`, JSON.stringify(relatorioAvaliacao), {
    headers: { 'Content-Type': 'application/json' },
    tags: { step: 'emitir_relatorio_avaliacao' }
  });

  const step8Valid = validateResponse(response, 200, 'Emitir Relatório Avaliação');
  const step8Accuracy = calculateDataAccuracy(response, ['event_id', 'book_id', 'report_document', 'criteria_json', 'review_description', 'hash', 'actor'], 'Emitir Relatório Avaliação');
  recordNetworkMetrics(response, 'Emitir Relatório Avaliação');

  check(response, {
    'Emitir relatório avaliação - Status 200': (r) => r.status === 200,
    'Emitir relatório avaliação - Tempo resposta < 3s': (r) => r.timings.duration < 3000,
  });

  errorRate.add(response.status !== 200);

  // Registrar throughput
  throughputRate.add(1);

  console.log(`✅ Fluxo completo finalizado - VU ${__VU}, Iteração ${__ITER}`);
  sleep(1);
}

// Função de setup (executada uma vez antes do teste)
export function setup() {
  console.log('🚀 Iniciando teste de performance dinâmico da API...');
  console.log('📋 Fluxo de teste completo:');
  console.log('   1️⃣  Receber edital');
  console.log('   2️⃣  Atualizar edital');
  console.log('   3️⃣  Enviar metadados para próxima fase');
  console.log('   4️⃣  Registrar obra');
  console.log('   5️⃣  Emitir relatório (submissão)');
  console.log('   6️⃣  Enviar para próxima fase (submissão)');
  console.log('   7️⃣  Receber avaliadores');
  console.log('   8️⃣  Emitir relatório (avaliação)');
  console.log('');
  console.log('📊 Métricas que serão coletadas:');
  console.log('   • Taxa de Erro (http_req_failed)');
  console.log('   • Precisão dos Dados (data_accuracy_rate)');
  console.log('   • Disponibilidade (inferida da taxa de falhas)');
  console.log('   • Latência de Rede TTFB (http_req_waiting)');
  console.log('   • Utilização de Banda (data_sent, data_received)');
  console.log('   • Taxa de Transferência (http_reqs)');
  console.log('   • Tempo de Resposta (http_req_duration)');
  console.log('   • Tempo de Serviço (http_req_duration)');
  console.log('   • Escalabilidade/Concorrência (vus, vus_max)');
  console.log('');
}

// Função de teardown (executada uma vez após o teste)
export function teardown(data) {
  console.log('🏁 Teste de performance dinâmico finalizado!');
  console.log('📈 Resumo das métricas coletadas:');
  console.log('   ✅ Taxa de Erro (http_req_failed)');
  console.log('   ✅ Precisão dos Dados (data_accuracy_rate)');
  console.log('   ✅ Disponibilidade (inferida da taxa de falhas)');
  console.log('   ✅ Latência de Rede TTFB (http_req_waiting)');
  console.log('   ✅ Utilização de Banda (data_sent, data_received)');
  console.log('   ✅ Taxa de Transferência (http_reqs)');
  console.log('   ✅ Tempo de Resposta (http_req_duration)');
  console.log('   ✅ Tempo de Serviço (http_req_duration)');
  console.log('   ✅ Escalabilidade/Concorrência (vus, vus_max)');
  console.log('');
  console.log('🎯 Teste executado com sucesso! Verifique os resultados no relatório K6.');
}
