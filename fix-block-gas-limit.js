/**
 * Script para diagnosticar e resolver o erro "exceeds block gas limit"
 * Execute com: node fix-block-gas-limit.js
 */

const web3 = require('./src/web3.config');
const ContractOptimization = require('./src/utils/contractOptimization');

async function diagnoseBlockGasLimit() {
  console.log('🔍 Diagnosticando configurações do Ganache...\n');

  try {
    // 1. Verificar conexão com o Ganache
    const isConnected = await web3.eth.net.isListening();
    console.log(`📡 Conexão com Ganache: ${isConnected ? '✅ Conectado' : '❌ Desconectado'}`);

    if (!isConnected) {
      console.error('❌ Ganache não está rodando! Inicie o Ganache primeiro.');
      return;
    }

    // 2. Verificar configurações atuais do bloco
    const latestBlock = await web3.eth.getBlock('latest');
    console.log(`📊 Configurações atuais do bloco:`);
    console.log(`   Gas Limit: ${latestBlock.gasLimit.toLocaleString()}`);
    console.log(`   Gas Used: ${latestBlock.gasUsed.toLocaleString()}`);
    console.log(`   Block Number: ${latestBlock.number}`);

    // 3. Verificar se o gas limit é suficiente
    const currentGasLimit = latestBlock.gasLimit;
    const recommendedGasLimit = 10000000;

    if (currentGasLimit < recommendedGasLimit) {
      console.log(`\n⚠️  PROBLEMA ENCONTRADO:`);
      console.log(`   Gas Limit atual: ${currentGasLimit.toLocaleString()}`);
      console.log(`   Gas Limit necessário: ${recommendedGasLimit.toLocaleString()}`);
      console.log(`   Diferença: ${(recommendedGasLimit - currentGasLimit).toLocaleString()}`);
    } else {
      console.log(`\n✅ Gas Limit está adequado para contratos grandes`);
    }

    // 4. Exibir configurações recomendadas
    console.log(`\n📋 Configurações recomendadas para o Ganache:`);
    const recommendations = ContractOptimization.getGanacheRecommendations();
    console.log(JSON.stringify(recommendations, null, 2));

    // 5. Testar uma estimativa de gas
    console.log(`\n🧪 Testando estimativa de gas...`);
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const gasPrice = await web3.eth.getGasPrice();
        console.log(`   Gas Price atual: ${gasPrice} wei (${web3.utils.fromWei(gasPrice, 'gwei')} gwei)`);
        console.log(`   Contas disponíveis: ${accounts.length}`);
        console.log(`   Conta principal: ${accounts[0]}`);
      }
    } catch (error) {
      console.error(`❌ Erro ao obter informações das contas:`, error.message);
    }

    // 6. Instruções para corrigir
    if (currentGasLimit < recommendedGasLimit) {
      console.log(`\n🔧 COMO CORRIGIR:`);
      console.log(`\n   📱 Se usando Ganache GUI:`);
      console.log(`   1. Feche o Ganache`);
      console.log(`   2. Abra o Ganache`);
      console.log(`   3. Clique em "Settings" (⚙️)`);
      console.log(`   4. Na aba "Server":`);
      console.log(`      - Gas Limit: 10000000`);
      console.log(`      - Gas Price: 20 (Gwei)`);
      console.log(`   5. Na aba "Advanced":`);
      console.log(`      - ✅ Allow unlimited contract size`);
      console.log(`      - Call gas limit: 10000000`);
      console.log(`   6. Clique em "Save and Restart"`);

      console.log(`\n   💻 Se usando Ganache CLI:`);
      console.log(`   ganache-cli --gasLimit 10000000 --gasPrice 20000000000 --allowUnlimitedContractSize --callGasLimit 10000000`);

      console.log(`\n   🐳 Se usando Docker:`);
      console.log(`   docker run -p 7545:8545 trufflesuite/ganache-cli:latest --gasLimit 10000000 --gasPrice 20000000000 --allowUnlimitedContractSize`);
    }

  } catch (error) {
    console.error('❌ Erro durante o diagnóstico:', error.message);

    if (error.message.includes('CONNECTION ERROR')) {
      console.log('\n💡 Verifique se o Ganache está rodando na porta 7545');
    }
  }
}

async function testTransactionWithCurrentSettings() {
  console.log('\n🧪 Testando configurações de transação atuais...\n');

  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.error('❌ Nenhuma conta disponível no Ganache');
      return;
    }

    const fromAccount = accounts[0];

    // Testar configurações conservadoras
    console.log('📊 Testando configurações conservadoras:');
    const safeOptions = ContractOptimization.getSafeTransactionOptions(fromAccount, false);
    console.log(JSON.stringify(safeOptions, null, 2));

    // Testar configurações para operações complexas
    console.log('\n📊 Testando configurações para operações complexas:');
    const complexOptions = ContractOptimization.getSafeTransactionOptions(fromAccount, true);
    console.log(JSON.stringify(complexOptions, null, 2));

    // Testar configurações para criação de fases
    console.log('\n📊 Testando configurações para criação de fases:');
    const phaseOptions = ContractOptimization.getPhaseCreationOptions(fromAccount);
    console.log(JSON.stringify(phaseOptions, null, 2));

    console.log('\n✅ Todas as configurações estão prontas para uso!');

  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
  }
}

// Executar diagnóstico se o arquivo for chamado diretamente
if (require.main === module) {
  console.log('🚨 DIAGNÓSTICO: "exceeds block gas limit" Error\n');

  diagnoseBlockGasLimit()
    .then(() => testTransactionWithCurrentSettings())
    .then(() => {
      console.log('\n🎉 Diagnóstico concluído!');
      console.log('\n📝 Próximos passos:');
      console.log('1. Configure o Ganache conforme as instruções acima');
      console.log('2. Reinicie o Ganache');
      console.log('3. Execute novamente sua aplicação');
      console.log('4. As funções agora usam configurações otimizadas automaticamente');
    })
    .catch(console.error);
}

module.exports = { diagnoseBlockGasLimit, testTransactionWithCurrentSettings };
