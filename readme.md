
Sempre executar esse coando para rodar o ganache

Como rodar a aplicação

1º Iniciar o Ganache (Blockchain local)

`npx ganache-cli --allowUnlimitedContractSize --gasLimit 15000000 --gasPrice 20000000000 --accounts 10 --defaultBalanceEther 1000 --port 7545`

2º Modificar o arquivo `accountsInfo.js` com as chaves públicas e privadas das contas do Ganache

3º Executar a aplicação com o comando `npm start` no terminal ou rodar o debug no VSCode

4º Executar as requisições listadas no postman