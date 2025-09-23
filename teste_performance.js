import { check, sleep } from 'k6';
import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

// Métricas customizadas
const dataAccuracyRate = new Rate('data_accuracy_rate');
const responseValidationRate = new Rate('response_validation_rate');
const networkLatency = new Trend('network_latency_ttfb');
const bandwidthUtilization = new Gauge('bandwidth_utilization_bytes');
const throughputRate = new Counter('throughput_requests_per_second');
const serviceTime = new Trend('service_time_ms');
const errorRate = new Rate('error_rate');

// Configuração do teste
export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up para 10 usuários
    { duration: '2m', target: 10 },  // Manter 10 usuários
    { duration: '30s', target: 20 }, // Ramp up para 20 usuários
    { duration: '2m', target: 20 },  // Manter 20 usuários
    { duration: '30s', target: 0 },  // Ramp down para 0 usuários
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'], // Taxa de erro < 10%
    http_req_duration: ['p(95)<2000'], // 95% das requisições < 2s
    http_req_waiting: ['p(95)<1000'], // 95% TTFB < 1s
    data_accuracy_rate: ['rate>0.95'], // Precisão dos dados > 95%
    response_validation_rate: ['rate>0.95'], // Validação de resposta > 95%
  },
};

// Dados de teste
const testData = {
  edital: {
    id_edital: 2,
    title: "Teste de Performance K6",
    year: 2024,
    url_document: "https://example.com/document.pdf",
    ator: "MEC",
    contas_editoras: ["0x4E4452FfDFC74A7F6725d69B9338C8eea74e462d"]
  },
  editalUpdate: {
    id_edital: 2,
    new_values: {
      ator: "MEC",
      year: 2025,
      title: "Teste de Performance K6 Atualizado",
      id_edital: 2,
      url_document: "https://example.com/document-updated.pdf"
    },
    old_values: {
      ator: "MEC",
      year: 2024,
      title: "Teste de Performance K6",
      id_edital: 2,
      url_document: "https://example.com/document.pdf"
    },
    ator: "MEC"
  },
  obra: {
    id_editora: 4,
    razao_social: "Editora Teste Performance",
    id_obra: 4,
    ator: "MEC"
  },
  relatorioSubmission: {
    id_obra: 3,
    id_editora: 3,
    titulo: "Relatório de Performance Test",
    url_documento: "https://example.com/relatorio.pdf",
    ator: "MEC"
  },
  proximaFaseSubmission: {
    id_edital: 1,
    id_book: 1,
    ator: "MEC"
  },
  avaliadores: {
    ids_avaliadores: [1, 2, 3],
    ids_equipes: [1, 2, 3],
    id_obra: 4,
    ator: "MEC"
  },
  relatorioAvaliacao: {
    doc: "Documento de avaliação de performance",
    historico_criterios: ["Critério 1", "Critério 2", "Critério 3"],
    st_criterios: ["Status 1", "Status 2", "Status 3"],
    review_description: "Avaliação de performance realizada via K6",
    ator: "MEC"
  }
};

// Função para validar resposta
function validateResponse(response, expectedStatus = 200) {
  const isValid = response.status === expectedStatus;
  responseValidationRate.add(isValid);
  return isValid;
}

// Função para calcular precisão dos dados
function calculateDataAccuracy(response, expectedFields = []) {
  try {
    const data = JSON.parse(response.body);
    let accuracy = 0;

    if (expectedFields.length > 0) {
      const presentFields = expectedFields.filter(field => data.hasOwnProperty(field));
      accuracy = presentFields.length / expectedFields.length;
    } else {
      accuracy = response.status === 200 ? 1 : 0;
    }

    dataAccuracyRate.add(accuracy > 0.8);
    return accuracy;
  } catch (e) {
    dataAccuracyRate.add(false);
    return 0;
  }
}

// Função para registrar métricas de rede
function recordNetworkMetrics(response) {
  const ttfb = response.timings.waiting;
  const dataSent = response.timings.sending;
  const dataReceived = response.timings.receiving;

  networkLatency.add(ttfb);
  bandwidthUtilization.add(dataSent + dataReceived);
  serviceTime.add(response.timings.duration);
}

