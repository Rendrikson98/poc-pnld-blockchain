const web3 = require('../../web3.config');
const { abi: abiMasterContract, bytecode: bytecodeMasterContract } = require('../constants/contratoMestre').masterContract;
const { publicKey, privateKey } = require('../constants/accountsInfo').account;

const contractAddress = process.env.MASTER_CONTRACT_ADDRESS;
const masterContract = new web3.eth.Contract(abiMasterContract, contractAddress);

const sendTransaction = async (methodName, params) => {
    try {
        const method = masterContract.methods[methodName];
        const gas = await method(...params).estimateGas({ from: publicKey });
        const gasPrice = await web3.eth.getGasPrice();
        const data = method(...params).encodeABI();
        const nonce = await web3.eth.getTransactionCount(publicKey);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
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

const definirCargo = async (_conta, _cargo) => {
    return await sendTransaction('definirCargo', [_conta, _cargo]);
};

const criarContratoFase1 = async () => {
    return await sendTransaction('criarContratoFase1', []);
};

const criarContratoFase2 = async () => {
    return await sendTransaction('criarContratoFase2', []);
};

const fase1_receberMetadados = async (id, title, year, url, ts) => {
    return await sendTransaction('fase1_receberMetadados', [id, title, year, url, ts]);
};

const fase1_receberAlteracoes = async (id, data, newUrl, timestamp) => {
    return await sendTransaction('fase1_receberAlteracoes', [id, data, newUrl, timestamp]);
};

const fase1_enviarMetadadosParaFase2 = async () => {
    return await sendTransaction('fase1_enviarMetadadosParaFase2', []);
};

const fase2_receberInscricaoObras = async (id_editora, cnpj, id_obra, ts) => {
    return await sendTransaction('fase2_receberInscricaoObras', [id_editora, cnpj, id_obra, ts]);
};

const fase2_emitirRelatorioObrasValidadas = async (id_obra, titulo, url) => {
    return await sendTransaction('fase2_emitirRelatorioObrasValidadas', [id_obra, titulo, url]);
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
        
        return receipt.contractAddress;

    } catch (error) {
        console.error('Contract deployment failed:', error);
        throw error;
    }
};

module.exports = {
    deployMasterContract,
    definirCargo,
    criarContratoFase1,
    criarContratoFase2,
    fase1_receberMetadados,
    fase1_receberAlteracoes,
    fase1_enviarMetadadosParaFase2,
    fase2_receberInscricaoObras,
    fase2_emitirRelatorioObrasValidadas,
};
