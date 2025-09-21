/**
 * Script de teste rápido para verificar configurações do Ganache
 * Execute com: node quick-test-ganache.js
 */

const web3 = require('./src/web3.config');
const ContractOptimization = require('./src/utils/contractOptimization');

async function quickTest() {
  console.log('🚀 TESTE RÁPIDO: Verificação do Ganache\n');

  try {
    // 1. Verificar conexão
    console.log('1️⃣ Verificando conexão...');
    const isConnected = await web3.eth.net.isListening();
    console.log(`   Status: ${isConnected ? '✅ Conectado' : '❌ Desconectado'}\n`);

    if (!isConnected) {
      console.error('❌ Ganache não está rodando! Inicie o Ganache primeiro.');
      return;
    }

    // 2. Verificar configurações atuais
    console.log('2️⃣ Verificando configurações do bloco...');
    await ContractOptimization.checkGanacheConfiguration();
    console.log('');

    // 3. Testar contas
    console.log('3️⃣ Verificando contas...');
    const accounts = await web3.eth.getAccounts();
    console.log(`   Contas disponíveis: ${accounts.length}`);
    if (accounts.length > 0) {
      console.log(`   Conta principal: ${accounts[0]}`);

      // Verificar saldo
      const balance = await web3.eth.getBalance(accounts[0]);
      const balanceEth = web3.utils.fromWei(balance, 'ether');
      console.log(`   Saldo: ${balanceEth} ETH`);
    }
    console.log('');

    // 4. Testar configurações de transação
    console.log('4️⃣ Testando configurações de transação...');
    if (accounts.length > 0) {
      const safeOptions = ContractOptimization.getSafeTransactionOptions(accounts[0], true);
      console.log('   Configurações seguras:', {
        gas: safeOptions.gas.toLocaleString(),
        gasPrice: safeOptions.gasPrice
      });

      const emergencyOptions = ContractOptimization.getEmergencyTransactionOptions(accounts[0]);
      console.log('   Configurações de emergência:', {
        gas: emergencyOptions.gas.toLocaleString(),
        gasPrice: emergencyOptions.gasPrice
      });
    }
    console.log('');

    // 5. Verificar gas price atual
    console.log('5️⃣ Verificando gas price...');
    const gasPrice = await web3.eth.getGasPrice();
    console.log(`   Gas Price atual: ${gasPrice} wei (${web3.utils.fromWei(gasPrice, 'gwei')} gwei)`);
    console.log('');

    // 6. Resumo e recomendações
    console.log('📋 RESUMO:');
    console.log('✅ Teste concluído com sucesso!');
    console.log('');

    console.log('💡 RECOMENDAÇÕES PARA RESOLVER "exceeds block gas limit":');
    console.log('');
    console.log('📱 Se usando Ganache GUI:');
    console.log('   1. Feche o Ganache completamente');
    console.log('   2. Abra o Ganache novamente');
    console.log('   3. Clique em "New Workspace" ou "Settings"');
    console.log('   4. Configure:');
    console.log('      - Gas Limit: 10000000');
    console.log('      - Gas Price: 20 Gwei');
    console.log('      - Allow unlimited contract size: ✓');
    console.log('   5. Salve e reinicie');
    console.log('');

    console.log('💻 Se usando Ganache CLI:');
    console.log('   ganache-cli --gasLimit 10000000 --gasPrice 20000000000 --allowUnlimitedContractSize --accounts 10 --defaultBalanceEther 1000');
    console.log('');

    console.log('🔧 Configurações aplicadas no código:');
    console.log('   - Gas limits reduzidos para evitar exceder limite do bloco');
    console.log('   - Retry automático com configurações de emergência');
    console.log('   - Verificação automática das configurações do Ganache');
    console.log('   - Tratamento específico para erro "exceeds block gas limit"');

  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);

    if (error.message.includes('CONNECTION ERROR') || error.message.includes('connect ECONNREFUSED')) {
      console.log('\n💡 SOLUÇÃO: Verifique se o Ganache está rodando na porta 7545');
      console.log('   - Abra o Ganache GUI ou inicie ganache-cli');
      console.log('   - Verifique se está na porta correta (7545)');
    }
  }
}

// Executar teste se o arquivo for chamado diretamente
if (require.main === module) {
  quickTest().catch(console.error);
}

module.exports = { quickTest };
