const { Web3 } = require('web3');

// Configure the provider to connect to Ganache with Truffle-like behavior
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545', {
  // TRUFFLE-LIKE CONFIGURATIONS: Configurações similares ao Truffle
  timeout: 750000, // 12.5 minutos (igual ao Truffle)
  keepAlive: true,
  withCredentials: false,
  headers: [{
    name: 'Access-Control-Allow-Origin',
    value: '*'
  }],
  // TRUFFLE REQUEST OPTIONS: Para contratos grandes
  requestOptions: {
    timeout: 750000, // Timeout igual ao Truffle
    maxContentLength: 100 * 1024 * 1024, // 100MB - maior que Truffle
    maxBodyLength: 100 * 1024 * 1024
  }
});

const web3 = new Web3(provider);

// TRUFFLE-LIKE GLOBAL SETTINGS: Configurações globais similares ao Truffle
web3.eth.transactionConfirmationBlocks = 0; // Truffle usa 0 em development
web3.eth.transactionBlockTimeout = 50;      // Similar ao Truffle
web3.eth.transactionPollingTimeout = 750;   // 12.5 minutos como Truffle

// TRUFFLE BEHAVIOR: Configurações para contratos grandes
web3.eth.handleRevert = true; // Truffle habilita por padrão
web3.eth.maxListenersWarningThreshold = 100;

// IMPORTANTE: Web3 versão com suporte similar ao Truffle
web3.extend({
  property: 'truffle',
  methods: [{
    name: 'deployLarge',
    call: 'eth_sendTransaction',
    params: 1,
    inputFormatter: [web3.utils.inputTransactionFormatter],
    outputFormatter: web3.utils.outputTransactionFormatter
  }]
});

console.log('🔧 Web3 configured with Truffle-like settings for large contracts');

module.exports = web3;
