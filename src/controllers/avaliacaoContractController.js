const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { fase3_receberAvaliadores,
  fase3_emitirRelatorioCriterios,
  fase3_enviarObrasAprovadas,
  fase3_consultarRelatorioObras } = require('./smartContractController');

// Importa as funções de criptografia
const { generateHash } = require('../utils/cryptoUtils');

const receberAvaliadores = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { ids_avaliadores, ids_equipes, id_obra, ator } = req.body;

    // Validação para garantir que 'reviewers' é um array de strings
    if (!Array.isArray(ids_avaliadores) || !Array.isArray(ids_avaliadores) || !ids_avaliadores.every(item => typeof item === 'number')) {
      return res.status(400).json({ message: 'O campo "reviewers" deve ser um array ids numéricos.' });
    }

    const event = await prisma.tb_phase_review.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });

    const { master_contract_adress } = event;

    // Gera hash dos dados dos avaliadores
    const avaliadoresData = {
      event_id,
      id_obra,
      ids_equipes,
      ids_avaliadores,
      ator
    };

    const hashAvaliadores = generateHash(avaliadoresData);
    console.log('Hash gerado:', hashAvaliadores);

    const result = await fase3_receberAvaliadores(event_id, id_obra, ids_equipes, ids_avaliadores, hashAvaliadores, master_contract_adress);
    console.log(result);

    const novosAvaliadores = await prisma.tb_phase_review.update({
      where: { event_id: parseInt(event_id) },
      data: {
        reviewers_json: { ids_avaliadores: ids_avaliadores, ids_equipes: ids_equipes },
        event_type: 'Receber Avaliadores',
        actor: ator
      },
    });

    res.status(201).json(novosAvaliadores);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const emitirRelatorio = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { doc, historico_criterios, st_criterios, review_description, ator } = req.body;

    const event = await prisma.tb_phase_review.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });

    const { master_contract_adress } = event;

    // Gera hash dos dados do relatório
    const relatorioData = {
      event_id,
      doc,
      historico_criterios,
      st_criterios,
      ator
    };

    const hashRelatorio = generateHash(relatorioData);
    console.log('Hash do relatório:', hashRelatorio);

    const result = await fase3_emitirRelatorioCriterios(doc, historico_criterios, st_criterios, hashRelatorio, master_contract_adress);
    console.log(result);

    const relatorioEmitido = await prisma.tb_phase_review.update({
      where: { event_id: parseInt(event_id) },
      data: {
        report_document: doc,
        criteria_json: {
          historico_criterios: historico_criterios,
          st_criterios: st_criterios
        },
        review_description: review_description,
        hash: hashRelatorio,
        event_type: 'Emissão de Relatório',
        actor: ator
      },
    });

    res.status(200).json(relatorioEmitido);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao emitir relatório.' });
  }
}

//TODO: Fazar a função fase3_enviarObrasAprovadas

const consultarRelatorioObras = async (req, res) => {
  try {
    const todasAsObras = await prisma.tb_phase_review.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    res.status(200).json(todasAsObras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível buscar as informações da avaliação.' });
  }
};

// Rota para visualizar todas as submissões
const consultarRelatorioObrasFase3 = async (req, res) => {
  try {
    const { masterContractAddress } = req.params;

    if (!masterContractAddress) {
      return res.status(400).json({ message: 'O endereço do contrato mestre é obrigatório.' });
    }

    const faseAddresses = await fase3_consultarRelatorioObras(masterContractAddress);

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
  receberAvaliadores,
  emitirRelatorio,
  consultarRelatorioObras,
  consultarRelatorioObrasFase3
};