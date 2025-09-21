const submissionContract = {
   "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_mestreAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id_edital",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "name": "EditalFase2Recebido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id_obra",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id_editora",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cnpj",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "ObraInscrita",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id_edital",
          "type": "uint256"
        }
      ],
      "name": "ObrasValidadasEnviadas",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id_obra",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "titulo",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "status",
          "type": "string"
        }
      ],
      "name": "RelatorioObrasEmitido",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "mestreAddress",
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
      "name": "obras",
      "outputs": [
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
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id_edital",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        }
      ],
      "name": "receberMetadadosDoEdital",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id_editora",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_cnpj",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_id_obra",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "receberInscricaoObras",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id_obra",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_titulo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_url_documento",
          "type": "string"
        }
      ],
      "name": "emitirRelatorioObrasValidadas",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "enviarObrasValidadasParaProximaFase",
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
      "name": "getObra",
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
      "name": "getObraValidada",
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
      "name": "obraExiste",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "obraEstaValidada",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetarObra",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50604051610f0e380380610f0e83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610e7b806100936000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80639fbe2adf116100715780639fbe2adf14610126578063bc5e79e414610139578063c6f717c014610141578063c97b0e1914610149578063e3e772041461015c578063ea18eb8e1461016457600080fd5b806352ac3448146100ae578063635971ef146100c357806365b16c34146100f35780638ee760ae146100fb578063912babb014610111575b600080fd5b6100c16100bc366004610aa9565b61017e565b005b6000546100d6906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100c1610214565b60015415155b60405190151581526020016100ea565b610119610254565b6040516100ea9190610b63565b6100c1610134366004610be6565b61043e565b61011961047b565b610101610570565b6100c1610157366004610c2d565b6105de565b6101196106e9565b61016c61073d565b6040516100ea96959493929190610c84565b6040805180820190915260088082526756616c696461646160c01b60209092019182526101ad916005916108fa565b5081516101c19060039060208501906108fa565b5080516101d59060049060208401906108fa565b507fb36811124aaade67020ec27b41cb4b86bea1fa5e5fb1ea9ac9261c6c8facfc388383604051610207929190610cdd565b60405180910390a1505050565b6000600181815560028290559061022c60038261097e565b61023a60038301600061097e565b61024860048301600061097e565b60058201600090555050565b61025c6109bb565b6040805160c081018252600180548252600254602083015260038054929391929184019161028990610d1f565b80601f01602080910402602001604051908101604052809291908181526020018280546102b590610d1f565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050815260200160038201805461031b90610d1f565b80601f016020809104026020016040519081016040528092919081815260200182805461034790610d1f565b80156103945780601f1061036957610100808354040283529160200191610394565b820191906000526020600020905b81548152906001019060200180831161037757829003601f168201915b505050505081526020016004820180546103ad90610d1f565b80601f01602080910402602001604051908101604052809291908181526020018280546103d990610d1f565b80156104265780601f106103fb57610100808354040283529160200191610426565b820191906000526020600020905b81548152906001019060200180831161040957829003601f168201915b50505050508152602001600582015481525050905090565b7fcd7666426aa64ec097ba9673b20f0581d131cef23f8933275ef6cb694a1bf988828260405161046f929190610d59565b60405180910390a15050565b6104836109bb565b6001546000036104d45760405162461bcd60e51b81526020600482015260176024820152764e656e68756d61206f627261206361646173747261646160481b60448201526064015b60405180910390fd5b604080518082018252600881526756616c696461646160c01b602090910152517f7fdcfb490493e41845a238b550757a8bd57dddc4d48b935ebe2aa48c5ba7e0c99061052290600590610d7a565b60405180910390201461025c5760405162461bcd60e51b81526020600482015260166024820152754f627261206e616f20657374612076616c696461646160501b60448201526064016104cb565b60015460009081036105825750600090565b604080518082018252600881526756616c696461646160c01b602090910152517f7fdcfb490493e41845a238b550757a8bd57dddc4d48b935ebe2aa48c5ba7e0c9906105d090600590610d7a565b604051809103902014905090565b6040805160c08101825283815260208082018781528351808301855260008082528486019182528551808501875290815260608501528451808601909552600885526750656e64656e746560c01b85840152608084019490945260a08301859052825160019081559051600255925180519293926106609260039201906108fa565b506060820151805161067c9160038401916020909101906108fa565b50608082015180516106989160048401916020909101906108fa565b5060a082015181600501559050507f451ab9a68e088afb2340b1550167d059cf863eda92687eb646c0c058527ef09a828585846040516106db9493929190610e15565b60405180910390a150505050565b6106f16109bb565b60015460000361025c5760405162461bcd60e51b81526020600482015260176024820152764e656e68756d61206f627261206361646173747261646160481b60448201526064016104cb565b60018054600254600380549293919261075590610d1f565b80601f016020809104026020016040519081016040528092919081815260200182805461078190610d1f565b80156107ce5780601f106107a3576101008083540402835291602001916107ce565b820191906000526020600020905b8154815290600101906020018083116107b157829003601f168201915b5050505050908060030180546107e390610d1f565b80601f016020809104026020016040519081016040528092919081815260200182805461080f90610d1f565b801561085c5780601f106108315761010080835404028352916020019161085c565b820191906000526020600020905b81548152906001019060200180831161083f57829003601f168201915b50505050509080600401805461087190610d1f565b80601f016020809104026020016040519081016040528092919081815260200182805461089d90610d1f565b80156108ea5780601f106108bf576101008083540402835291602001916108ea565b820191906000526020600020905b8154815290600101906020018083116108cd57829003601f168201915b5050505050908060050154905086565b82805461090690610d1f565b90600052602060002090601f016020900481019282610928576000855561096e565b82601f1061094157805160ff191683800117855561096e565b8280016001018555821561096e579182015b8281111561096e578251825591602001919060010190610953565b5061097a9291506109f1565b5090565b50805461098a90610d1f565b6000825580601f1061099a575050565b601f0160209004906000526020600020908101906109b891906109f1565b50565b6040518060c001604052806000815260200160008152602001606081526020016060815260200160608152602001600081525090565b5b8082111561097a57600081556001016109f2565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610a2d57600080fd5b813567ffffffffffffffff80821115610a4857610a48610a06565b604051601f8301601f19908116603f01168101908282118183101715610a7057610a70610a06565b81604052838152866020858801011115610a8957600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600060608486031215610abe57600080fd5b83359250602084013567ffffffffffffffff80821115610add57600080fd5b610ae987838801610a1c565b93506040860135915080821115610aff57600080fd5b50610b0c86828701610a1c565b9150509250925092565b6000815180845260005b81811015610b3c57602081850181015186830182015201610b20565b81811115610b4e576000602083870101525b50601f01601f19169290920160200192915050565b6020815281516020820152602082015160408201526000604083015160c06060840152610b9360e0840182610b16565b90506060840151601f1980858403016080860152610bb18383610b16565b925060808601519150808584030160a086015250610bcf8282610b16565b91505060a084015160c08401528091505092915050565b60008060408385031215610bf957600080fd5b82359150602083013567ffffffffffffffff811115610c1757600080fd5b610c2385828601610a1c565b9150509250929050565b60008060008060808587031215610c4357600080fd5b84359350602085013567ffffffffffffffff811115610c6157600080fd5b610c6d87828801610a1c565b949794965050505060408301359260600135919050565b86815285602082015260c060408201526000610ca360c0830187610b16565b8281036060840152610cb58187610b16565b90508281036080840152610cc98186610b16565b9150508260a0830152979650505050505050565b828152606060208201526000610cf66060830184610b16565b828103604093840152600881526756616c696461646160c01b6020820152919091019392505050565b600181811c90821680610d3357607f821691505b602082108103610d5357634e487b7160e01b600052602260045260246000fd5b50919050565b828152604060208201526000610d726040830184610b16565b949350505050565b600080835481600182811c915080831680610d9657607f831692505b60208084108203610db557634e487b7160e01b86526022600452602486fd5b818015610dc95760018114610dda57610e07565b60ff19861689528489019650610e07565b60008a81526020902060005b86811015610dff5781548b820152908501908301610de6565b505084890196505b509498975050505050505050565b848152836020820152608060408201526000610e346080830185610b16565b90508260608301529594505050505056fea264697066735822122066c1e8bb300d37a94ecde3f00f7b76fe451fd717b27306eee5e868c5ba942fd664736f6c634300080d0033",

}

module.exports = {
  submissionContract
}