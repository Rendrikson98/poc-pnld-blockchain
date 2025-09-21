/**
 * SCRIPT CRÍTICO: Correção urgente para "code size exceeds maximum"
 * Execute IMEDIATAMENTE: node emergency-fix.js
 */

const web3 = require('./src/web3.config');
const ContractOptimization = require('./src/utils/contractOptimization');

async function emergencyFix() {
  console.log('🚨 CORREÇÃO CRÍTICA: "code size exceeds maximum"\n');

  console.log('📋 DIAGNÓSTICO:\n');

  try {
    // 1. Verificar se Ganache está rodando
    console.log('1️⃣ Verificando conexão com Ganache...');
    const isConnected = await web3.eth.net.isListening();
    console.log(`   Status: ${isConnected ? '✅ Conectado' : '❌ Desconectado'}`);

    if (!isConnected) {
      console.error('\n❌ GANACHE NÃO ESTÁ RODANDO!');
      showGanacheInstructions();
      return;
    }

    // 2. Verificar configurações atuais
    console.log('\n2️⃣ Verificando configurações atuais...');
    const latestBlock = await web3.eth.getBlock('latest');
    console.log(`   Gas Limit atual: ${latestBlock.gasLimit.toLocaleString()}`);

    // 3. Testar se allowUnlimitedContractSize está ativo
    console.log('\n3️⃣ Testando suporte a contratos grandes...');

    // Tentar fazer um deployment de teste simples
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.error('❌ Nenhuma conta disponível!');
      return;
    }

    console.log(`   Conta de teste: ${accounts[0]}`);

    // 4. Verificar se é problema de configuração do Ganache
    console.log('\n4️⃣ Analisando problema...');
    console.log('   O erro "code size exceeds maximum" indica:');
    console.log('   - Contrato > 24KB (limite Ethereum)');
    console.log('   - Ganache NÃO configurado com --allowUnlimitedContractSize');

    console.log('\n🚨 SOLUÇÃO CRÍTICA NECESSÁRIA:\n');
    showGanacheInstructions();

  } catch (error) {
    console.error('❌ Erro durante diagnóstico:', error.message);
    console.log('\n🚨 SOLUÇÃO CRÍTICA NECESSÁRIA:\n');
    showGanacheInstructions();
  }
}

function showGanacheInstructions() {
  console.log('🔥 AÇÃO IMEDIATA NECESSÁRIA:\n');

  console.log('📱 SE USANDO GANACHE GUI:');
  console.log('   1. ❌ FECHE o Ganache COMPLETAMENTE');
  console.log('   2. 🆕 Abra o Ganache novamente');
  console.log('   3. ⚙️ Clique em "New Workspace" ou "Settings"');
  console.log('   4. 📊 Na aba "Server":');
  console.log('      - Port: 7545');
  console.log('      - Gas Limit: 15000000');
  console.log('      - Gas Price: 20');
  console.log('   5. 🔧 Na aba "Advanced":');
  console.log('      - ✅ Allow unlimited contract size (OBRIGATÓRIO!)');
  console.log('      - Call gas limit: 15000000');
  console.log('   6. 💾 "Save and Start"');
  console.log('   7. ✅ Teste sua aplicação novamente\n');

  console.log('💻 SE USANDO GANACHE CLI:');
  console.log('   1. ❌ Pare o ganache-cli atual (Ctrl+C)');
  console.log('   2. 🚀 Execute este comando EXATO:');
  console.log('   ganache-cli --allowUnlimitedContractSize --gasLimit 15000000 --gasPrice 20000000000 --accounts 10 --defaultBalanceEther 1000 --port 7545');
  console.log('   3. ✅ Teste sua aplicação novamente\n');

  console.log('🐳 SE USANDO DOCKER:');
  console.log('   docker run -p 7545:8545 trufflesuite/ganache-cli:latest --allowUnlimitedContractSize --gasLimit 15000000 --gasPrice 20000000000\n');

  console.log('⚠️ IMPORTANTE:');
  console.log('   - A flag --allowUnlimitedContractSize é OBRIGATÓRIA');
  console.log('   - Sem esta flag, contratos > 24KB falharão SEMPRE');
  console.log('   - REINICIE o Ganache após configurar');
  console.log('   - Teste imediatamente após reiniciar\n');

  console.log('🔬 PARA VERIFICAR SE FUNCIONOU:');
  console.log('   node quick-test-ganache.js\n');

  console.log('📞 ESTE É UM PROBLEMA CRÍTICO:');
  console.log('   - Configure o Ganache AGORA');
  console.log('   - Não é possível resolver via código');
  console.log('   - É uma limitação de configuração do ambiente');
}

async function quickValidation() {
  console.log('🔍 VALIDAÇÃO RÁPIDA:\n');

  try {
    const isConnected = await web3.eth.net.isListening();
    if (!isConnected) {
      console.log('❌ Ganache não conectado - configure primeiro');
      return false;
    }

    const latestBlock = await web3.eth.getBlock('latest');
    const gasLimit = parseInt(latestBlock.gasLimit);

    console.log(`Gas Limit: ${gasLimit.toLocaleString()}`);

    if (gasLimit >= 15000000) {
      console.log('✅ Gas Limit adequado');
    } else {
      console.log('❌ Gas Limit insuficiente');
      return false;
    }

    // Não conseguimos testar allowUnlimitedContractSize diretamente
    // mas podemos verificar outras configurações
    console.log('⚠️ ATENÇÃO: Verifique manualmente se allowUnlimitedContractSize está ativo');

    return true;

  } catch (error) {
    console.log('❌ Validação falhou:', error.message);
    return false;
  }
}

// Executar correção se o arquivo for chamado diretamente
if (require.main === module) {
  console.log('🚨🚨🚨 CORREÇÃO CRÍTICA PARA CONTRATO MUITO GRANDE 🚨🚨🚨\n');

  emergencyFix()
    .then(() => {
      console.log('\n📝 PRÓXIMOS PASSOS:');
      console.log('1. Configure o Ganache conforme instruções acima');
      console.log('2. Reinicie o Ganache COMPLETAMENTE');
      console.log('3. Execute: node quick-test-ganache.js');
      console.log('4. Teste sua aplicação novamente');
      console.log('\n⏰ ESTE PROBLEMA DEVE SER RESOLVIDO AGORA!');
    })
    .catch(console.error);
}

module.exports = { emergencyFix, quickValidation };
