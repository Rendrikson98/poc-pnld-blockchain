const { Web3 } = require('web3');

// Configure the provider to connect to Ganache
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545', {
  // Aumenta o limite de gas
  timeout: 60000,
  headers: [{
    name: 'Access-Control-Allow-Origin',
    value: '*'
  }]
});
const web3 = new Web3(provider);

module.exports = web3;
