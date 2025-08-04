const web3 = require('../web3.config');
const { abi: abiMasterContract, bytecode: bytecodeMasterContract } = require('../constants/contratoMestre').masterContract;
const { publicKey, privateKey } = require('../constants/accountsInfo').account;
const { abi: abiPublicationContract, bytecode: bytecodePublicationContract } = require('../constants/publicacao').publicationContract;
const { abi: abiSubmissionContract, bytecode: bytecodeSubmissionContract } = require('../constants/submissao').submissionContract;

const accountAddress = publicKey;
const masterContract = new web3.eth.Contract(abiMasterContract, accountAddress);

const sendTransaction = async function(methodName, params, masterContractAddress) {
    const contract = masterContractAddress ? new web3.eth.Contract(abiMasterContract, masterContractAddress) : masterContract;
    const address = this && this.accountAddress ? this.accountAddress : accountAddress;
    try {
        const method = contract.methods[methodName];
        const gas = await method(...params).estimateGas({ from: publicKey });
        const gasPrice = await web3.eth.getGasPrice();
        const data = method(...params).encodeABI();
        const nonce = await web3.eth.getTransactionCount(publicKey);
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: address,
                data,
                gas,
                gasPrice,
                nonce,
            },
            privateKey
        );
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    } catch (error) {
        console.error(`Transaction failed for method ${methodName}:`, error);
        throw error;
    }
};

// Helper para enviar transação para qualquer contrato

const definirCargo = async (_conta, _cargo) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'definirCargo', [_conta, _cargo]);
};

const criarContratoFase1 = async (masterContractAddress) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'criarContratoFase1', [masterContractAddress]);
};

const criarContratoFase2 = async () => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'criarContratoFase2', []);
};

const fase1_receberMetadados = async (id, title, year, url, ts, masterContractAddress) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'fase1_receberMetadados', [id, title, year, url, ts, masterContractAddress]);
};

const fase1_receberAlteracoes = async (id, data, newUrl, timestamp, masterContractAddress) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'fase1_receberAlteracoes', [id, data, newUrl, timestamp, masterContractAddress]);
};

const fase1_enviarMetadadosParaFase2 = async (masterContractAddress) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'fase1_enviarMetadadosParaFase2', [masterContractAddress]);
};

const fase2_receberInscricaoObras = async (id, cnpj, idObra, timestamp, masterContractAddress) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'fase2_receberInscricaoObras', [id, cnpj, idObra, timestamp, masterContractAddress]);
};

const fase2_emitirRelatorioObrasValidadas = async (id_obra, titulo, url, masterContractAddress) => {
    return await sendTransaction.call({ masterContract, accountAddress }, 'fase2_emitirRelatorioObrasValidadas', [id_obra, titulo, url, masterContractAddress]);
};

const deployMasterContract = async (_contasEditoras, _numeroEdital) => {
    try {
        if (!_contasEditoras || !_numeroEdital) {
            throw new Error('Parameters _contasEditoras and _numeroEdital are required.');
        }

        const masterContractToDeploy = new web3.eth.Contract(abiMasterContract);

        const deployTx = masterContractToDeploy.deploy({
            data: bytecodeMasterContract,
            arguments: [_contasEditoras, _numeroEdital],
        });

        const gas = await deployTx.estimateGas({ from: publicKey });
        const gasPrice = await web3.eth.getGasPrice();
        const data = deployTx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(publicKey);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                data,
                gas,
                gasPrice,
                nonce,
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        const masterContractAddress = receipt.contractAddress;
        console.log(`Master contract deployed at: ${masterContractAddress}`);

        // Create a new instance for the just-deployed contract
        const publicationContractToDeploy = new web3.eth.Contract(abiPublicationContract);
        const deployPublicationTx = publicationContractToDeploy.deploy({
            data: bytecodePublicationContract,
            arguments: [masterContractAddress],
        });

         
         const gasPublication = await deployPublicationTx.estimateGas({ from: publicKey });
        const gasPricePublication = await web3.eth.getGasPrice();
        const dataPublication = deployPublicationTx.encodeABI();
        const noncePublication = await web3.eth.getTransactionCount(publicKey);
        

        const signedPublicationTx = await web3.eth.accounts.signTransaction(
            {
                data: dataPublication,
                gas: gasPublication,
                gasPrice: gasPricePublication,  
                nonce: noncePublication,
                
            },
            privateKey
        );

         const publicationReceipt = await web3.eth.sendSignedTransaction(signedPublicationTx.rawTransaction);
        const publicationAddress = publicationReceipt.contractAddress;

       

        return {
            masterContractAddress,
            publicationAddress
        };

    } catch (error) {
        console.error('Contract deployment failed:', error);
        throw error;
    }
};


