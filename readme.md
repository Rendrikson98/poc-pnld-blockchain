
# Como rodar a aplicação

### 1º Iniciar o Ganache (Blockchain local)

Sempre executar esse comando para rodar o ganache:

```bash
npx ganache-cli --allowUnlimitedContractSize --gasLimit 15000000 --gasPrice 20000000000 --accounts 10 --defaultBalanceEther 1000 --port 7545
```

### 2º Configurar as contas

Modificar o arquivo `accountsInfo.js` com as chaves públicas e privadas das contas do Ganache

### 3º Executar a aplicação

Executar a aplicação com o comando `npm start` no terminal ou rodar o debug no VSCode

### 4º Testar a API

Executar as requisições listadas no postman

## Testes de Performance com K6

### Instalação do K6

#### Ubuntu/Debian:
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

#### macOS (com Homebrew):
```bash
brew install k6
```

#### Windows (com Chocolatey):
```bash
choco install k6
```

#### Ou baixar diretamente:
- Acesse: https://k6.io/docs/getting-started/installation/
- Baixe o binário para seu sistema operacional

### Executando os Testes de Performance

#### Teste básico:
```bash
k6 run teste_performance.js
```

#### Teste com configuração específica:
```bash
# Teste de carga com 20 usuários por 5 minutos
k6 run --stage 5m:20 teste_performance.js

# Teste de picos (10 → 100 → 10 usuários)
k6 run --stage 1m:10,30s:100,1m:10 teste_performance.js
```

#### Teste com relatório detalhado:
```bash
# Salvar resultados em JSON
k6 run --out json=results.json teste_performance.js

# Salvar resultados em CSV
k6 run --out csv=results.csv teste_performance.js
```

### Métricas Coletadas

O teste de performance coleta as seguintes métricas:

- **Taxa de Erro** - `http_req_failed`
- **Precisão dos Dados** - `data_accuracy_rate`
- **Disponibilidade** - Inferida da taxa de falhas
- **Latência de Rede (TTFB)** - `http_req_waiting`
- **Utilização de Banda** - `data_sent`, `data_received`
- **Taxa de Transferência** - `http_reqs`
- **Tempo de Resposta** - `http_req_duration`
- **Tempo de Serviço** - `http_req_duration`
- **Escalabilidade/Concorrência** - `vus`, `vus_max`

### Fluxo de Teste

O teste percorre todo o fluxo da aplicação:

1. Receber edital
2. Atualizar edital
3. Enviar metadados para próxima fase
4. Registrar obra
5. Emitir relatório (submissão)
6. Enviar para próxima fase (submissão)
7. Receber avaliadores
8. Emitir relatório (avaliação)

### Configurações Disponíveis

Consulte o arquivo `k6-config.json` para diferentes cenários de teste pré-configurados.