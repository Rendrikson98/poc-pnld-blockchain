const web3 = require('../web3.config');

/**
 * Configurações otimizadas para deployment de contratos grandes
 */
class ContractOptimization {

  /**
   * Calcula o gas limit otimizado para contratos grandes
   * ATUALIZADO: Implementa fallback robusto para resolver "exceeds block gas limit"
   * @param {Object} contract - Instância do contrato Web3
   * @param {Object} deployOptions - Opções de deployment
   * @param {string} fromAddress - Endereço que fará o deployment
   * @param {number} safetyMargin - Margem de segurança (padrão: 1.2 = 20%)
   * @returns {Promise<number>} Gas limit calculado
   */
  static async calculateOptimalGasLimit(contract, deployOptions, fromAddress, safetyMargin = 1.2) {
    try {
      console.log(`🔍 Tentando estimar gas para deployment...`);

      const gasEstimate = await contract.deploy(deployOptions).estimateGas({
        from: fromAddress
      });

      let gasLimit = Math.floor(gasEstimate * safetyMargin);

      // CRÍTICO: Limitar o gas para não exceder o limite do bloco
      const maxBlockGasLimit = 8000000; // 8M para ser seguro
      if (gasLimit > maxBlockGasLimit) {
        console.log(`⚠️  Gas estimado (${gasLimit.toLocaleString()}) excede limite seguro do bloco`);
        gasLimit = maxBlockGasLimit;
        console.log(`� Ajustando para limite seguro: ${gasLimit.toLocaleString()}`);
      }

      console.log(`�📊 Gas Estimation Report:`);
      console.log(`   Estimated: ${gasEstimate.toLocaleString()}`);
      console.log(`   Limit Applied: ${gasLimit.toLocaleString()}`);
      console.log(`   Safety Margin: ${((safetyMargin - 1) * 100).toFixed(1)}%`);
      console.log(`   Block Limit Safe: ${gasLimit <= maxBlockGasLimit ? '✅' : '❌'}`);

      return gasLimit;
    } catch (error) {
      console.error('❌ Error calculating gas limit:', error.message);

      // FALLBACK CONSERVADOR: Usar valores baixos para evitar "exceeds block gas limit"
      console.log('🔄 Usando fallback conservador para evitar exceder limite do bloco...');

      if (error.message.includes('exceeds block gas limit')) {
        console.log('💡 Erro detectado: exceeds block gas limit - usando gas muito baixo');
        return 3000000; // 3M gas - muito conservador
      }

      if (error.message.includes('out of gas')) {
        console.log('💡 Erro detectado: out of gas - usando gas médio');
        return 5000000; // 5M gas
      }

      // Fallback padrão
      console.log('💡 Usando fallback padrão');
      return 6000000; // 6M gas - seguro para a maioria dos casos
    }
  }

  /**
   * Opções de deployment otimizadas para contratos grandes
   * @param {string} fromAddress - Endereço que fará o deployment
   * @param {number} gasLimit - Limite de gas calculado
   * @param {string} gasPrice - Preço do gas (padrão: 20 Gwei)
   * @returns {Object} Opções de deployment otimizadas
   */
  static getOptimizedDeployOptions(fromAddress, gasLimit, gasPrice = '20000000000') {
    return {
      from: fromAddress,
      gas: gasLimit,
      gasPrice: gasPrice,
      // Configurações para contratos grandes
      timeout: 600000, // 10 minutos
      polling: {
        timeout: 600000, // 10 minutos
        interval: 2000   // Checa a cada 2 segundos
      },
      // Configurações de confirmação
      transactionConfirmationBlocks: 1,
      transactionBlockTimeout: 50,
      transactionPollingTimeout: 600
    };
  }

  /**
   * Opções otimizadas para transações normais (não deployment)
   * Configurações ajustadas para resolver "exceeds block gas limit"
   * @param {string} fromAddress - Endereço que enviará a transação
   * @param {number} gasAmount - Quantidade de gas (reduzido para evitar exceder limite do bloco)
   * @param {string} gasPrice - Preço do gas (padrão: 20 Gwei)
   * @returns {Object} Opções de transação otimizadas
   */
  static getOptimizedTransactionOptions(fromAddress, gasAmount = 4000000, gasPrice = '20000000000') {
    return {
      from: fromAddress,
      gas: gasAmount, // Reduzido de 6M para 4M para evitar exceder limite do bloco
      gasPrice: gasPrice,
      // Configurações para transações complexas
      timeout: 300000, // 5 minutos
      polling: {
        timeout: 300000,
        interval: 1000
      }
    };
  }

  /**
   * Configurações específicas para criação de contratos de fase
   * Ajustado para resolver "exceeds block gas limit"
   * @param {string} fromAddress - Endereço que enviará a transação
   * @returns {Object} Opções otimizadas para criação de fases
   */
  static getPhaseCreationOptions(fromAddress) {
    return {
      from: fromAddress,
      gas: 6000000, // Reduzido de 8M para 6M para evitar exceder limite do bloco
      gasPrice: '20000000000', // 20 Gwei
      timeout: 300000 // 5 minutos
    };
  }

