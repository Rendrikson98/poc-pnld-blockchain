const web3 = require('../../web3.config');
const { abi: abiMasterContract, bytecode: bytecodeMasterContract } = require('../constants/contratoMestre').masterContract;
const { publicKey, privateKey } = require('../constants/accountsInfo').account;
const { abi: abiPublicationContract, bytecode: bytecodePublicationContract } = require('../constants/publicacao').publicationContract;
const { abi: abiSubmissionContract, bytecode: bytecodeSubmissionContract } = require('../constants/submissao').submissionContract;

const contractAddress = process.env.MASTER_CONTRACT_ADDRESS;
const masterContract = new web3.eth.Contract(abiMasterContract, contractAddress);

const sendTransaction = async function(methodName, params) {
    const contract = this && this.masterContract ? this.masterContract : masterContract;
    const address = this && this.contractAddress ? this.contractAddress : contractAddress;
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
    return await sendTransaction.call({ masterContract, contractAddress }, 'definirCargo', [_conta, _cargo]);
};

const criarContratoFase1 = async () => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'criarContratoFase1', []);
};

const criarContratoFase2 = async () => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'criarContratoFase2', []);
};

const fase1_receberMetadados = async (id, title, year, url, ts) => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'fase1_receberMetadados', [id, title, year, url, ts]);
};

const fase1_receberAlteracoes = async (id, data, newUrl, timestamp) => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'fase1_receberAlteracoes', [id, data, newUrl, timestamp]);
};

const fase1_enviarMetadadosParaFase2 = async () => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'fase1_enviarMetadadosParaFase2', []);
};

const fase2_receberInscricaoObras = async (id_editora, cnpj, id_obra, ts) => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'fase2_receberInscricaoObras', [id_editora, cnpj, id_obra, ts]);
};

const fase2_emitirRelatorioObrasValidadas = async (id_obra, titulo, url) => {
    return await sendTransaction.call({ masterContract, contractAddress }, 'fase2_emitirRelatorioObrasValidadas', [id_obra, titulo, url]);
};

const deployMasterContract = async (_contasEditoras, _numeroEdital) => {
    try {
        if (!_contasEditoras || !_numeroEdital) {
            throw new Error('Parameters _contasEditoras and _numeroEdital are required.');
        }

        console.log('aqui')

        const masterContractToDeploy = new web3.eth.Contract(abiMasterContract);
 console.log('aqui 2')
        const deployTx = masterContractToDeploy.deploy({
            data: bytecodeMasterContract,
            arguments: [_contasEditoras, _numeroEdital],
        });
 console.log('aqui 3')
        const gas = await deployTx.estimateGas({ from: publicKey });
        console.log('aqui 4')
        const gasPrice = await web3.eth.getGasPrice();
        console.log('aqui 5')
        const data = deployTx.encodeABI();
        console.log('aqui 6')
        const nonce = await web3.eth.getTransactionCount(publicKey);
        console.log('aqui 7')
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                data,
                gas,
                gasPrice,
                nonce,
            },
            privateKey
        );
        console.log('aqui 8')
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        const newContractAddress = receipt.contractAddress;

        console.log(`Master contract deployed at: ${newContractAddress}`);

        // Create a new instance for the just-deployed contract
        const newMasterContract = new web3.eth.Contract(abiMasterContract, newContractAddress);

        // Call a transaction on the new contract
        await sendTransaction.call({ masterContract: newMasterContract, contractAddress: newContractAddress }, 'criarContratoFase1', []);
        
        console.log('Phase 1 contract creation called.');

        return newContractAddress;

    } catch (error) {
        console.error('Contract deployment failed:', error);
        throw error;
    }
};


// Funções para o contrato de Publicação
const getPublicationContract = (address) => new web3.eth.Contract(abiPublicationContract, address);

const pub_receberMetadadosEdital = async (contractAddress, _id_edital, _title, _year, _url_document, _timestamp) => {
    const contract = getPublicationContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, contractAddress }, 'receberMetadadosEdital', [_id_edital, _title, _year, _url_document, _timestamp]);
};

const pub_receberAlteracoesEdital = async (contractAddress, _id_edital, _data_alteracao, _new_url_document, _timestamp) => {
    const contract = getPublicationContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, contractAddress }, 'receberAlteracoesEdital', [_id_edital, _data_alteracao, _new_url_document, _timestamp]);
};

const pub_enviarMetadadosParaProximaFase = async (contractAddress) => {
    const contract = getPublicationContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, contractAddress }, 'enviarMetadadosParaProximaFase', []);
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
    return await sendTransaction.call({ masterContract: contract, contractAddress }, 'receberMetadadosDoEdital', [_id_edital, _title]);
};

const sub_receberInscricaoObras = async (contractAddress, _id_editora, _cnpj, _id_obra, _timestamp) => {
    const contract = getSubmissionContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, contractAddress }, 'receberInscricaoObras', [_id_editora, _cnpj, _id_obra, _timestamp]);
};

const sub_emitirRelatorioObrasValidadas = async (contractAddress, _id_obra, _titulo, _url_documento) => {
    const contract = getSubmissionContract(contractAddress);
    return await sendTransaction.call({ masterContract: contract, contractAddress }, 'emitirRelatorioObrasValidadas', [_id_obra, _titulo, _url_documento]);
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
