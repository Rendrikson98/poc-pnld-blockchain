const web3 = require('../web3.config');
const { abi: abiMasterContract, bytecode: bytecodeMasterContract } = require('../constants/contratoMestre').masterContract;
const { abi: abiCallContract } = require('../constants/publicacao').publicationContract;
const { abi: abiSubmissionContract } = require('../constants/submissao').submissionContract;
const { publicKey } = require('../constants/accountsInfo').account;
const ContractOptimization = require('../utils/contractOptimization');

const accountAddress = publicKey;
const masterContract = new web3.eth.Contract(abiMasterContract, accountAddress);


const getFaseAddresses = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        console.log('aqui getfase 1')
        const response = await contract.methods
            .getFaseAddresses()
            .call();
        console.log('aqui getfase 2')
        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const getObras = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .consultarObra()
            .call();

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase1_receberMetadados = async (id, title, year, url, ts, CallContractAddress) => {
    const contract = new web3.eth.Contract(abiCallContract, CallContractAddress);

    try {
        // Primeiro, verificar configurações do Ganache
        await ContractOptimization.checkGanacheConfiguration();

        const response = await contract.methods
            .receberMetadadosEdital(id, title, year, url, ts)
            .send(ContractOptimization.getSafeTransactionOptions(publicKey, true));

        return response

    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO - fase1_receberMetadados");

        // Tratamento específico para "exceeds block gas limit"
        if (error.message && error.message.includes('exceeds block gas limit')) {
            console.error("❌ ERRO: Transação excede o limite de gas do bloco");
            console.error("💡 SOLUÇÃO: Configure o Ganache com gasLimit maior:");
            console.error(JSON.stringify(ContractOptimization.getGanacheRecommendations(), null, 2));

            console.log("🔄 Tentando novamente com configurações de emergência...");
            try {
                const emergencyResponse = await contract.methods
                    .fase1_receberMetadados(id, title, year, url, ts)
                    .send(ContractOptimization.getEmergencyTransactionOptions(publicKey));

                console.log("✅ Sucesso com configurações de emergência!");
                return emergencyResponse;
            } catch (emergencyError) {
                console.error("❌ Falha mesmo com configurações de emergência:", emergencyError.message);
                throw new Error(`Não foi possível armazenar os metadados do edital. Erro: ${emergencyError.message}. SOLUÇÃO: Configure o Ganache com gasLimit de pelo menos 10000000.`);
            }
        }

        console.log(error);
        throw error;
    }
}; 

const fase1_receberAlteracoes = async (id, year, newUrl, timestamp, CallContractAddress) => {
    const contract = new web3.eth.Contract(abiCallContract, CallContractAddress);

    try {
        const response = await contract.methods
            .receberAlteracoesEdital(id, year, newUrl, timestamp)
            .send({
                from: publicKey,
                gas: 5000000,
                gasPrice: '20000000000' // 20 Gwei
            })

        return response


    } catch (error) {


        console.log(error);
        throw error;
    }
};

