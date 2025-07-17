const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// Rota para registrar a submissão de uma obra
router.post('/registrar-obra', submissionController.registrarObra);

// Rota para receber os avaliadores de uma obra
router.put('/receber-avaliadores/:event_id', submissionController.receberAvaliadores);

// Rota para emitir o relatório de uma obra (atualização)
router.put('/emitir-relatorio/:event_id', submissionController.emitirRelatorio);

// Rota para enviar para a próxima fase (atualização)
router.put('/enviar-proxima-fase/:event_id', submissionController.enviarParaProximaFase);

// Rota para visualizar todas as informações
router.get('/visualizar', submissionController.visualizarInformacoes);

module.exports = router;