  /**
   * Configurações seguras para operações que podem exceder limite do bloco
   * @param {string} fromAddress - Endereço que enviará a transação
   * @param {boolean} isComplexOperation - Se é uma operação complexa
   * @returns {Object} Opções seguras para evitar "exceeds block gas limit"
   */
  static getSafeTransactionOptions(fromAddress, isComplexOperation = false) {
    const baseGas = isComplexOperation ? 3500000 : 2000000;

    return {
      from: fromAddress,
      gas: baseGas,
      gasPrice: '20000000000',
      timeout: 180000, // 3 minutos
      polling: {
        timeout: 180000,
        interval: 1000
      }
    };
  }

  /**
   * Verifica se o bytecode é otimizado
   * @param {string} bytecode - Bytecode do contrato
   * @returns {Object} Informações sobre o bytecode
   */
  static analyzeBytecode(bytecode) {
    const sizeInBytes = bytecode.length / 2;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);

    // Limite do Ethereum para contratos é ~24KB
    const ethereumLimit = 24576; // bytes
    const isLarge = sizeInBytes > ethereumLimit;

    console.log(`📏 Bytecode Analysis:`);
    console.log(`   Size: ${sizeInKB} KB (${sizeInBytes.toLocaleString()} bytes)`);
    console.log(`   Ethereum Limit: ${(ethereumLimit / 1024).toFixed(2)} KB`);
    console.log(`   Status: ${isLarge ? '⚠️  Large Contract' : '✅ Normal Size'}`);

    if (isLarge) {
      console.log(`⚡ Recommendations for large contracts:`);
      console.log(`   - Use compiler optimizations`);
      console.log(`   - Consider contract splitting`);
      console.log(`   - Increase gas limits`);
      console.log(`   - Use longer timeouts`);
    }

