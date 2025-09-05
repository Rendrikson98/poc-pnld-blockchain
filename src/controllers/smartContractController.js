const web3 = require('../web3.config');
const { abi: abiMasterContract, bytecode: bytecodeMasterContract } = require('../constants/contratoMestre').masterContract;
const { publicKey, privateKey } = require('../constants/accountsInfo').account;
const { abi: abiPublicationContract, bytecode: bytecodePublicationContract } = require('../constants/publicacao').publicationContract;
const { abi: abiSubmissionContract, bytecode: bytecodeSubmissionContract } = require('../constants/submissao').submissionContract;

const accountAddress = publicKey;
const masterContract = new web3.eth.Contract(abiMasterContract, accountAddress);


const getFaseAddresses = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .getFaseAddresses()
            .call();

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

const definirCargo = async (_conta, _cargo) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'definirCargo', [_conta, _cargo]);
};


const criarContratoFase2 = async () => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'criarContratoFase2', []);
};

const fase1_receberMetadados = async (id, title, year, url, ts, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase1_receberMetadados(id, title, year, url, ts)
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

const fase1_receberAlteracoes = async (id, data, newUrl, timestamp, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase1_receberAlteracoes(id, data, newUrl, timestamp)
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

const fase1_consultar_edital = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .consultarEdital()
            .call();

        return response


    } catch (error) {
        console.log("OCORREU UM ERRO NA ATUALIZAÇÃO");
        console.log(error);
        throw error;
    }
};

const fase1_enviarMetadadosParaFase2 = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {


        await contract.methods
            .criarContratoFase2()
            .send({
                from: publicKey,
                gas: 6721975, gasPrice: 2000000000
            });

        const response = await contract.methods
            .fase1_enviarMetadadosParaFase2()
            .send({
                from: publicKey,
                gas: 5000000,
                gasPrice: '20000000000' // 20 Gwei
            });

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

const fase2_receberInscricaoObras = async (id, cnpj, idObra, timestamp, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase2_receberInscricaoObras(id, cnpj, idObra, timestamp)
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

const fase2_emitirRelatorioObrasValidadas = async (id_obra, titulo, url, masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {
        const response = await contract.methods
            .fase2_emitirRelatorioObrasValidadas(id_obra, titulo, url)
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

const fase2_enviarMetadadosParaFase3 = async (masterContractAddress) => {
    const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

    try {


        await contract.methods
            .criarContratoFase3()
            .send({
                from: publicKey,
                gas: 6721975, gasPrice: 2000000000
            });

        const response = await contract.methods
            .fase2_enviarObrasParaFase3()
            .send({
                from: publicKey,
                gas: 5000000,
                gasPrice: '20000000000' // 20 Gwei
            });

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

        const masterContractToDeploy = new web3.eth.Contract(abiMasterContract);

        const masterContract = await masterContractToDeploy.deploy({
            data: bytecodeMasterContract,
            arguments: [_contasEditoras, _numeroEdital],
        }).send({
            from: publicKey,
            gas: 5000000,
            gasPrice: '20000000000' // 20 Gwei
        });


        const masterContractAddress = masterContract._address

        const contract = new web3.eth.Contract(abiMasterContract, masterContractAddress);

        const response = await contract.methods
            .criarContratoFase1()
            .send({
                from: publicKey,
                gas: 6721975, gasPrice: 2000000000
            });


        console.log(response)
        console.log(`Master contract deployed at: ${masterContractAddress}`);

        const contractAddress = await getFaseAddresses(masterContractAddress);

        const publicationAddress = contractAddress?.[0]

        return {
            masterContractAddress,
            publicationAddress
        };

    } catch (error) {
        console.error('Contract deployment failed:', error);
        throw error;
    }
};




module.exports = {
    // Master contract
    getObras,
    getFaseAddresses,
    deployMasterContract,
    definirCargo,
    criarContratoFase2,
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
