const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoContractController');

// Rota para "receber avaliadores"
router.post('/receber-avaliadores/:event_id', avaliacaoController.receberAvaliadores);

// Rota para "emitir relatório de avaliação"
router.put('/emitir-relatorio/:event_id', avaliacaoController.emitirRelatorio);

// Rota para "enviar metadados para a próxima fase"
// router.put('/enviar-proxima-fase/:event_id', avaliacaoController.enviarParaProximaFase);

// // Rota para visualizar todas as informações
// router.get('/visualizar', avaliacaoController.visualizarInformacoes);

router.get('/consultar-relatorio/:masterContractAddress', avaliacaoController.consultarRelatorioObras);
router.get('/consultar-relatorio-obras/:contractAddress', avaliacaoController.consultarRelatorioObrasFase3);

module.exports = router;