    return {
      sizeInBytes,
      sizeInKB: parseFloat(sizeInKB),
      isLarge,
      ethereumLimit,
      exceedsLimit: sizeInBytes > ethereumLimit
    };
  }

  /**
   * Deploy de contrato com configurações idênticas ao Truffle
   * ATUALIZADO: Comportamento igual ao Truffle para resolver problemas
   * @param {Object} contract - Instância do contrato Web3
   * @param {Object} deployOptions - Opções de deployment (data, arguments)
   * @param {string} fromAddress - Endereço que fará o deployment
   * @param {Object} options - Opções adicionais
   * @returns {Promise<Object>} Contrato deployado
   */
  static async deployOptimized(contract, deployOptions, fromAddress, options = {}) {
    try {
      console.log(`🚀 Starting deployment with Truffle-like configuration...`);

      // Analisa o bytecode mas NÃO bloqueia (como o Truffle faz)
      if (deployOptions.data) {
        const analysis = this.analyzeBytecode(deployOptions.data);
        console.log(`📏 Contract size: ${analysis.sizeInKB} KB`);

        // Truffle permite contratos grandes se allowUnlimitedContractSize estiver ativo
        if (analysis.exceedsLimit) {
          console.log(`⚠️ Large contract detected - relying on Ganache allowUnlimitedContractSize`);
        }
      }

      // IGUAL AO TRUFFLE: Usar gas estimation, mas com fallback robusto
      let gasLimit;
      try {
        console.log(`� Estimating gas (Truffle-style)...`);
        const gasEstimate = await contract.deploy(deployOptions).estimateGas({
          from: fromAddress
        });

        // TRUFFLE BEHAVIOR: Adiciona margem automática
        gasLimit = Math.floor(gasEstimate * 1.8); // 80% margin like Truffle
        console.log(`📊 Gas estimated: ${gasEstimate.toLocaleString()}`);
        console.log(`📊 Gas with margin: ${gasLimit.toLocaleString()}`);

      } catch (gasError) {
        console.log(`⚠️ Gas estimation failed, using Truffle-like fallback`);
        // TRUFFLE FALLBACK: Usar gas alto quando estimation falha
        gasLimit = 15000000; // 15M gas - igual configuração Ganache
        console.log(`� Using fallback gas: ${gasLimit.toLocaleString()}`);
      }

      // TRUFFLE-STYLE OPTIONS: Configurações que o Truffle usa
      const truffleStyleOptions = {
        from: fromAddress,
        gas: gasLimit,
        gasPrice: options.gasPrice || '20000000000', // 20 Gwei
        // TRUFFLE TIMEOUTS: Mais generosos
        timeout: 600000, // 10 minutos
        polling: {
          timeout: 600000,
          interval: 4000    // Truffle usa 4 segundos
        },
        // TRUFFLE CONFIRMATIONS
        transactionConfirmationBlocks: 0, // Truffle usa 0 em development
        transactionBlockTimeout: 50,
        transactionPollingTimeout: 750000 // 12.5 minutos
      };

      console.log(`📋 Using Truffle-style options:`, {
        gas: truffleStyleOptions.gas.toLocaleString(),
        gasPrice: truffleStyleOptions.gasPrice,
        timeout: `${truffleStyleOptions.timeout / 1000}s`
      });

      console.log(`⏳ Deploying with Truffle-like behavior...`);

      // DEPLOY IGUAL AO TRUFFLE
      const deployedContract = await contract.deploy(deployOptions).send(truffleStyleOptions);

      console.log(`✅ Contract deployed successfully (Truffle-style)!`);
      console.log(`📍 Address: ${deployedContract.options.address}`);

      return deployedContract;

    } catch (error) {
      console.error(`❌ Deployment failed:`, error.message);

      // TRUFFLE ERROR HANDLING: Mais tolerante, menos bloqueio
      console.log(`🔄 Applying Truffle-like error recovery...`);

      // Tentar com configurações ainda mais conservadoras (Truffle fallback)
      try {
        console.log(`� Trying Truffle emergency fallback...`);

        const emergencyOptions = {
          from: fromAddress,
          gas: 14500000,  // Ligeiramente abaixo do limite do Ganache
          gasPrice: '20000000000',
          timeout: 900000, // 15 minutos
          polling: {
            timeout: 900000,
            interval: 5000
          }
        };

        console.log(`� Emergency gas: ${emergencyOptions.gas.toLocaleString()}`);

        const emergencyContract = await contract.deploy(deployOptions).send(emergencyOptions);

        console.log(`✅ Emergency deployment successful!`);
        console.log(`📍 Address: ${emergencyContract.options.address}`);

        return emergencyContract;

      } catch (emergencyError) {
        console.error(`❌ Emergency deployment also failed:`, emergencyError.message);

        // Diagnóstico detalhado como o Truffle faria
        if (error.message.includes('code size') || emergencyError.message.includes('code size')) {
          console.error(`\n� CÓDIGO MUITO GRANDE - SOLUÇÕES:`);
          console.error(`1. Verifique se Ganache tem --allowUnlimitedContractSize`);
          console.error(`2. Optimize o contrato Solidity com optimizer enabled`);
          console.error(`3. Configure truffle-config.js com optimizer: { enabled: true, runs: 200 }`);
        }

        throw emergencyError;
      }
    }
  }  /**
   * Configurações recomendadas para Ganache/desenvolvimento com contratos grandes
   * ATUALIZADO: Configurações específicas para resolver "exceeds block gas limit"
   * @returns {Object} Configurações recomendadas
   */
  static getGanacheRecommendations() {
    return {
      // IMPORTANTE: Para resolver "exceeds block gas limit"
      gasLimit: 10000000, // 10M gas limit (aumentado para suportar contratos grandes)
      blockGasLimit: 10000000, // Limite de gas por bloco (CRÍTICO para resolver o erro)
      gasPrice: 20000000000, // 20 Gwei
      blockTime: 0, // Mining instantâneo
      networkId: 5777,
      accounts: 10,
      defaultBalanceEther: 1000,
      // Para contratos muito grandes
      callGasLimit: 10000000, // Aumentado para 10M
      allowUnlimitedContractSize: true,
      // Configurações adicionais para debugging
      verbose: true,
      logger: console
    };
  }

  /**
   * Verifica os limites atuais do Ganache e sugere correções
   * @returns {Promise<Object>} Status das configurações atuais
   */
  static async checkGanacheConfiguration() {
    try {
      const latestBlock = await web3.eth.getBlock('latest');
      const currentGasLimit = parseInt(latestBlock.gasLimit);
      const recommendedGasLimit = 10000000;

      const status = {
        currentGasLimit,
        recommendedGasLimit,
        isAdequate: currentGasLimit >= recommendedGasLimit,
        blockNumber: latestBlock.number,
        gasUsed: parseInt(latestBlock.gasUsed)
      };

      console.log(`📊 Ganache Configuration Check:`);
      console.log(`   Current Gas Limit: ${status.currentGasLimit.toLocaleString()}`);
      console.log(`   Recommended: ${status.recommendedGasLimit.toLocaleString()}`);
      console.log(`   Status: ${status.isAdequate ? '✅ Adequado' : '❌ Insuficiente'}`);
      console.log(`   Block Number: ${status.blockNumber}`);
      console.log(`   Gas Used: ${status.gasUsed.toLocaleString()}`);

      if (!status.isAdequate) {
        console.log(`\n🚨 PROBLEMA: Gas Limit insuficiente!`);
        console.log(`💡 SOLUÇÃO: Reinicie o Ganache com as configurações:`);
        console.log(`   ganache-cli --gasLimit 10000000 --allowUnlimitedContractSize`);
      }

      return status;
    } catch (error) {
      console.error('❌ Erro ao verificar configuração do Ganache:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Configurações de emergência para quando tudo falha
   * @param {string} fromAddress - Endereço que enviará a transação
   * @returns {Object} Opções ultra-conservadoras
   */
  static getEmergencyTransactionOptions(fromAddress) {
    return {
      from: fromAddress,
      gas: 1500000, // 1.5M gas - ultra conservador
      gasPrice: '20000000000',
      timeout: 120000, // 2 minutos
      polling: {
        timeout: 120000,
        interval: 2000
      }
    };
  }
}

module.exports = ContractOptimization;
