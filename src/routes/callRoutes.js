const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');

// Rota para "receber metadados do edital"
router.post('/receber-metadados', callController.receberMetadadosEdital);

// Rota para "alterações realizadas no Edital" - AGORA USA event_id
router.put('/alterar-edital/:event_id', callController.alterarEdital);

// Rota para "Enviar metadados do Edital para próxima fase"
router.put('/enviar-proxima-fase/:event_id', callController.enviarParaProximaFase);

// Rota para visualizar todas as informações
router.get('/visualizar', callController.visualizarInformacoes);

router.get('/informacoes-edital-contract/:masterContractAddress', callController.consultarEdital);
router.get('/contract_address/:masterContractAddress', callController.consultarEnderecoFases);

module.exports = router;
