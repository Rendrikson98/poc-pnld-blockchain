const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { fase2_receberInscricaoObras, fase2_emitirRelatorioObrasValidadas, getObras, fase2_enviarMetadadosParaFase3 } = require('./smartContractController');


// Rota para registrar a submissão de uma obra por uma editora
const registrarObra = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { id_editora, razao_social, id_obra, ator } = req.body;

    if (!id_editora || !razao_social || !id_obra || !ator) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const event = await prisma.tb_phase_submission.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });

    const { contract_address } = event;

    // 2. Enviar os metadados para o contrato mestre
    const timestamp = Math.floor(Date.now() / 1000);
    const result = await fase2_receberInscricaoObras(id_editora, razao_social, id_obra, timestamp, contract_address);
    console.log(result);

    const novaSubmissao = await prisma.tb_phase_submission.update({
      where: { event_id: parseInt(event_id) },
      data: {
        publisher_id: id_editora,
        publisher_name: razao_social, //cnpj do contrato
        book_id: id_obra,
        book_status: 'Submetido', // Status inicial
        event_type: 'Registro de Obra',
        actor: ator
      },
    });

    res.status(201).json(novaSubmissao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Não foi possível registrar a submissão da obra.', error });
  }
};

// Rota para receber os avaliadores de uma obra
const receberAvaliadores = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { reviewers, ator } = req.body;

    // Validação para garantir que 'reviewers' é um array de strings
    if (!Array.isArray(reviewers) || !reviewers.every(item => typeof item === 'string')) {
      return res.status(400).json({ message: 'O campo "reviewers" deve ser um array de strings.' });
    }

    const submissaoAtualizada = await prisma.tb_phase_submission.update({
      where: { event_id: parseInt(event_id) },
      data: {
        reviewers: reviewers, // Alterado de reviewers_json para reviewers
        actor: ator,
        event_type: 'Avaliadores Recebidos',
        actor: ator
      },
    });

    res.status(200).json(submissaoAtualizada);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: `Nenhum registro de submissão encontrado com o event_id: ${event_id}` });
    }
    res.status(500).json({ message: 'Não foi possível atribuir os avaliadores.', error });
  }
};

// Rota para emitir o relatório de uma obra
const emitirRelatorio = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { id_editora, titulo, url_documento, ator } = req.body;
    if (!id_editora || !titulo || !url_documento || !ator) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const event = await prisma.tb_phase_submission.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });

    const { contract_address } = event;
    const result = await fase2_emitirRelatorioObrasValidadas(id_editora, titulo, url_documento, contract_address);
    console.log(result);

    const relatorioEmitido = await prisma.tb_phase_submission.update({
      where: { event_id: parseInt(event_id) },
      data: {
        book_status: 'Relatório Emitido',
        document_url: url_documento,
        event_type: 'Emissão de Relatório',
        publisher_id: id_editora,
        actor: ator
      },
    });

    res.status(200).json(relatorioEmitido);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: `Nenhum registro de submissão encontrado com o event_id: ${event_id}` });
    }
    res.status(500).json({ message: 'Não foi possível emitir o relatório.', error });
  }
};

// Rota para enviar para a próxima fase
const enviarParaProximaFase = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { id_edital, id_book, ator } = req.body;

    // 1. Consultar o evento no banco de dados para obter os dados necessários
    const event = await prisma.tb_phase_submission.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });
    console.log('aqui')
    // 2. Verificar se o evento foi encontrado
    if (!event) {
      return res.status(404).json({ message: `Nenhum registro encontrado com o event_id: ${event_id}` });
    }
    console.log('aqui 2')

    // 3. Extrair título e ano do evento
    console.log(JSON.stringify(event))
    const { master_contract_adress, contract_address } = event;

    console.log('aqui 3')
    const result = await fase2_enviarMetadadosParaFase3(master_contract_adress, contract_address);

    console.log('aqui 4')

    await prisma.tb_phase_submission.update({
      where: { event_id: parseInt(event_id) },
      data: {
        book_status: 'Relatório enviado para próxima fase',
        call_id: id_edital,
        event_type: 'Forward',
        actor: ator
      },
    });

    const eventoFase3 = await prisma.tb_phase_review.create({
      data: {
        call_id: Number(id_edital),
        book_id: Number(id_book),
        book_status: 'Em Revisão', // Status inicial
        reviewers_json: {}, // Inicialmente vazio
        contract_address: result.contract3Address,
        master_contract_adress: master_contract_adress, // Endereço do contrato mestre
      },
    })

    if (!eventoFase3) {
      return res.status(500).json({ message: 'Não foi possível registrar a obra na fase 2.' });
    }

    res.status(200).json(eventoFase3);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: `Nenhum registro de submissão encontrado com o event_id: ${event_id}` });
    }
    res.status(500).json({ message: 'Não foi possível enviar para a próxima fase.', error });
  }
};

// Rota para visualizar todas as submissões
const visualizarInformacoes = async (req, res) => {
  try {
    const todasSubmissoes = await prisma.tb_phase_submission.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    res.status(200).json(todasSubmissoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível buscar as informações de submissão.' });
  }
};

const consultarObrasFases = async (req, res) => {
  try {
    const { contractAddress } = req.params;

    if (!contractAddress) {
      return res.status(400).json({ message: 'O endereço do contrato é obrigatório.' });
    }

    const faseAddresses = await getObras(contractAddress);

    const convertBigIntToString = (obj) => {
      const newObj = {};
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'bigint') {
          newObj[key] = Number(value.toString());
        } else {
          newObj[key] = value;
        }
      }
      return newObj;
    };

    const serializableData = convertBigIntToString(faseAddresses);

    res.status(200).json(serializableData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível consultar os endereços das fases no contrato.' });
  }
};

module.exports = {
  registrarObra,
  emitirRelatorio,
  enviarParaProximaFase,
  visualizarInformacoes,
  receberAvaliadores,
  consultarObrasFases
};