// Função principal do fluxo de teste
export default function () {
  const baseUrl = 'http://localhost:3000/api';
  let eventId = null;
  let submissionEventId = null;
  let avaliacaoEventId = null;

  // 1. Receber edital
  console.log('1. Testando: Receber edital');
  let response = http.post(`${baseUrl}/edital/receber-metadados`, JSON.stringify(testData.edital), {
    headers: { 'Content-Type': 'application/json' },
  });

  const step1Valid = validateResponse(response, 200);
  const step1Accuracy = calculateDataAccuracy(response, ['id_edital', 'title', 'year']);
  recordNetworkMetrics(response);

  if (step1Valid) {
    try {
      const data = JSON.parse(response.body);
      eventId = data.event_id || data.id || 33; // Fallback para ID fixo
    } catch (e) {
      eventId = 33; // ID padrão para continuar o teste
    }
  }

  check(response, {
    'Receber edital - Status 200': (r) => r.status === 200,
    'Receber edital - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
    'Receber edital - TTFB < 1s': (r) => r.timings.waiting < 1000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 2. Atualizar edital
  if (eventId) {
    console.log('2. Testando: Atualizar edital');
    response = http.put(`${baseUrl}/edital/alterar-edital/${eventId}`, JSON.stringify(testData.editalUpdate), {
      headers: { 'Content-Type': 'application/json' },
    });

    const step2Valid = validateResponse(response, 200);
    const step2Accuracy = calculateDataAccuracy(response);
    recordNetworkMetrics(response);

    check(response, {
      'Atualizar edital - Status 200': (r) => r.status === 200,
      'Atualizar edital - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
    });

    errorRate.add(response.status !== 200);
    sleep(1);
  }

  // 3. Enviar metadados para próxima fase
  if (eventId) {
    console.log('3. Testando: Enviar metadados para próxima fase');
    response = http.put(`${baseUrl}/edital/enviar-proxima-fase/${eventId}`, JSON.stringify({ ator: "MEC" }), {
      headers: { 'Content-Type': 'application/json' },
    });

    const step3Valid = validateResponse(response, 200);
    const step3Accuracy = calculateDataAccuracy(response);
    recordNetworkMetrics(response);

    check(response, {
      'Enviar próxima fase - Status 200': (r) => r.status === 200,
      'Enviar próxima fase - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
    });

    errorRate.add(response.status !== 200);
    sleep(1);
  }

  // 4. Registrar obra
  console.log('4. Testando: Registrar obra');
  submissionEventId = 19; // ID fixo para submissão
  response = http.post(`${baseUrl}/submission/registrar-obra/${submissionEventId}`, JSON.stringify(testData.obra), {
    headers: { 'Content-Type': 'application/json' },
  });

  const step4Valid = validateResponse(response, 200);
  const step4Accuracy = calculateDataAccuracy(response, ['id_editora', 'razao_social', 'id_obra']);
  recordNetworkMetrics(response);

  check(response, {
    'Registrar obra - Status 200': (r) => r.status === 200,
    'Registrar obra - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 5. Emitir relatório (submissão)
  console.log('5. Testando: Emitir relatório (submissão)');
  response = http.put(`${baseUrl}/submission/emitir-relatorio/${submissionEventId}`, JSON.stringify(testData.relatorioSubmission), {
    headers: { 'Content-Type': 'application/json' },
  });

  const step5Valid = validateResponse(response, 200);
  const step5Accuracy = calculateDataAccuracy(response, ['id_obra', 'id_editora', 'titulo']);
  recordNetworkMetrics(response);

  check(response, {
    'Emitir relatório submissão - Status 200': (r) => r.status === 200,
    'Emitir relatório submissão - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 6. Enviar para próxima fase (submissão)
  console.log('6. Testando: Enviar para próxima fase (submissão)');
  response = http.put(`${baseUrl}/submission/enviar-proxima-fase/${submissionEventId}`, JSON.stringify(testData.proximaFaseSubmission), {
    headers: { 'Content-Type': 'application/json' },
  });

  const step6Valid = validateResponse(response, 200);
  const step6Accuracy = calculateDataAccuracy(response);
  recordNetworkMetrics(response);

  check(response, {
    'Enviar próxima fase submissão - Status 200': (r) => r.status === 200,
    'Enviar próxima fase submissão - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 7. Receber avaliadores
  console.log('7. Testando: Receber avaliadores');
  avaliacaoEventId = 3; // ID fixo para avaliação
  response = http.post(`${baseUrl}/avaliacao/receber-avaliadores/${avaliacaoEventId}`, JSON.stringify(testData.avaliadores), {
    headers: { 'Content-Type': 'application/json' },
  });

  const step7Valid = validateResponse(response, 200);
  const step7Accuracy = calculateDataAccuracy(response, ['ids_avaliadores', 'ids_equipes', 'id_obra']);
  recordNetworkMetrics(response);

  check(response, {
    'Receber avaliadores - Status 200': (r) => r.status === 200,
    'Receber avaliadores - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
  });

  errorRate.add(response.status !== 200);
  sleep(1);

  // 8. Emitir relatório (avaliação)
  console.log('8. Testando: Emitir relatório (avaliação)');
  response = http.put(`${baseUrl}/avaliacao/emitir-relatorio/${avaliacaoEventId}`, JSON.stringify(testData.relatorioAvaliacao), {
    headers: { 'Content-Type': 'application/json' },
  });

  const step8Valid = validateResponse(response, 200);
  const step8Accuracy = calculateDataAccuracy(response, ['doc', 'historico_criterios', 'review_description']);
  recordNetworkMetrics(response);

  check(response, {
    'Emitir relatório avaliação - Status 200': (r) => r.status === 200,
    'Emitir relatório avaliação - Tempo resposta < 2s': (r) => r.timings.duration < 2000,
  });

  errorRate.add(response.status !== 200);

  // Registrar throughput
  throughputRate.add(1);

  sleep(1);
}

// Função de setup (executada uma vez antes do teste)
export function setup() {
  console.log('Iniciando teste de performance da API...');
  console.log('Fluxo de teste:');
  console.log('1. Receber edital');
  console.log('2. Atualizar edital');
  console.log('3. Enviar metadados para próxima fase');
  console.log('4. Registrar obra');
  console.log('5. Emitir relatório (submissão)');
  console.log('6. Enviar para próxima fase (submissão)');
  console.log('7. Receber avaliadores');
  console.log('8. Emitir relatório (avaliação)');
  console.log('');
}

// Função de teardown (executada uma vez após o teste)
export function teardown(data) {
  console.log('Teste de performance finalizado!');
  console.log('Métricas coletadas:');
  console.log('- Taxa de Erro (http_req_failed)');
  console.log('- Precisão dos Dados (data_accuracy_rate)');
  console.log('- Disponibilidade (inferida da taxa de falhas)');
  console.log('- Latência de Rede TTFB (http_req_waiting)');
  console.log('- Utilização de Banda (data_sent, data_received)');
  console.log('- Taxa de Transferência (http_reqs)');
  console.log('- Tempo de Resposta (http_req_duration)');
  console.log('- Tempo de Serviço (http_req_duration)');
  console.log('- Escalabilidade/Concorrência (vus, vus_max)');
}