const fase1_consultar_edital = async (CallContractAddress) => {
    const contract = new web3.eth.Contract(abiCallContract, CallContractAddress);

    try {
        const response = await contract.methods
            .getEdital()
            .call();

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase1_enviarMetadadosParaFase2 = async (masterContractAddress, CallContractAddress) => {
    const masterContract = new web3.eth.Contract(abiMasterContract, masterContractAddress);
    const callContract = new web3.eth.Contract(abiCallContract, CallContractAddress);

    try {


        await masterContract.methods
            .criarContratoFase2()
            .send(ContractOptimization.getPhaseCreationOptions(publicKey));

        const response = await masterContract.methods
            .avancarFase1ParaFase2()
            .send(ContractOptimization.getOptimizedTransactionOptions(publicKey));

        await callContract.methods.enviarMetadadosParaProximaFase().send(ContractOptimization.getOptimizedTransactionOptions(publicKey));

        const contractAddress = await getFaseAddresses(masterContractAddress);
        const contract2Address = contractAddress?.[1];

        return {
            contract2Address,
            ...response
        }


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase2_receberInscricaoObras = async (id, cnpj, idObra, timestamp, contractAddress) => {
    const contract = new web3.eth.Contract(abiSubmissionContract, contractAddress);

    try {
        const response = await contract.methods
            .receberInscricaoObras(id, cnpj, idObra, timestamp)
            .send(ContractOptimization.getSafeTransactionOptions(publicKey, true));

        return response


    } catch (error) {
        console.log(error);
        throw error;
    }
};

const fase2_emitirRelatorioObrasValidadas = async (id_obra, titulo, url, contractAddress) => {
        const contract = new web3.eth.Contract(abiSubmissionContract, contractAddress);


    try {
        const response = await contract.methods
            .emitirRelatorioObrasValidadas(id_obra, titulo, url)
            .send(ContractOptimization.getSafeTransactionOptions(publicKey, true));

        return response


    } catch (error) {
        console.log(error);
        throw error;
    }
};

const fase2_consultar_obras_validadas = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .consultarObra()
            .call();

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
}

const fase2_enviarMetadadosParaFase3 = async (masterContractAddress, submissionContractAddress) => {
    const masterContract = new web3.eth.Contract(abiMasterContract, masterContractAddress);
    const submissionContract = new web3.eth.Contract(abiSubmissionContract, submissionContractAddress);

    try {


        await masterContract.methods
            .criarContratoFase3()
            .send(ContractOptimization.getPhaseCreationOptions(publicKey));
        console.log('aqui contrato 1')
        const response = await masterContract.methods
            .avancarFase2ParaFase3()
            .send(ContractOptimization.getOptimizedTransactionOptions(publicKey));

        await submissionContract.methods.enviarObrasValidadasParaProximaFase().send(ContractOptimization.getOptimizedTransactionOptions(publicKey));

        console.log('aqui contrato 2')
        const contractAddress = await getFaseAddresses(masterContractAddress);
        console.log('aqui contrato 3')
        const contract2Address = contractAddress?.[1];
        const contract3Address = contractAddress?.[2];

        return {
            contract2Address,
            contract3Address,
            ...response
        }


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase3_receberAvaliadores = async (id_edital, id_obra, ids_equipes, ids_avaliadores, hash, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase3_receberAvaliadores(id_edital, id_obra, ids_equipes, ids_avaliadores, hash)
            .send({
                from: publicKey,
                gas: 5000000,
                gasPrice: '20000000000' // 20 Gwei
            });

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase3_emitirRelatorioCriterios = async (doc, historico_criterios, st_criterios, hash, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase3_receberAvaliadores(doc, historico_criterios, st_criterios, hash)
            .send({
                from: publicKey,
                gas: 5000000,
                gasPrice: '20000000000' // 20 Gwei
            });

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase3_enviarObrasAprovadas = async (id_obra, resenha, st_obra, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase3_receberAvaliadores(id_obra, resenha, st_obra)
            .send({
                from: publicKey,
                gas: 5000000,
                gasPrice: '20000000000' // 20 Gwei
            });

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase3_consultarRelatorioObras = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .consultarRelatorioObras()
            .call();

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};


const deployMasterContract = async (_contasEditoras, _numeroEdital) => {
    try {
        if (!_contasEditoras || !_numeroEdital) {
            throw new Error('Parameters _contasEditoras and _numeroEdital are required.');
        }

        console.log(`🔧 Deploying Master Contract with optimizations...`);
        console.log(`📝 Edital: ${_numeroEdital}`);
        console.log(`👥 Editoras: ${_contasEditoras.length} accounts`);

        const masterContractToDeploy = new web3.eth.Contract(abiMasterContract);

        // Configurações de deployment otimizadas para contratos grandes
        const deployOptions = {
            data: bytecodeMasterContract,
            arguments: [_contasEditoras, _numeroEdital],
        };

        // Deploy usando otimizações para contratos grandes
        const masterContract = await ContractOptimization.deployOptimized(
            masterContractToDeploy,
            deployOptions,
            publicKey,
            {
                safetyMargin: 1.9, // 90% de margem para contratos grandes
                gasPrice: '20000000000', // 20 Gwei
                gasLimit: 998500000 // Limite de gas maior para deployment
            }
        );

        const masterContractAddress = masterContract.options.address;

        console.log(`📍 Master Contract Address: ${masterContractAddress}`);
        console.log(`🔄 Creating Phase 1 contract...`);

        // Criar contrato da Fase 1 com configurações otimizadas
        const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

        const response = await contract.methods
            .criarContratoFase1()
            .send(ContractOptimization.getPhaseCreationOptions(publicKey));

        console.log(`✅ Phase 1 contract created successfully`);
        console.log(`🔍 Getting phase addresses...`);

        const contractAddress = await getFaseAddresses(masterContractAddress);
        const publicationAddress = contractAddress?.[0];

        console.log(`📍 Publication Address: ${publicationAddress}`);
        console.log(`🎉 Deployment completed successfully!`);

        return {
            masterContractAddress,
            publicationAddress
        };

    } catch (error) {
        console.error('❌ Contract deployment failed:', error);

        // Mensagens de erro mais específicas para contratos grandes
        if (error.message.includes('out of gas')) {
            console.error(`💡 Gas Issue: Try increasing gas limit or enabling compiler optimizations`);
            console.error(`💡 Current Ganache recommendations:`, ContractOptimization.getGanacheRecommendations());
        }

        if (error.message.includes('timeout')) {
            console.error(`💡 Timeout Issue: Large contracts need more time to deploy`);
        }

        if (error.message.includes('contract too large')) {
            console.error(`💡 Size Issue: Contract exceeds size limits, consider optimizations`);
        }

        throw error;
    }
};




module.exports = {
    // Master contract
    getObras,
    getFaseAddresses,
    deployMasterContract,
    // Fase 1
    fase1_receberMetadados,
    fase1_receberAlteracoes,
    fase1_enviarMetadadosParaFase2,
    // fase2
    fase2_receberInscricaoObras,
    fase2_emitirRelatorioObrasValidadas,
    fase1_consultar_edital,
    fase2_consultar_obras_validadas,
    fase2_enviarMetadadosParaFase3,
    // Fase 3
    fase3_receberAvaliadores,
    fase3_emitirRelatorioCriterios,
    fase3_enviarObrasAprovadas,
    fase3_consultarRelatorioObras

};