// Funções para o contrato de Publicação
const getPublicationContract = (address) => new web3.eth.Contract(abiPublicationContract, address);

const pub_receberMetadadosEdital = async (contractAddress, _id_edital, _title, _year, _url_document, _timestamp) => {
    const contract = getPublicationContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, accountAddress }, 'receberMetadadosEdital', [_id_edital, _title, _year, _url_document, _timestamp]);
};

const pub_receberAlteracoesEdital = async (contractAddress, _id_edital, _data_alteracao, _new_url_document, _timestamp) => {
    const contract = getPublicationContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, accountAddress }, 'receberAlteracoesEdital', [_id_edital, _data_alteracao, _new_url_document, _timestamp]);
};

const pub_enviarMetadadosParaProximaFase = async (contractAddress) => {
    const contract = getPublicationContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, accountAddress }, 'enviarMetadadosParaProximaFase', []);
};

const pub_edital = async (contractAddress) => {
    const contract = getPublicationContract(contractAddress);
    return await contract.methods.edital().call();
};

const pub_mestreAddress = async (contractAddress) => {
    const contract = getPublicationContract(contractAddress);
    return await contract.methods.mestreAddress().call();
};

// Funções para o contrato de Submissão
const getSubmissionContract = (address) => new web3.eth.Contract(abiSubmissionContract, address);

const sub_receberMetadadosDoEdital = async (contractAddress, _id_edital, _title) => {
    const contract = getSubmissionContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, accountAddress }, 'receberMetadadosDoEdital', [_id_edital, _title]);
};

const sub_receberInscricaoObras = async (contractAddress, _id_editora, _cnpj, _id_obra, _timestamp) => {
    const contract = getSubmissionContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, accountAddress }, 'receberInscricaoObras', [_id_editora, _cnpj, _id_obra, _timestamp]);
};

const sub_emitirRelatorioObrasValidadas = async (contractAddress, _id_obra, _titulo, _url_documento) => {
    const contract = getSubmissionContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, accountAddress }, 'emitirRelatorioObrasValidadas', [_id_obra, _titulo, _url_documento]);
};

const sub_enviarObrasValidadasParaProximaFase = async (contractAddress, _id_obra) => {
    const contract = getSubmissionContract(contractAddress);
    return await contract.methods.enviarObrasValidadasParaProximaFase(_id_obra).call();
};

const sub_obras = async (contractAddress, index) => {
    const contract = getSubmissionContract(contractAddress);
    return await contract.methods.obras(index).call();
};

const sub_obrasValidadasIds = async (contractAddress, index) => {
    const contract = getSubmissionContract(contractAddress);
    return await contract.methods.obrasValidadasIds(index).call();
};

const sub_mestreAddress = async (contractAddress) => {
    const contract = getSubmissionContract(contractAddress);
    return await contract.methods.mestreAddress().call();
};



module.exports = {
    // Master contract
    deployMasterContract,
    definirCargo,
    criarContratoFase1,
    criarContratoFase2,
    fase1_receberMetadados,
    fase1_receberAlteracoes,
    fase1_enviarMetadadosParaFase2,
    fase2_receberInscricaoObras,
    fase2_emitirRelatorioObrasValidadas,
    // Publication contract
    pub_receberMetadadosEdital,
    pub_receberAlteracoesEdital,
    pub_enviarMetadadosParaProximaFase,
    pub_edital,
    pub_mestreAddress,
    // Submission contract
    sub_receberMetadadosDoEdital,
    sub_receberInscricaoObras,
    sub_emitirRelatorioObrasValidadas,
    sub_enviarObrasValidadasParaProximaFase,
    sub_obras,
    sub_obrasValidadasIds,
    sub_mestreAddress,
};
