const masterContract = {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_contasEditoras",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_numeroEdital",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "conta",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ContratoMestre.Cargos",
          "name": "cargo",
          "type": "uint8"
        }
      ],
      "name": "CargoDefinido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "contratoAddress",
          "type": "address"
        }
      ],
      "name": "Fase1Criada",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "contratoAddress",
          "type": "address"
        }
      ],
      "name": "Fase2Criada",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "contratoAddress",
          "type": "address"
        }
      ],
      "name": "Fase3Criada",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "cargos",
      "outputs": [
        {
          "internalType": "enum ContratoMestre.Cargos",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fase1Address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fase2Address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fase3Address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numeroEdital",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFaseAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_conta",
          "type": "address"
        },
        {
          "internalType": "enum ContratoMestre.Cargos",
          "name": "_cargo",
          "type": "uint8"
        }
      ],
      "name": "definirCargo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "criarContratoFase1",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "criarContratoFase2",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "criarContratoFase3",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "year",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "ts",
          "type": "uint256"
        }
      ],
      "name": "fase1_receberMetadados",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "data",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "newUrl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "fase1_receberAlteracoes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fase1_enviarMetadadosParaFase2",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarEdital",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_edital",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "year",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "url_document",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct PublicacaoEdital.Edital",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id_editora",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "cnpj",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "id_obra",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ts",
          "type": "uint256"
        }
      ],
      "name": "fase2_receberInscricaoObras",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id_obra",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "titulo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        }
      ],
      "name": "fase2_emitirRelatorioObrasValidadas",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fase2_enviarObrasParaFase3",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarObra",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_obra",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id_editora",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "titulo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "url_documento",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "st_obra",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct SubmissaoObras.Obra",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarObrasValidadas",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_obra",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id_editora",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "titulo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "url_documento",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "st_obra",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct SubmissaoObras.Obra",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id_edital",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "id_obra",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "id_equipes",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "id_avaliadores",
          "type": "uint256[]"
        },
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "fase3_receberAvaliadores",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "doc",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "historico_criterios",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "st_criterios",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "fase3_emitirRelatorioCriterios",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id_obra",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "resenha",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "st_obra",
          "type": "string"
        }
      ],
      "name": "fase3_enviarObrasAprovadas",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarObraValidadaFase3",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_edital",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id_obra",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "st_obra",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct AvaliacaoPedagogica.ObraValidada",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarAvaliadores",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_edital",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id_obra",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "id_equipe",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "id_avaliador",
                  "type": "uint256"
                }
              ],
              "internalType": "struct AvaliacaoPedagogica.Avaliador[]",
              "name": "avaliadores",
              "type": "tuple[]"
            },
            {
              "internalType": "string",
              "name": "hash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct AvaliacaoPedagogica.AvaliadoresPorObra",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarRelatorioObras",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "nome_documento",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "historico",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "st_criterios",
                  "type": "string"
                }
              ],
              "internalType": "struct AvaliacaoPedagogica.Criterio[]",
              "name": "criterios",
              "type": "tuple[]"
            },
            {
              "internalType": "string",
              "name": "hash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct AvaliacaoPedagogica.RelatorioObras",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultarObraAprovada",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_obra",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "ds_resenha",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "st_obra",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct AvaliacaoPedagogica.ObraAprovada",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b506040516200a4bb3803806200a4bb8339818101604052810190620000379190620003c9565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060018190555060005b82518110156200019757600360026000858481518110620000a757620000a66200042f565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360058111156200010e576200010d6200045e565b5b02179055508281815181106200012957620001286200042f565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff167f8878a817d0f43cb0fdb885dc2b88e98dc6ea12508c2c54abbfa777a6498704096003604051620001799190620004de565b60405180910390a280806200018e906200052a565b91505062000081565b50505062000577565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200020482620001b9565b810181811067ffffffffffffffff82111715620002265762000225620001ca565b5b80604052505050565b60006200023b620001a0565b9050620002498282620001f9565b919050565b600067ffffffffffffffff8211156200026c576200026b620001ca565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002af8262000282565b9050919050565b620002c181620002a2565b8114620002cd57600080fd5b50565b600081519050620002e181620002b6565b92915050565b6000620002fe620002f8846200024e565b6200022f565b905080838252602082019050602084028301858111156200032457620003236200027d565b5b835b818110156200035157806200033c8882620002d0565b84526020840193505060208101905062000326565b5050509392505050565b600082601f830112620003735762000372620001b4565b5b815162000385848260208601620002e7565b91505092915050565b6000819050919050565b620003a3816200038e565b8114620003af57600080fd5b50565b600081519050620003c38162000398565b92915050565b60008060408385031215620003e357620003e2620001aa565b5b600083015167ffffffffffffffff811115620004045762000403620001af565b5b62000412858286016200035b565b92505060206200042585828601620003b2565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60068110620004a157620004a06200045e565b5b50565b6000819050620004b4826200048d565b919050565b6000620004c682620004a4565b9050919050565b620004d881620004b9565b82525050565b6000602082019050620004f56000830184620004cd565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000537826200038e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036200056c576200056b620004fb565b5b600182019050919050565b619f3480620005876000396000f3fe60806040523480156200001157600080fd5b5060043610620001d15760003560e01c8063736652aa1162000111578063b59a5a3411620000a5578063deae65f0116200007b578063deae65f01462000494578063e5353e5c14620004b8578063e5a186d814620004c4578063eff3714114620004e457620001d1565b8063b59a5a34146200042e578063c979694d1462000450578063ced980ea146200047257620001d1565b80638faf1faf11620000e75780638faf1faf14620003a8578063915ec95514620003ca578063a93a5f8d14620003ec578063a9ef56a0146200040e57620001d1565b8063736652aa146200035a5780637b3e03aa14620003665780638da5cb5b146200038657620001d1565b80633de28bdf11620001895780635a58dd6b116200015f5780635a58dd6b14620002e85780635eee65eb146200030a5780636300d4cd146200032c57806366f1838a146200033857620001d1565b80633de28bdf146200029a57806343908a9814620002a657806351aba38314620002c857620001d1565b80625d122214620001d657806305b4da8914620001f657806321650945146200022c5780632c687786146200024e5780632f83818f146200026e5780633484e63e146200027a575b600080fd5b620001f46004803603810190620001ee91906200289d565b62000504565b005b6200021460048036038101906200020e9190620029e7565b620006bf565b60405162000223919062002a99565b60405180910390f35b62000236620006df565b60405162000245919062002ac7565b60405180910390f35b6200026c600480360381019062000266919062002b0c565b620006e5565b005b6200027862000834565b005b62000298600480360381019062000292919062002b53565b620009ab565b005b620002a462000be4565b005b620002b062000ec0565b604051620002bf919062002d34565b60405180910390f35b620002e66004803603810190620002e0919062002b53565b62000f68565b005b620002f2620011a1565b60405162000301919062002dc3565b60405180910390f35b6200031462001249565b60405162000323919062002d34565b60405180910390f35b62000336620012f1565b005b62000342620015cf565b60405162000351919062002f5e565b60405180910390f35b6200036462001677565b005b6200038460048036038101906200037e919062002f82565b620017ee565b005b6200039062001a2d565b6040516200039f919062003059565b60405180910390f35b620003b262001a51565b604051620003c1919062003059565b60405180910390f35b620003d462001a77565b604051620003e39190620030fd565b60405180910390f35b620003f662001b1f565b60405162000405919062003059565b60405180910390f35b6200042c600480360381019062000426919062003218565b62001b45565b005b6200043862001cfd565b60405162000447919062003497565b60405180910390f35b6200045a62001da5565b60405162000469919062003059565b60405180910390f35b6200047c62001dcb565b6040516200048b91906200352d565b60405180910390f35b6200049e62001e73565b604051620004af9392919062003551565b60405180910390f35b620004c262001eec565b005b620004e26004803603810190620004dc91906200358e565b62002063565b005b620005026004803603810190620004fc91906200361f565b6200229f565b005b600160008160058111156200051e576200051d62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562000580576200057f62002a19565b5b1480620005d8575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b9050806200061d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006149062003737565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166355f5688888888888886040518663ffffffff1660e01b81526004016200068295949392919062003857565b600060405180830381600087803b1580156200069d57600080fd5b505af1158015620006b2573d6000803e3d6000fd5b5050505050505050505050565b60026020528060005260406000206000915054906101000a900460ff1681565b60015481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161462000776576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200076d906200393f565b60405180910390fd5b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690836005811115620007db57620007da62002a19565b5b02179055508173ffffffffffffffffffffffffffffffffffffffff167f8878a817d0f43cb0fdb885dc2b88e98dc6ea12508c2c54abbfa777a6498704098260405162000828919062002a99565b60405180910390a25050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614620008c5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620008bc906200393f565b60405180910390fd5b600030604051620008d690620024db565b620008e2919062003059565b604051809103906000f080158015620008ff573d6000803e3d6000fd5b50905080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fedbfd6e19d8a4ccc04ff7aeb7d5476ca663600f83f716418f04a2836e3992af260405160405180910390a250565b600260036000826005811115620009c757620009c662002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562000a295762000a2862002a19565b5b148062000aab575081600581111562000a475762000a4662002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562000aa95762000aa862002a19565b5b145b8062000b02575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b90508062000b47576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000b3e9062003737565b60405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166352ac34488787876040518463ffffffff1660e01b815260040162000ba89392919062003961565b600060405180830381600087803b15801562000bc357600080fd5b505af115801562000bd8573d6000803e3d6000fd5b50505050505050505050565b60016002600082600581111562000c005762000bff62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562000c625762000c6162002a19565b5b148062000ce4575081600581111562000c805762000c7f62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562000ce25762000ce162002a19565b5b145b8062000d3b575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b90508062000d80576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000d779062003737565b60405180910390fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bbd7ba4c6040518163ffffffff1660e01b81526004016000604051808303816000875af115801562000df2573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062000e1d919062003b24565b9050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fbe2adf826000015183602001516040518363ffffffff1660e01b815260040162000e8692919062003b75565b600060405180830381600087803b15801562000ea157600080fd5b505af115801562000eb6573d6000803e3d6000fd5b5050505050505050565b62000eca620024e9565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bc5e79e46040518163ffffffff1660e01b8152600401600060405180830381865afa15801562000f38573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062000f63919062003cb7565b905090565b60016002600082600581111562000f845762000f8362002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562000fe65762000fe562002a19565b5b148062001068575081600581111562001004576200100362002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562001066576200106562002a19565b5b145b80620010bf575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b90508062001104576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620010fb9062003737565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f5465b738787876040518463ffffffff1660e01b8152600401620011659392919062003961565b600060405180830381600087803b1580156200118057600080fd5b505af115801562001195573d6000803e3d6000fd5b50505050505050505050565b620011ab6200251f565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bc5e79e46040518163ffffffff1660e01b8152600401600060405180830381865afa15801562001219573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062001244919062003dac565b905090565b62001253620024e9565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e3e772046040518163ffffffff1660e01b8152600401600060405180830381865afa158015620012c1573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190620012ec919062003cb7565b905090565b6002600160008260058111156200130d576200130c62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660058111156200136f576200136e62002a19565b5b1480620013f157508160058111156200138d576200138c62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166005811115620013ef57620013ee62002a19565b5b145b8062001448575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b9050806200148d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620014849062003737565b60405180910390fd5b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663912babb06040518163ffffffff1660e01b8152600401600060405180830381865afa158015620014fd573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062001528919062003cb7565b9050600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166358857180600154836000015184608001516040518463ffffffff1660e01b8152600401620015959392919062003dfd565b600060405180830381600087803b158015620015b057600080fd5b505af1158015620015c5573d6000803e3d6000fd5b5050505050505050565b620015d962002547565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663284dfd1e6040518163ffffffff1660e01b8152600401600060405180830381865afa15801562001647573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062001672919062004049565b905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161462001708576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620016ff906200393f565b60405180910390fd5b600030604051620017199062002576565b62001725919062003059565b604051809103906000f08015801562001742573d6000803e3d6000fd5b50905080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f0dd7bef962e203d346f55e54aaf169dbbbce1bd1ab72187bcf5f6c885e26e0ec60405160405180910390a250565b6001600260008260058111156200180a576200180962002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660058111156200186c576200186b62002a19565b5b1480620018ee57508160058111156200188a576200188962002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166005811115620018ec57620018eb62002a19565b5b145b8062001945575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b9050806200198a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620019819062003737565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dea4de4189898989896040518663ffffffff1660e01b8152600401620019ef9594939291906200409a565b600060405180830381600087803b15801562001a0a57600080fd5b505af115801562001a1f573d6000803e3d6000fd5b505050505050505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b62001a8162002584565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663faa9b6226040518163ffffffff1660e01b8152600401600060405180830381865afa15801562001aef573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062001b1a919062003b24565b905090565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001600081600581111562001b5f5762001b5e62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562001bc15762001bc062002a19565b5b148062001c19575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b90508062001c5e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162001c559062003737565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d7e3e486878787876040518563ffffffff1660e01b815260040162001cc19493929190620041d5565b600060405180830381600087803b15801562001cdc57600080fd5b505af115801562001cf1573d6000803e3d6000fd5b50505050505050505050565b62001d07620025b3565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e86c8be26040518163ffffffff1660e01b8152600401600060405180830381865afa15801562001d75573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062001da09190620044ae565b905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b62001dd5620025db565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f9dd4dc6040518163ffffffff1660e01b8152600401600060405180830381865afa15801562001e43573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019062001e6e9190620045c2565b905090565b6000806000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16925092509250909192565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161462001f7d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162001f74906200393f565b60405180910390fd5b60003060405162001f8e9062002603565b62001f9a919062003059565b604051809103906000f08015801562001fb7573d6000803e3d6000fd5b50905080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb74be52317655c502dab4ff1eece8ba012331c4217fd990d0948bbe26038bd4360405160405180910390a250565b6002600360008260058111156200207f576200207e62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166005811115620020e157620020e062002a19565b5b1480620021635750816005811115620020ff57620020fe62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600581111562002161576200216062002a19565b5b145b80620021ba575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b905080620021ff576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620021f69062003737565b60405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c97b0e19888888886040518563ffffffff1660e01b815260040162002262949392919062004613565b600060405180830381600087803b1580156200227d57600080fd5b505af115801562002292573d6000803e3d6000fd5b5050505050505050505050565b600160026000826005811115620022bb57620022ba62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660058111156200231d576200231c62002a19565b5b14806200239f57508160058111156200233b576200233a62002a19565b5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660058111156200239d576200239c62002a19565b5b145b80620023f6575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b9050806200243b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620024329062003737565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a342c211888888886040518563ffffffff1660e01b81526004016200249e949392919062004667565b600060405180830381600087803b158015620024b957600080fd5b505af1158015620024ce573d6000803e3d6000fd5b5050505050505050505050565b610fa180620046bc83390190565b6040518060c001604052806000815260200160008152602001606081526020016060815260200160608152602001600081525090565b6040518060800160405280600081526020016000815260200160608152602001600081525090565b6040518060a0016040528060008152602001600081526020016060815260200160608152602001600081525090565b612c64806200565d83390190565b6040518060a0016040528060008152602001606081526020016000815260200160608152602001600081525090565b6040518060800160405280606081526020016060815260200160608152602001600081525090565b6040518060800160405280600081526020016060815260200160608152602001600081525090565b611c3e80620082c183390190565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6200263a8162002625565b81146200264657600080fd5b50565b6000813590506200265a816200262f565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620026b08262002665565b810181811067ffffffffffffffff82111715620026d257620026d162002676565b5b80604052505050565b6000620026e762002611565b9050620026f58282620026a5565b919050565b600067ffffffffffffffff82111562002718576200271762002676565b5b602082029050602081019050919050565b600080fd5b6000620027456200273f84620026fa565b620026db565b905080838252602082019050602084028301858111156200276b576200276a62002729565b5b835b8181101562002798578062002783888262002649565b8452602084019350506020810190506200276d565b5050509392505050565b600082601f830112620027ba57620027b962002660565b5b8135620027cc8482602086016200272e565b91505092915050565b600080fd5b600067ffffffffffffffff821115620027f857620027f762002676565b5b620028038262002665565b9050602081019050919050565b82818337600083830152505050565b6000620028366200283084620027da565b620026db565b905082815260208101848484011115620028555762002854620027d5565b5b6200286284828562002810565b509392505050565b600082601f83011262002882576200288162002660565b5b8135620028948482602086016200281f565b91505092915050565b600080600080600060a08688031215620028bc57620028bb6200261b565b5b6000620028cc8882890162002649565b9550506020620028df8882890162002649565b945050604086013567ffffffffffffffff81111562002903576200290262002620565b5b6200291188828901620027a2565b935050606086013567ffffffffffffffff81111562002935576200293462002620565b5b6200294388828901620027a2565b925050608086013567ffffffffffffffff81111562002967576200296662002620565b5b62002975888289016200286a565b9150509295509295909350565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620029af8262002982565b9050919050565b620029c181620029a2565b8114620029cd57600080fd5b50565b600081359050620029e181620029b6565b92915050565b60006020828403121562002a0057620029ff6200261b565b5b600062002a1084828501620029d0565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6006811062002a5c5762002a5b62002a19565b5b50565b600081905062002a6f8262002a48565b919050565b600062002a818262002a5f565b9050919050565b62002a938162002a74565b82525050565b600060208201905062002ab0600083018462002a88565b92915050565b62002ac18162002625565b82525050565b600060208201905062002ade600083018462002ab6565b92915050565b6006811062002af257600080fd5b50565b60008135905062002b068162002ae4565b92915050565b6000806040838503121562002b265762002b256200261b565b5b600062002b3685828601620029d0565b925050602062002b498582860162002af5565b9150509250929050565b60008060006060848603121562002b6f5762002b6e6200261b565b5b600062002b7f8682870162002649565b935050602084013567ffffffffffffffff81111562002ba35762002ba262002620565b5b62002bb1868287016200286a565b925050604084013567ffffffffffffffff81111562002bd55762002bd462002620565b5b62002be3868287016200286a565b9150509250925092565b62002bf88162002625565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562002c3a57808201518184015260208101905062002c1d565b8381111562002c4a576000848401525b50505050565b600062002c5d8262002bfe565b62002c69818562002c09565b935062002c7b81856020860162002c1a565b62002c868162002665565b840191505092915050565b600060c08301600083015162002cab600086018262002bed565b50602083015162002cc0602086018262002bed565b506040830151848203604086015262002cda828262002c50565b9150506060830151848203606086015262002cf6828262002c50565b9150506080830151848203608086015262002d12828262002c50565b91505060a083015162002d2960a086018262002bed565b508091505092915050565b6000602082019050818103600083015262002d50818462002c91565b905092915050565b600060808301600083015162002d72600086018262002bed565b50602083015162002d87602086018262002bed565b506040830151848203604086015262002da1828262002c50565b915050606083015162002db8606086018262002bed565b508091505092915050565b6000602082019050818103600083015262002ddf818462002d58565b905092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60408201600082015162002e2b600085018262002bed565b50602082015162002e40602085018262002bed565b50505050565b600062002e54838362002e13565b60408301905092915050565b6000602082019050919050565b600062002e7a8262002de7565b62002e86818562002df2565b935062002e938362002e03565b8060005b8381101562002eca57815162002eae888262002e46565b975062002ebb8362002e60565b92505060018101905062002e97565b5085935050505092915050565b600060a08301600083015162002ef1600086018262002bed565b50602083015162002f06602086018262002bed565b506040830151848203604086015262002f20828262002e6d565b9150506060830151848203606086015262002f3c828262002c50565b915050608083015162002f53608086018262002bed565b508091505092915050565b6000602082019050818103600083015262002f7a818462002ed7565b905092915050565b600080600080600060a0868803121562002fa15762002fa06200261b565b5b600062002fb18882890162002649565b955050602086013567ffffffffffffffff81111562002fd55762002fd462002620565b5b62002fe3888289016200286a565b945050604062002ff68882890162002649565b935050606086013567ffffffffffffffff8111156200301a576200301962002620565b5b62003028888289016200286a565b92505060806200303b8882890162002649565b9150509295509295909350565b6200305381620029a2565b82525050565b600060208201905062003070600083018462003048565b92915050565b600060a08301600083015162003090600086018262002bed565b5060208301518482036020860152620030aa828262002c50565b9150506040830151620030c1604086018262002bed565b5060608301518482036060860152620030db828262002c50565b9150506080830151620030f2608086018262002bed565b508091505092915050565b6000602082019050818103600083015262003119818462003076565b905092915050565b600067ffffffffffffffff8211156200313f576200313e62002676565b5b602082029050602081019050919050565b600062003167620031618462003121565b620026db565b905080838252602082019050602084028301858111156200318d576200318c62002729565b5b835b81811015620031db57803567ffffffffffffffff811115620031b657620031b562002660565b5b808601620031c589826200286a565b855260208501945050506020810190506200318f565b5050509392505050565b600082601f830112620031fd57620031fc62002660565b5b81356200320f84826020860162003150565b91505092915050565b600080600080608085870312156200323557620032346200261b565b5b600085013567ffffffffffffffff81111562003256576200325562002620565b5b62003264878288016200286a565b945050602085013567ffffffffffffffff81111562003288576200328762002620565b5b6200329687828801620031e5565b935050604085013567ffffffffffffffff811115620032ba57620032b962002620565b5b620032c887828801620031e5565b925050606085013567ffffffffffffffff811115620032ec57620032eb62002620565b5b620032fa878288016200286a565b91505092959194509250565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000604083016000830151848203600086015262003351828262002c50565b915050602083015184820360208601526200336d828262002c50565b9150508091505092915050565b600062003388838362003332565b905092915050565b6000602082019050919050565b6000620033aa8262003306565b620033b6818562003311565b935083602082028501620033ca8562003322565b8060005b858110156200340c5784840389528151620033ea85826200337a565b9450620033f78362003390565b925060208a01995050600181019050620033ce565b50829750879550505050505092915050565b600060808301600083015184820360008601526200343d828262002c50565b915050602083015184820360208601526200345982826200339d565b9150506040830151848203604086015262003475828262002c50565b91505060608301516200348c606086018262002bed565b508091505092915050565b60006020820190508181036000830152620034b381846200341e565b905092915050565b6000608083016000830151620034d5600086018262002bed565b5060208301518482036020860152620034ef828262002c50565b915050604083015184820360408601526200350b828262002c50565b915050606083015162003522606086018262002bed565b508091505092915050565b60006020820190508181036000830152620035498184620034bb565b905092915050565b600060608201905062003568600083018662003048565b62003577602083018562003048565b62003586604083018462003048565b949350505050565b60008060008060808587031215620035ab57620035aa6200261b565b5b6000620035bb8782880162002649565b945050602085013567ffffffffffffffff811115620035df57620035de62002620565b5b620035ed878288016200286a565b9350506040620036008782880162002649565b9250506060620036138782880162002649565b91505092959194509250565b600080600080608085870312156200363c576200363b6200261b565b5b60006200364c8782880162002649565b94505060206200365f8782880162002649565b935050604085013567ffffffffffffffff81111562003683576200368262002620565b5b62003691878288016200286a565b9250506060620036a48782880162002649565b91505092959194509250565b600082825260208201905092915050565b7f41636573736f206e656761646f3a2073657520636172676f206e616f2070657260008201527f6d6974652065737461206163616f2e0000000000000000000000000000000000602082015250565b60006200371f602f83620036b0565b91506200372c82620036c1565b604082019050919050565b60006020820190508181036000830152620037528162003710565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600062003793838362002bed565b60208301905092915050565b6000602082019050919050565b6000620037b98262003759565b620037c5818562003764565b9350620037d28362003775565b8060005b8381101562003809578151620037ed888262003785565b9750620037fa836200379f565b925050600181019050620037d6565b5085935050505092915050565b6000620038238262002bfe565b6200382f8185620036b0565b93506200384181856020860162002c1a565b6200384c8162002665565b840191505092915050565b600060a0820190506200386e600083018862002ab6565b6200387d602083018762002ab6565b8181036040830152620038918186620037ac565b90508181036060830152620038a78185620037ac565b90508181036080830152620038bd818462003816565b90509695505050505050565b7f41636573736f206e656761646f3a20736f6d656e7465206f2063726961646f7260008201527f20646f20636f6e747261746f2e00000000000000000000000000000000000000602082015250565b600062003927602d83620036b0565b91506200393482620038c9565b604082019050919050565b600060208201905081810360008301526200395a8162003918565b9050919050565b600060608201905062003978600083018662002ab6565b81810360208301526200398c818562003816565b90508181036040830152620039a2818462003816565b9050949350505050565b600080fd5b600080fd5b600081519050620039c7816200262f565b92915050565b6000620039e4620039de84620027da565b620026db565b90508281526020810184848401111562003a035762003a02620027d5565b5b62003a1084828562002c1a565b509392505050565b600082601f83011262003a305762003a2f62002660565b5b815162003a42848260208601620039cd565b91505092915050565b600060a0828403121562003a645762003a63620039ac565b5b62003a7060a0620026db565b9050600062003a8284828501620039b6565b600083015250602082015167ffffffffffffffff81111562003aa95762003aa8620039b1565b5b62003ab78482850162003a18565b602083015250604062003acd84828501620039b6565b604083015250606082015167ffffffffffffffff81111562003af45762003af3620039b1565b5b62003b028482850162003a18565b606083015250608062003b1884828501620039b6565b60808301525092915050565b60006020828403121562003b3d5762003b3c6200261b565b5b600082015167ffffffffffffffff81111562003b5e5762003b5d62002620565b5b62003b6c8482850162003a4b565b91505092915050565b600060408201905062003b8c600083018562002ab6565b818103602083015262003ba0818462003816565b90509392505050565b600060c0828403121562003bc25762003bc1620039ac565b5b62003bce60c0620026db565b9050600062003be084828501620039b6565b600083015250602062003bf684828501620039b6565b602083015250604082015167ffffffffffffffff81111562003c1d5762003c1c620039b1565b5b62003c2b8482850162003a18565b604083015250606082015167ffffffffffffffff81111562003c525762003c51620039b1565b5b62003c608482850162003a18565b606083015250608082015167ffffffffffffffff81111562003c875762003c86620039b1565b5b62003c958482850162003a18565b60808301525060a062003cab84828501620039b6565b60a08301525092915050565b60006020828403121562003cd05762003ccf6200261b565b5b600082015167ffffffffffffffff81111562003cf15762003cf062002620565b5b62003cff8482850162003ba9565b91505092915050565b60006080828403121562003d215762003d20620039ac565b5b62003d2d6080620026db565b9050600062003d3f84828501620039b6565b600083015250602062003d5584828501620039b6565b602083015250604082015167ffffffffffffffff81111562003d7c5762003d7b620039b1565b5b62003d8a8482850162003a18565b604083015250606062003da084828501620039b6565b60608301525092915050565b60006020828403121562003dc55762003dc46200261b565b5b600082015167ffffffffffffffff81111562003de65762003de562002620565b5b62003df48482850162003d08565b91505092915050565b600060608201905062003e14600083018662002ab6565b62003e23602083018562002ab6565b818103604083015262003e37818462003816565b9050949350505050565b600067ffffffffffffffff82111562003e5f5762003e5e62002676565b5b602082029050602081019050919050565b60006040828403121562003e895762003e88620039ac565b5b62003e956040620026db565b9050600062003ea784828501620039b6565b600083015250602062003ebd84828501620039b6565b60208301525092915050565b600062003ee062003eda8462003e41565b620026db565b9050808382526020820190506040840283018581111562003f065762003f0562002729565b5b835b8181101562003f33578062003f1e888262003e70565b84526020840193505060408101905062003f08565b5050509392505050565b600082601f83011262003f555762003f5462002660565b5b815162003f6784826020860162003ec9565b91505092915050565b600060a0828403121562003f895762003f88620039ac565b5b62003f9560a0620026db565b9050600062003fa784828501620039b6565b600083015250602062003fbd84828501620039b6565b602083015250604082015167ffffffffffffffff81111562003fe45762003fe3620039b1565b5b62003ff28482850162003f3d565b604083015250606082015167ffffffffffffffff811115620040195762004018620039b1565b5b620040278482850162003a18565b60608301525060806200403d84828501620039b6565b60808301525092915050565b6000602082840312156200406257620040616200261b565b5b600082015167ffffffffffffffff81111562004083576200408262002620565b5b620040918482850162003f70565b91505092915050565b600060a082019050620040b1600083018862002ab6565b8181036020830152620040c5818762003816565b9050620040d6604083018662002ab6565b8181036060830152620040ea818562003816565b9050620040fb608083018462002ab6565b9695505050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60006200413f838362002c50565b905092915050565b6000602082019050919050565b6000620041618262004105565b6200416d818562004110565b935083602082028501620041818562004121565b8060005b85811015620041c35784840389528151620041a1858262004131565b9450620041ae8362004147565b925060208a0199505060018101905062004185565b50829750879550505050505092915050565b60006080820190508181036000830152620041f1818762003816565b9050818103602083015262004207818662004154565b905081810360408301526200421d818562004154565b9050818103606083015262004233818462003816565b905095945050505050565b600067ffffffffffffffff8211156200425c576200425b62002676565b5b602082029050602081019050919050565b600060408284031215620042865762004285620039ac565b5b620042926040620026db565b9050600082015167ffffffffffffffff811115620042b557620042b4620039b1565b5b620042c38482850162003a18565b600083015250602082015167ffffffffffffffff811115620042ea57620042e9620039b1565b5b620042f88482850162003a18565b60208301525092915050565b60006200431b62004315846200423e565b620026db565b9050808382526020820190506020840283018581111562004341576200434062002729565b5b835b818110156200438f57805167ffffffffffffffff8111156200436a576200436962002660565b5b8086016200437989826200426d565b8552602085019450505060208101905062004343565b5050509392505050565b600082601f830112620043b157620043b062002660565b5b8151620043c384826020860162004304565b91505092915050565b600060808284031215620043e557620043e4620039ac565b5b620043f16080620026db565b9050600082015167ffffffffffffffff811115620044145762004413620039b1565b5b620044228482850162003a18565b600083015250602082015167ffffffffffffffff811115620044495762004448620039b1565b5b620044578482850162004399565b602083015250604082015167ffffffffffffffff8111156200447e576200447d620039b1565b5b6200448c8482850162003a18565b6040830152506060620044a284828501620039b6565b60608301525092915050565b600060208284031215620044c757620044c66200261b565b5b600082015167ffffffffffffffff811115620044e857620044e762002620565b5b620044f684828501620043cc565b91505092915050565b600060808284031215620045185762004517620039ac565b5b620045246080620026db565b905060006200453684828501620039b6565b600083015250602082015167ffffffffffffffff8111156200455d576200455c620039b1565b5b6200456b8482850162003a18565b602083015250604082015167ffffffffffffffff811115620045925762004591620039b1565b5b620045a08482850162003a18565b6040830152506060620045b684828501620039b6565b60608301525092915050565b600060208284031215620045db57620045da6200261b565b5b600082015167ffffffffffffffff811115620045fc57620045fb62002620565b5b6200460a84828501620044ff565b91505092915050565b60006080820190506200462a600083018762002ab6565b81810360208301526200463e818662003816565b90506200464f604083018562002ab6565b6200465e606083018462002ab6565b95945050505050565b60006080820190506200467e600083018762002ab6565b6200468d602083018662002ab6565b8181036040830152620046a1818562003816565b9050620046b2606083018462002ab6565b9594505050505056fe608060405234801561001057600080fd5b5060405162000fa138038062000fa1833981810160405281019061003491906100dd565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061010a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100aa8261007f565b9050919050565b6100ba8161009f565b81146100c557600080fd5b50565b6000815190506100d7816100b1565b92915050565b6000602082840312156100f3576100f261007a565b5b6000610101848285016100c8565b91505092915050565b610e87806200011a6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630830ee0014610067578063635971ef14610089578063a342c211146100a7578063bbd7ba4c146100c3578063dea4de41146100e1578063faa9b622146100fd575b600080fd5b61006f61011b565b604051610080959493929190610826565b60405180910390f35b61009161024f565b60405161009e91906108c8565b60405180910390f35b6100c160048036038101906100bc9190610a58565b610273565b005b6100cb6102da565b6040516100d89190610bb1565b60405180910390f35b6100fb60048036038101906100f69190610bd3565b61047e565b005b610105610546565b6040516101129190610bb1565b60405180910390f35b600180600001549080600101805461013290610cb5565b80601f016020809104026020016040519081016040528092919081815260200182805461015e90610cb5565b80156101ab5780601f10610180576101008083540402835291602001916101ab565b820191906000526020600020905b81548152906001019060200180831161018e57829003601f168201915b5050505050908060020154908060030180546101c690610cb5565b80601f01602080910402602001604051908101604052809291908181526020018280546101f290610cb5565b801561023f5780601f106102145761010080835404028352916020019161023f565b820191906000526020600020905b81548152906001019060200180831161022257829003601f168201915b5050505050908060040154905085565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b816001600301908051906020019061028c9291906106a2565b50806001600401819055507f0669b5aea803389a9300c109f958365fd57358ccf8d5ddc7d6454d5f8009b59f848484846040516102cc9493929190610ce6565b60405180910390a150505050565b6102e2610728565b7ff23cfa03805a8f830584b7be6c2100aab03499bb682836134530510a53331e9f6001600001546001800160016002015460405161032293929190610dc7565b60405180910390a160016040518060a00160405290816000820154815260200160018201805461035190610cb5565b80601f016020809104026020016040519081016040528092919081815260200182805461037d90610cb5565b80156103ca5780601f1061039f576101008083540402835291602001916103ca565b820191906000526020600020905b8154815290600101906020018083116103ad57829003601f168201915b50505050508152602001600282015481526020016003820180546103ed90610cb5565b80601f016020809104026020016040519081016040528092919081815260200182805461041990610cb5565b80156104665780601f1061043b57610100808354040283529160200191610466565b820191906000526020600020905b81548152906001019060200180831161044957829003601f168201915b50505050508152602001600482015481525050905090565b6040518060a001604052808681526020018581526020018481526020018381526020018281525060016000820151816000015560208201518160010190805190602001906104cd9291906106a2565b506040820151816002015560608201518160030190805190602001906104f49291906106a2565b50608082015181600401559050507f6934cb4e77c4a9b6a0cfca9866b76a3c728b6a9600def7b9a007ed824a260b66858585846040516105379493929190610e05565b60405180910390a15050505050565b61054e610728565b60016040518060a00160405290816000820154815260200160018201805461057590610cb5565b80601f01602080910402602001604051908101604052809291908181526020018280546105a190610cb5565b80156105ee5780601f106105c3576101008083540402835291602001916105ee565b820191906000526020600020905b8154815290600101906020018083116105d157829003601f168201915b505050505081526020016002820154815260200160038201805461061190610cb5565b80601f016020809104026020016040519081016040528092919081815260200182805461063d90610cb5565b801561068a5780601f1061065f5761010080835404028352916020019161068a565b820191906000526020600020905b81548152906001019060200180831161066d57829003601f168201915b50505050508152602001600482015481525050905090565b8280546106ae90610cb5565b90600052602060002090601f0160209004810192826106d05760008555610717565b82601f106106e957805160ff1916838001178555610717565b82800160010185558215610717579182015b828111156107165782518255916020019190600101906106fb565b5b5090506107249190610757565b5090565b6040518060a0016040528060008152602001606081526020016000815260200160608152602001600081525090565b5b80821115610770576000816000905550600101610758565b5090565b6000819050919050565b61078781610774565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156107c75780820151818401526020810190506107ac565b838111156107d6576000848401525b50505050565b6000601f19601f8301169050919050565b60006107f88261078d565b6108028185610798565b93506108128185602086016107a9565b61081b816107dc565b840191505092915050565b600060a08201905061083b600083018861077e565b818103602083015261084d81876107ed565b905061085c604083018661077e565b818103606083015261086e81856107ed565b905061087d608083018461077e565b9695505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108b282610887565b9050919050565b6108c2816108a7565b82525050565b60006020820190506108dd60008301846108b9565b92915050565b6000604051905090565b600080fd5b600080fd5b61090081610774565b811461090b57600080fd5b50565b60008135905061091d816108f7565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610965826107dc565b810181811067ffffffffffffffff821117156109845761098361092d565b5b80604052505050565b60006109976108e3565b90506109a3828261095c565b919050565b600067ffffffffffffffff8211156109c3576109c261092d565b5b6109cc826107dc565b9050602081019050919050565b82818337600083830152505050565b60006109fb6109f6846109a8565b61098d565b905082815260208101848484011115610a1757610a16610928565b5b610a228482856109d9565b509392505050565b600082601f830112610a3f57610a3e610923565b5b8135610a4f8482602086016109e8565b91505092915050565b60008060008060808587031215610a7257610a716108ed565b5b6000610a808782880161090e565b9450506020610a918782880161090e565b935050604085013567ffffffffffffffff811115610ab257610ab16108f2565b5b610abe87828801610a2a565b9250506060610acf8782880161090e565b91505092959194509250565b610ae481610774565b82525050565b600082825260208201905092915050565b6000610b068261078d565b610b108185610aea565b9350610b208185602086016107a9565b610b29816107dc565b840191505092915050565b600060a083016000830151610b4c6000860182610adb565b5060208301518482036020860152610b648282610afb565b9150506040830151610b796040860182610adb565b5060608301518482036060860152610b918282610afb565b9150506080830151610ba66080860182610adb565b508091505092915050565b60006020820190508181036000830152610bcb8184610b34565b905092915050565b600080600080600060a08688031215610bef57610bee6108ed565b5b6000610bfd8882890161090e565b955050602086013567ffffffffffffffff811115610c1e57610c1d6108f2565b5b610c2a88828901610a2a565b9450506040610c3b8882890161090e565b935050606086013567ffffffffffffffff811115610c5c57610c5b6108f2565b5b610c6888828901610a2a565b9250506080610c798882890161090e565b9150509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610ccd57607f821691505b602082108103610ce057610cdf610c86565b5b50919050565b6000608082019050610cfb600083018761077e565b610d08602083018661077e565b8181036040830152610d1a81856107ed565b9050610d29606083018461077e565b95945050505050565b60008190508160005260206000209050919050565b60008154610d5481610cb5565b610d5e8186610798565b94506001821660008114610d795760018114610d8b57610dbe565b60ff1983168652602086019350610dbe565b610d9485610d32565b60005b83811015610db657815481890152600182019150602081019050610d97565b808801955050505b50505092915050565b6000606082019050610ddc600083018661077e565b8181036020830152610dee8185610d47565b9050610dfd604083018461077e565b949350505050565b6000608082019050610e1a600083018761077e565b8181036020830152610e2c81866107ed565b9050610e3b604083018561077e565b610e48606083018461077e565b9594505050505056fea264697066735822122095368ffaaa14b81d0107047c6b1967c136e94dda9573345b5afc4072bc3d27f364736f6c634300080d003360806040523480156200001157600080fd5b5060405162002c6438038062002c648339818101604052810190620000379190620000e8565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200011a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000b08262000083565b9050919050565b620000c281620000a3565b8114620000ce57600080fd5b50565b600081519050620000e281620000b7565b92915050565b6000602082840312156200010157620001006200007e565b5b60006200011184828501620000d1565b91505092915050565b612b3a806200012a6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80638ef346be116100a2578063c59c7f4011610071578063c59c7f40146102a8578063d7e3e486146102b2578063e86c8be2146102ce578063f5465b73146102ec578063f63fc6a71461030857610116565b80638ef346be1461022a57806397a523b314610248578063bc5e79e414610269578063be6857e51461028757610116565b806355f56888116100e957806355f568881461019557806358857180146101b1578063635971ef146101cd578063757da8de146101eb5780638a9fb9221461020957610116565b8063077d55a61461011b57806319549d9b1461013b578063284dfd1e146101595780633f9dd4dc14610177575b600080fd5b610123610326565b604051610132939291906119f9565b60405180910390f35b61014361044e565b6040516101509190611a59565b60405180910390f35b61016161045d565b60405161016e9190611c28565b60405180910390f35b61017f6105e2565b60405161018c9190611cb4565b60405180910390f35b6101af60048036038101906101aa9190611f13565b61077c565b005b6101cb60048036038101906101c69190611fe2565b6109b7565b005b6101d5610ae8565b6040516101e29190612092565b60405180910390f35b6101f3610b0c565b6040516102009190611a59565b60405180910390f35b610211610b1c565b60405161022194939291906120ad565b60405180910390f35b610232610bc2565b60405161023f9190611a59565b60405180910390f35b610250610bdd565b60405161026094939291906120f9565b60405180910390f35b610271610d0b565b60405161027e91906121af565b60405180910390f35b61028f610e1c565b60405161029f94939291906120ad565b60405180910390f35b6102b0610ec2565b005b6102cc60048036038101906102c791906122b2565b61102e565b005b6102d6611292565b6040516102e39190612500565b60405180910390f35b61030660048036038101906103019190612522565b6115b1565b005b6103106116f3565b60405161031d9190611a59565b60405180910390f35b600a806000018054610337906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610363906125dc565b80156103b05780601f10610385576101008083540402835291602001916103b0565b820191906000526020600020905b81548152906001019060200180831161039357829003601f168201915b5050505050908060020180546103c5906125dc565b80601f01602080910402602001604051908101604052809291908181526020018280546103f1906125dc565b801561043e5780601f106104135761010080835404028352916020019161043e565b820191906000526020600020905b81548152906001019060200180831161042157829003601f168201915b5050505050908060030154905083565b60008060018001541415905090565b610465611717565b6000600560010154036104ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a490612659565b60405180910390fd5b60056040518060a0016040529081600082015481526020016001820154815260200160028201805480602002602001604051908101604052809291908181526020016000905b82821015610539578382906000526020600020906002020160405180604001604052908160008201548152602001600182015481525050815260200190600101906104f3565b505050508152602001600382018054610551906125dc565b80601f016020809104026020016040519081016040528092919081815260200182805461057d906125dc565b80156105ca5780601f1061059f576101008083540402835291602001916105ca565b820191906000526020600020905b8154815290600101906020018083116105ad57829003601f168201915b50505050508152602001600482015481525050905090565b6105ea611746565b6000600e6000015403610632576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610629906126c5565b60405180910390fd5b600e60405180608001604052908160008201548152602001600182018054610659906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610685906125dc565b80156106d25780601f106106a7576101008083540402835291602001916106d2565b820191906000526020600020905b8154815290600101906020018083116106b557829003601f168201915b505050505081526020016002820180546106eb906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610717906125dc565b80156107645780601f1061073957610100808354040283529160200191610764565b820191906000526020600020905b81548152906001019060200180831161074757829003601f168201915b50505050508152602001600382015481525050905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461080a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080190612757565b60405180910390fd5b815183511461084e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610845906127e9565b60405180910390fd5b60056000808201600090556001820160009055600282016000610871919061176e565b6003820160006108819190611792565b60048201600090555050846005600001819055508360056001018190555080600560030190805190602001906108b89291906117d2565b504260056004018190555060005b835181101561096f57600560020160405180604001604052808684815181106108f2576108f1612809565b5b6020026020010151815260200185848151811061091257610911612809565b5b6020026020010151815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050808061096790612867565b9150506108c6565b507f486080f3bc1e7be05d97b3de714da1698994d61a6580e486d5fa2947c05cd8408585855184426040516109a89594939291906128af565b60405180910390a15050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3c90612757565b60405180910390fd5b604051806080016040528084815260200183815260200182815260200142815250600160008201518160000155602082015181600101556040820151816002019080519060200190610a989291906117d2565b50606082015181600301559050507fcef2269538b3cc61ca70c098e01e23fd00132b09fb62d022c3f26b039b19499c83838342604051610adb94939291906120ad565b60405180910390a1505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600e600001541415905090565b6005806000015490806001015490806003018054610b39906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610b65906125dc565b8015610bb25780601f10610b8757610100808354040283529160200191610bb2565b820191906000526020600020905b815481529060010190602001808311610b9557829003601f168201915b5050505050908060040154905084565b600080600a6000018054610bd5906125dc565b905011905090565b600e806000015490806001018054610bf4906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610c20906125dc565b8015610c6d5780601f10610c4257610100808354040283529160200191610c6d565b820191906000526020600020905b815481529060010190602001808311610c5057829003601f168201915b505050505090806002018054610c82906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610cae906125dc565b8015610cfb5780601f10610cd057610100808354040283529160200191610cfb565b820191906000526020600020905b815481529060010190602001808311610cde57829003601f168201915b5050505050908060030154905084565b610d13611858565b6000600180015403610d5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5190612955565b60405180910390fd5b60016040518060800160405290816000820154815260200160018201548152602001600282018054610d8b906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610db7906125dc565b8015610e045780601f10610dd957610100808354040283529160200191610e04565b820191906000526020600020905b815481529060010190602001808311610de757829003601f168201915b50505050508152602001600382015481525050905090565b6001806000015490806001015490806002018054610e39906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054610e65906125dc565b8015610eb25780601f10610e8757610100808354040283529160200191610eb2565b820191906000526020600020905b815481529060010190602001808311610e9557829003601f168201915b5050505050908060030154905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f50576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4790612757565b60405180910390fd5b60016000808201600090556001820160009055600282016000610f739190611792565b6003820160009055505060056000808201600090556001820160009055600282016000610fa0919061176e565b600382016000610fb09190611792565b60048201600090555050600a60008082016000610fcd9190611792565b600182016000610fdd9190611880565b600282016000610fed9190611792565b60038201600090555050600e6000808201600090556001820160006110129190611792565b6002820160006110229190611792565b60038201600090555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146110bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110b390612757565b60405180910390fd5b8151835114611100576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f7906129e7565b60405180910390fd5b600a600080820160006111139190611792565b6001820160006111239190611880565b6002820160006111339190611792565b6003820160009055505083600a60000190805190602001906111569291906117d2565b5080600a60020190805190602001906111709291906117d2565b5042600a6003018190555060005b835181101561124d57600a60010160405180604001604052808684815181106111aa576111a9612809565b5b602002602001015181526020018584815181106111ca576111c9612809565b5b60200260200101518152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001908051906020019061121a9291906117d2565b5060208201518160010190805190602001906112379291906117d2565b505050808061124590612867565b91505061117e565b507f3825bb5f03c5d8f74de697cf4906791173fb8ea8a7042a5f91c08b3130025e0f84845183426040516112849493929190612a07565b60405180910390a150505050565b61129a6118a4565b6000600a60000180546112ac906125dc565b9050116112ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e590612aa6565b60405180910390fd5b600a60405180608001604052908160008201805461130b906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054611337906125dc565b80156113845780601f1061135957610100808354040283529160200191611384565b820191906000526020600020905b81548152906001019060200180831161136757829003601f168201915b5050505050815260200160018201805480602002602001604051908101604052809291908181526020016000905b8282101561150857838290600052602060002090600202016040518060400160405290816000820180546113e5906125dc565b80601f0160208091040260200160405190810160405280929190818152602001828054611411906125dc565b801561145e5780601f106114335761010080835404028352916020019161145e565b820191906000526020600020905b81548152906001019060200180831161144157829003601f168201915b50505050508152602001600182018054611477906125dc565b80601f01602080910402602001604051908101604052809291908181526020018280546114a3906125dc565b80156114f05780601f106114c5576101008083540402835291602001916114f0565b820191906000526020600020905b8154815290600101906020018083116114d357829003601f168201915b505050505081525050815260200190600101906113b2565b505050508152602001600282018054611520906125dc565b80601f016020809104026020016040519081016040528092919081815260200182805461154c906125dc565b80156115995780601f1061156e57610100808354040283529160200191611599565b820191906000526020600020905b81548152906001019060200180831161157c57829003601f168201915b50505050508152602001600382015481525050905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461163f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161163690612757565b60405180910390fd5b604051806080016040528084815260200183815260200182815260200142815250600e6000820151816000015560208201518160010190805190602001906116889291906117d2565b5060408201518160020190805190602001906116a59291906117d2565b50606082015181600301559050507f8b40809950e742802bbe819a822a661eed9d83418546694b7e808e73045cd25e8382426040516116e693929190612ac6565b60405180910390a1505050565b6000806005600101541415801561171257506000600560020180549050115b905090565b6040518060a0016040528060008152602001600081526020016060815260200160608152602001600081525090565b6040518060800160405280600081526020016060815260200160608152602001600081525090565b508054600082556002029060005260206000209081019061178f91906118cc565b50565b50805461179e906125dc565b6000825580601f106117b057506117cf565b601f0160209004906000526020600020908101906117ce91906118f3565b5b50565b8280546117de906125dc565b90600052602060002090601f0160209004810192826118005760008555611847565b82601f1061181957805160ff1916838001178555611847565b82800160010185558215611847579182015b8281111561184657825182559160200191906001019061182b565b5b50905061185491906118f3565b5090565b6040518060800160405280600081526020016000815260200160608152602001600081525090565b50805460008255600202906000526020600020908101906118a19190611910565b50565b6040518060800160405280606081526020016060815260200160608152602001600081525090565b5b808211156118ef576000808201600090556001820160009055506002016118cd565b5090565b5b8082111561190c5760008160009055506001016118f4565b5090565b5b80821115611943576000808201600061192a9190611792565b60018201600061193a9190611792565b50600201611911565b5090565b600081519050919050565b600082825260208201905092915050565b60005b83811015611981578082015181840152602081019050611966565b83811115611990576000848401525b50505050565b6000601f19601f8301169050919050565b60006119b282611947565b6119bc8185611952565b93506119cc818560208601611963565b6119d581611996565b840191505092915050565b6000819050919050565b6119f3816119e0565b82525050565b60006060820190508181036000830152611a1381866119a7565b90508181036020830152611a2781856119a7565b9050611a3660408301846119ea565b949350505050565b60008115159050919050565b611a5381611a3e565b82525050565b6000602082019050611a6e6000830184611a4a565b92915050565b611a7d816119e0565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b604082016000820151611ac56000850182611a74565b506020820151611ad86020850182611a74565b50505050565b6000611aea8383611aaf565b60408301905092915050565b6000602082019050919050565b6000611b0e82611a83565b611b188185611a8e565b9350611b2383611a9f565b8060005b83811015611b54578151611b3b8882611ade565b9750611b4683611af6565b925050600181019050611b27565b5085935050505092915050565b600082825260208201905092915050565b6000611b7d82611947565b611b878185611b61565b9350611b97818560208601611963565b611ba081611996565b840191505092915050565b600060a083016000830151611bc36000860182611a74565b506020830151611bd66020860182611a74565b5060408301518482036040860152611bee8282611b03565b91505060608301518482036060860152611c088282611b72565b9150506080830151611c1d6080860182611a74565b508091505092915050565b60006020820190508181036000830152611c428184611bab565b905092915050565b6000608083016000830151611c626000860182611a74565b5060208301518482036020860152611c7a8282611b72565b91505060408301518482036040860152611c948282611b72565b9150506060830151611ca96060860182611a74565b508091505092915050565b60006020820190508181036000830152611cce8184611c4a565b905092915050565b6000604051905090565b600080fd5b600080fd5b611cf3816119e0565b8114611cfe57600080fd5b50565b600081359050611d1081611cea565b92915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611d5382611996565b810181811067ffffffffffffffff82111715611d7257611d71611d1b565b5b80604052505050565b6000611d85611cd6565b9050611d918282611d4a565b919050565b600067ffffffffffffffff821115611db157611db0611d1b565b5b602082029050602081019050919050565b600080fd5b6000611dda611dd584611d96565b611d7b565b90508083825260208201905060208402830185811115611dfd57611dfc611dc2565b5b835b81811015611e265780611e128882611d01565b845260208401935050602081019050611dff565b5050509392505050565b600082601f830112611e4557611e44611d16565b5b8135611e55848260208601611dc7565b91505092915050565b600080fd5b600067ffffffffffffffff821115611e7e57611e7d611d1b565b5b611e8782611996565b9050602081019050919050565b82818337600083830152505050565b6000611eb6611eb184611e63565b611d7b565b905082815260208101848484011115611ed257611ed1611e5e565b5b611edd848285611e94565b509392505050565b600082601f830112611efa57611ef9611d16565b5b8135611f0a848260208601611ea3565b91505092915050565b600080600080600060a08688031215611f2f57611f2e611ce0565b5b6000611f3d88828901611d01565b9550506020611f4e88828901611d01565b945050604086013567ffffffffffffffff811115611f6f57611f6e611ce5565b5b611f7b88828901611e30565b935050606086013567ffffffffffffffff811115611f9c57611f9b611ce5565b5b611fa888828901611e30565b925050608086013567ffffffffffffffff811115611fc957611fc8611ce5565b5b611fd588828901611ee5565b9150509295509295909350565b600080600060608486031215611ffb57611ffa611ce0565b5b600061200986828701611d01565b935050602061201a86828701611d01565b925050604084013567ffffffffffffffff81111561203b5761203a611ce5565b5b61204786828701611ee5565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061207c82612051565b9050919050565b61208c81612071565b82525050565b60006020820190506120a76000830184612083565b92915050565b60006080820190506120c260008301876119ea565b6120cf60208301866119ea565b81810360408301526120e181856119a7565b90506120f060608301846119ea565b95945050505050565b600060808201905061210e60008301876119ea565b818103602083015261212081866119a7565b9050818103604083015261213481856119a7565b905061214360608301846119ea565b95945050505050565b60006080830160008301516121646000860182611a74565b5060208301516121776020860182611a74565b506040830151848203604086015261218f8282611b72565b91505060608301516121a46060860182611a74565b508091505092915050565b600060208201905081810360008301526121c9818461214c565b905092915050565b600067ffffffffffffffff8211156121ec576121eb611d1b565b5b602082029050602081019050919050565b600061221061220b846121d1565b611d7b565b9050808382526020820190506020840283018581111561223357612232611dc2565b5b835b8181101561227a57803567ffffffffffffffff81111561225857612257611d16565b5b8086016122658982611ee5565b85526020850194505050602081019050612235565b5050509392505050565b600082601f83011261229957612298611d16565b5b81356122a98482602086016121fd565b91505092915050565b600080600080608085870312156122cc576122cb611ce0565b5b600085013567ffffffffffffffff8111156122ea576122e9611ce5565b5b6122f687828801611ee5565b945050602085013567ffffffffffffffff81111561231757612316611ce5565b5b61232387828801612284565b935050604085013567ffffffffffffffff81111561234457612343611ce5565b5b61235087828801612284565b925050606085013567ffffffffffffffff81111561237157612370611ce5565b5b61237d87828801611ee5565b91505092959194509250565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600060408301600083015184820360008601526123d28282611b72565b915050602083015184820360208601526123ec8282611b72565b9150508091505092915050565b600061240583836123b5565b905092915050565b6000602082019050919050565b600061242582612389565b61242f8185612394565b935083602082028501612441856123a5565b8060005b8581101561247d578484038952815161245e85826123f9565b94506124698361240d565b925060208a01995050600181019050612445565b50829750879550505050505092915050565b600060808301600083015184820360008601526124ac8282611b72565b915050602083015184820360208601526124c6828261241a565b915050604083015184820360408601526124e08282611b72565b91505060608301516124f56060860182611a74565b508091505092915050565b6000602082019050818103600083015261251a818461248f565b905092915050565b60008060006060848603121561253b5761253a611ce0565b5b600061254986828701611d01565b935050602084013567ffffffffffffffff81111561256a57612569611ce5565b5b61257686828701611ee5565b925050604084013567ffffffffffffffff81111561259757612596611ce5565b5b6125a386828701611ee5565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806125f457607f821691505b602082108103612607576126066125ad565b5b50919050565b7f4e656e68756d206176616c6961646f72206361646173747261646f0000000000600082015250565b6000612643601b83611952565b915061264e8261260d565b602082019050919050565b6000602082019050818103600083015261267281612636565b9050919050565b7f4e656e68756d61206f627261206170726f766164610000000000000000000000600082015250565b60006126af601583611952565b91506126ba82612679565b602082019050919050565b600060208201905081810360008301526126de816126a2565b9050919050565b7f4170656e6173206f20636f6e747261746f206d657374726520706f646520636860008201527f616d617220657374612066756e63616f00000000000000000000000000000000602082015250565b6000612741603083611952565b915061274c826126e5565b604082019050919050565b6000602082019050818103600083015261277081612734565b9050919050565b7f417272617973206465206571756970652065206176616c6961646f722064657660008201527f656d20746572206f206d65736d6f2074616d616e686f00000000000000000000602082015250565b60006127d3603683611952565b91506127de82612777565b604082019050919050565b60006020820190508181036000830152612802816127c6565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612872826119e0565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036128a4576128a3612838565b5b600182019050919050565b600060a0820190506128c460008301886119ea565b6128d160208301876119ea565b6128de60408301866119ea565b81810360608301526128f081856119a7565b90506128ff60808301846119ea565b9695505050505050565b7f4e656e68756d61206f6272612076616c69646164612063616461737472616461600082015250565b600061293f602083611952565b915061294a82612909565b602082019050919050565b6000602082019050818103600083015261296e81612932565b9050919050565b7f41727261797320646520686973746f7269636f2065207374617475732064657660008201527f656d20746572206f206d65736d6f2074616d616e686f00000000000000000000602082015250565b60006129d1603683611952565b91506129dc82612975565b604082019050919050565b60006020820190508181036000830152612a00816129c4565b9050919050565b60006080820190508181036000830152612a2181876119a7565b9050612a3060208301866119ea565b8181036040830152612a4281856119a7565b9050612a5160608301846119ea565b95945050505050565b7f4e656e68756d2072656c61746f72696f20656d697469646f0000000000000000600082015250565b6000612a90601883611952565b9150612a9b82612a5a565b602082019050919050565b60006020820190508181036000830152612abf81612a83565b9050919050565b6000606082019050612adb60008301866119ea565b8181036020830152612aed81856119a7565b9050612afc60408301846119ea565b94935050505056fea2646970667358221220650875dacc27b8bf27a7499625e6e8c8f549b2fd7d29018cbb164583f73aa99e64736f6c634300080d003360806040523480156200001157600080fd5b5060405162001c3e38038062001c3e8339818101604052810190620000379190620000e8565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200011a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000b08262000083565b9050919050565b620000c281620000a3565b8114620000ce57600080fd5b50565b600081519050620000e281620000b7565b92915050565b6000602082840312156200010157620001006200007e565b5b60006200011184828501620000d1565b91505092915050565b611b14806200012a6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80639fbe2adf116100715780639fbe2adf1461012e578063bc5e79e41461014a578063c6f717c014610168578063c97b0e1914610186578063e3e77204146101a2578063ea18eb8e146101c0576100a9565b806352ac3448146100ae578063635971ef146100ca57806365b16c34146100e85780638ee760ae146100f2578063912babb014610110575b600080fd5b6100c860048036038101906100c39190611338565b6101e3565b005b6100d2610332565b6040516100df9190611404565b60405180910390f35b6100f0610356565b005b6100fa610433565b604051610107919061143a565b60405180910390f35b610118610443565b6040516101259190611583565b60405180910390f35b610148600480360381019061014391906115a5565b6106bf565b005b61015261078a565b60405161015f9190611583565b60405180910390f35b610170610a57565b60405161017d919061143a565b60405180910390f35b6101a0600480360381019061019b9190611601565b610acc565b005b6101aa610c97565b6040516101b79190611583565b60405180910390f35b6101c8610ecd565b6040516101da969594939291906116dd565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610271576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610268906117c5565b60405180910390fd5b6040518060400160405280600881526020017f56616c6964616461000000000000000000000000000000000000000000000000815250600160040190805190602001906102bf92919061108f565b5081600160020190805190602001906102d992919061108f565b5080600160030190805190602001906102f392919061108f565b507fb36811124aaade67020ec27b41cb4b86bea1fa5e5fb1ea9ac9261c6c8facfc388383604051610325929190611831565b60405180910390a1505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103db906117c5565b60405180910390fd5b600160008082016000905560018201600090556002820160006104079190611115565b6003820160006104179190611115565b6004820160006104279190611115565b60058201600090555050565b6000806001600001541415905090565b61044b611155565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d0906117c5565b60405180910390fd5b60016040518060c0016040529081600082015481526020016001820154815260200160028201805461050a906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610536906118a3565b80156105835780601f1061055857610100808354040283529160200191610583565b820191906000526020600020905b81548152906001019060200180831161056657829003601f168201915b5050505050815260200160038201805461059c906118a3565b80601f01602080910402602001604051908101604052809291908181526020018280546105c8906118a3565b80156106155780601f106105ea57610100808354040283529160200191610615565b820191906000526020600020905b8154815290600101906020018083116105f857829003601f168201915b5050505050815260200160048201805461062e906118a3565b80601f016020809104026020016040519081016040528092919081815260200182805461065a906118a3565b80156106a75780601f1061067c576101008083540402835291602001916106a7565b820191906000526020600020905b81548152906001019060200180831161068a57829003601f168201915b50505050508152602001600582015481525050905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461074d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610744906117c5565b60405180910390fd5b7fcd7666426aa64ec097ba9673b20f0581d131cef23f8933275ef6cb694a1bf988828260405161077e9291906118d4565b60405180910390a15050565b610792611155565b6000600160000154036107da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d190611950565b60405180910390fd5b6040518060400160405280600881526020017f56616c69646164610000000000000000000000000000000000000000000000008152508051906020012060016004016040516108299190611a0f565b604051809103902014610871576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086890611a72565b60405180910390fd5b60016040518060c001604052908160008201548152602001600182015481526020016002820180546108a2906118a3565b80601f01602080910402602001604051908101604052809291908181526020018280546108ce906118a3565b801561091b5780601f106108f05761010080835404028352916020019161091b565b820191906000526020600020905b8154815290600101906020018083116108fe57829003601f168201915b50505050508152602001600382018054610934906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610960906118a3565b80156109ad5780601f10610982576101008083540402835291602001916109ad565b820191906000526020600020905b81548152906001019060200180831161099057829003601f168201915b505050505081526020016004820180546109c6906118a3565b80601f01602080910402602001604051908101604052809291908181526020018280546109f2906118a3565b8015610a3f5780601f10610a1457610100808354040283529160200191610a3f565b820191906000526020600020905b815481529060010190602001808311610a2257829003601f168201915b50505050508152602001600582015481525050905090565b60008060016000015403610a6e5760009050610ac9565b6040518060400160405280600881526020017f56616c6964616461000000000000000000000000000000000000000000000000815250805190602001206001600401604051610abd9190611a0f565b60405180910390201490505b90565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b51906117c5565b60405180910390fd5b6040518060c001604052808381526020018581526020016040518060200160405280600081525081526020016040518060200160405280600081525081526020016040518060400160405280600881526020017f50656e64656e7465000000000000000000000000000000000000000000000000815250815260200182815250600160008201518160000155602082015181600101556040820151816002019080519060200190610c0c92919061108f565b506060820151816003019080519060200190610c2992919061108f565b506080820151816004019080519060200190610c4692919061108f565b5060a082015181600501559050507f451ab9a68e088afb2340b1550167d059cf863eda92687eb646c0c058527ef09a82858584604051610c899493929190611a92565b60405180910390a150505050565b610c9f611155565b600060016000015403610ce7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cde90611950565b60405180910390fd5b60016040518060c00160405290816000820154815260200160018201548152602001600282018054610d18906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610d44906118a3565b8015610d915780601f10610d6657610100808354040283529160200191610d91565b820191906000526020600020905b815481529060010190602001808311610d7457829003601f168201915b50505050508152602001600382018054610daa906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610dd6906118a3565b8015610e235780601f10610df857610100808354040283529160200191610e23565b820191906000526020600020905b815481529060010190602001808311610e0657829003601f168201915b50505050508152602001600482018054610e3c906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610e68906118a3565b8015610eb55780601f10610e8a57610100808354040283529160200191610eb5565b820191906000526020600020905b815481529060010190602001808311610e9857829003601f168201915b50505050508152602001600582015481525050905090565b6001806000015490806001015490806002018054610eea906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610f16906118a3565b8015610f635780601f10610f3857610100808354040283529160200191610f63565b820191906000526020600020905b815481529060010190602001808311610f4657829003601f168201915b505050505090806003018054610f78906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054610fa4906118a3565b8015610ff15780601f10610fc657610100808354040283529160200191610ff1565b820191906000526020600020905b815481529060010190602001808311610fd457829003601f168201915b505050505090806004018054611006906118a3565b80601f0160208091040260200160405190810160405280929190818152602001828054611032906118a3565b801561107f5780601f106110545761010080835404028352916020019161107f565b820191906000526020600020905b81548152906001019060200180831161106257829003601f168201915b5050505050908060050154905086565b82805461109b906118a3565b90600052602060002090601f0160209004810192826110bd5760008555611104565b82601f106110d657805160ff1916838001178555611104565b82800160010185558215611104579182015b828111156111035782518255916020019190600101906110e8565b5b509050611111919061118b565b5090565b508054611121906118a3565b6000825580601f106111335750611152565b601f016020900490600052602060002090810190611151919061118b565b5b50565b6040518060c001604052806000815260200160008152602001606081526020016060815260200160608152602001600081525090565b5b808211156111a457600081600090555060010161118c565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6111cf816111bc565b81146111da57600080fd5b50565b6000813590506111ec816111c6565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611245826111fc565b810181811067ffffffffffffffff821117156112645761126361120d565b5b80604052505050565b60006112776111a8565b9050611283828261123c565b919050565b600067ffffffffffffffff8211156112a3576112a261120d565b5b6112ac826111fc565b9050602081019050919050565b82818337600083830152505050565b60006112db6112d684611288565b61126d565b9050828152602081018484840111156112f7576112f66111f7565b5b6113028482856112b9565b509392505050565b600082601f83011261131f5761131e6111f2565b5b813561132f8482602086016112c8565b91505092915050565b600080600060608486031215611351576113506111b2565b5b600061135f868287016111dd565b935050602084013567ffffffffffffffff8111156113805761137f6111b7565b5b61138c8682870161130a565b925050604084013567ffffffffffffffff8111156113ad576113ac6111b7565b5b6113b98682870161130a565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006113ee826113c3565b9050919050565b6113fe816113e3565b82525050565b600060208201905061141960008301846113f5565b92915050565b60008115159050919050565b6114348161141f565b82525050565b600060208201905061144f600083018461142b565b92915050565b61145e816111bc565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561149e578082015181840152602081019050611483565b838111156114ad576000848401525b50505050565b60006114be82611464565b6114c8818561146f565b93506114d8818560208601611480565b6114e1816111fc565b840191505092915050565b600060c0830160008301516115046000860182611455565b5060208301516115176020860182611455565b506040830151848203604086015261152f82826114b3565b9150506060830151848203606086015261154982826114b3565b9150506080830151848203608086015261156382826114b3565b91505060a083015161157860a0860182611455565b508091505092915050565b6000602082019050818103600083015261159d81846114ec565b905092915050565b600080604083850312156115bc576115bb6111b2565b5b60006115ca858286016111dd565b925050602083013567ffffffffffffffff8111156115eb576115ea6111b7565b5b6115f78582860161130a565b9150509250929050565b6000806000806080858703121561161b5761161a6111b2565b5b6000611629878288016111dd565b945050602085013567ffffffffffffffff81111561164a576116496111b7565b5b6116568782880161130a565b9350506040611667878288016111dd565b9250506060611678878288016111dd565b91505092959194509250565b61168d816111bc565b82525050565b600082825260208201905092915050565b60006116af82611464565b6116b98185611693565b93506116c9818560208601611480565b6116d2816111fc565b840191505092915050565b600060c0820190506116f26000830189611684565b6116ff6020830188611684565b818103604083015261171181876116a4565b9050818103606083015261172581866116a4565b9050818103608083015261173981856116a4565b905061174860a0830184611684565b979650505050505050565b7f4170656e6173206f20636f6e747261746f206d657374726520706f646520636860008201527f616d617220657374612066756e63616f00000000000000000000000000000000602082015250565b60006117af603083611693565b91506117ba82611753565b604082019050919050565b600060208201905081810360008301526117de816117a2565b9050919050565b7f56616c6964616461000000000000000000000000000000000000000000000000600082015250565b600061181b600883611693565b9150611826826117e5565b602082019050919050565b60006060820190506118466000830185611684565b818103602083015261185881846116a4565b9050818103604083015261186b8161180e565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806118bb57607f821691505b6020821081036118ce576118cd611874565b5b50919050565b60006040820190506118e96000830185611684565b81810360208301526118fb81846116a4565b90509392505050565b7f4e656e68756d61206f6272612063616461737472616461000000000000000000600082015250565b600061193a601783611693565b915061194582611904565b602082019050919050565b600060208201905081810360008301526119698161192d565b9050919050565b600081905092915050565b60008190508160005260206000209050919050565b6000815461199d816118a3565b6119a78186611970565b945060018216600081146119c257600181146119d357611a06565b60ff19831686528186019350611a06565b6119dc8561197b565b60005b838110156119fe578154818901526001820191506020810190506119df565b838801955050505b50505092915050565b6000611a1b8284611990565b915081905092915050565b7f4f627261206e616f20657374612076616c696461646100000000000000000000600082015250565b6000611a5c601683611693565b9150611a6782611a26565b602082019050919050565b60006020820190508181036000830152611a8b81611a4f565b9050919050565b6000608082019050611aa76000830187611684565b611ab46020830186611684565b8181036040830152611ac681856116a4565b9050611ad56060830184611684565b9594505050505056fea264697066735822122084e1d6d028536cf8141462964f77aea8c947af2663b8ab0a11495e7ff0b5a1ec64736f6c634300080d0033a26469706673582212208f8f7faa04976114f20d00672a9a96ad50e0f667a8795257975557d36c27ff7964736f6c634300080d0033",

}

module.exports = {
  masterContract
}