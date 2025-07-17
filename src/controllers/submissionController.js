const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Rota para registrar a submissão de uma obra por uma editora
const registrarObra = async (req, res) => {
  try {
    const { id_editora, razao_social, id_obra, ator } = req.body;

    const novaSubmissao = await prisma.tb_phase_submission.create({
      data: {
        publisher_id: id_editora,
        publisher_name: razao_social,
        book_id: id_obra,
        book_status: 'Submetido', // Status inicial
        event_type: 'Registro de Obra',
        actor: ator
      },
    });

    res.status(201).json(novaSubmissao);
  } catch (error){
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
    const { id_obra, id_editora, url_documento, ator } = req.body;

    const relatorioEmitido = await prisma.tb_phase_submission.update({
      where: { event_id: parseInt(event_id) },
      data: {
        book_status: 'Relatório Emitido',
        document_url: url_documento,
        event_type: 'Emissão de Relatório',
        book_id: id_obra,
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
    const { id_edital, ator } = req.body;

    const proximaFase = await prisma.tb_phase_submission.update({
      where: { event_id: parseInt(event_id) },
      data: {
        book_status: 'Relatório enviado para próxima fase',	
        call_id: id_edital,
        event_type: 'Enviado para Próxima Fase',
        actor: ator
      },
    });

    res.status(200).json(proximaFase);
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

module.exports = {
  registrarObra,
  emitirRelatorio,
  enviarParaProximaFase,
  visualizarInformacoes,
  receberAvaliadores,
};
