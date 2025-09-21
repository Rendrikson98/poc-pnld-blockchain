const publicationContract = {
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
          "internalType": "uint256",
          "name": "data_alteracao",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "new_url_document",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "EditalAlterado",
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
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "year",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "EditalRecebido",
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
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "year",
          "type": "uint256"
        }
      ],
      "name": "MetadadosEnviados",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "edital",
      "outputs": [
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
      "stateMutability": "view",
      "type": "function"
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
        },
        {
          "internalType": "uint256",
          "name": "_year",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_url_document",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "receberMetadadosEdital",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "uint256",
          "name": "_data_alteracao",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_new_url_document",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "receberAlteracoesEdital",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "enviarMetadadosParaProximaFase",
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
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEdital",
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
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50604051610a7e380380610a7e83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6109eb806100936000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630830ee0014610067578063635971ef14610089578063a342c211146100b4578063bbd7ba4c146100c9578063dea4de41146100de578063faa9b622146100f1575b600080fd5b61006f6100f9565b604051610080959493929190610644565b60405180910390f35b60005461009c906001600160a01b031681565b6040516001600160a01b039091168152602001610080565b6100c76100c236600461072b565b61022a565b005b6100d1610287565b6040516100809190610783565b6100c76100ec3660046107e7565b61044c565b6100d1610508565b600180546002805491929161010d90610866565b80601f016020809104026020016040519081016040528092919081815260200182805461013990610866565b80156101865780601f1061015b57610100808354040283529160200191610186565b820191906000526020600020905b81548152906001019060200180831161016957829003601f168201915b5050505050908060020154908060030180546101a190610866565b80601f01602080910402602001604051908101604052809291908181526020018280546101cd90610866565b801561021a5780601f106101ef5761010080835404028352916020019161021a565b820191906000526020600020905b8154815290600101906020018083116101fd57829003601f168201915b5050505050908060040154905085565b815161023d90600490602085019061055e565b5060058190556040517f0669b5aea803389a9300c109f958365fd57358ccf8d5ddc7d6454d5f8009b59f906102799086908690869086906108a0565b60405180910390a150505050565b6102b96040518060a0016040528060008152602001606081526020016000815260200160608152602001600081525090565b6001546003546040517ff23cfa03805a8f830584b7be6c2100aab03499bb682836134530510a53331e9f926102f3929091600291906108d0565b60405180910390a16040805160a081019091526001805482526002805460208401919061031f90610866565b80601f016020809104026020016040519081016040528092919081815260200182805461034b90610866565b80156103985780601f1061036d57610100808354040283529160200191610398565b820191906000526020600020905b81548152906001019060200180831161037b57829003601f168201915b50505050508152602001600282015481526020016003820180546103bb90610866565b80601f01602080910402602001604051908101604052809291908181526020018280546103e790610866565b80156104345780601f1061040957610100808354040283529160200191610434565b820191906000526020600020905b81548152906001019060200180831161041757829003601f168201915b50505050508152602001600482015481525050905090565b6040805160a081018252868152602080820187905291810185905260608101849052608081018390526001878155865191929091610490916002919089019061055e565b5060408201516002820155606082015180516104b691600384019160209091019061055e565b50608082015181600401559050507f6934cb4e77c4a9b6a0cfca9866b76a3c728b6a9600def7b9a007ed824a260b66858585846040516104f99493929190610989565b60405180910390a15050505050565b61053a6040518060a0016040528060008152602001606081526020016000815260200160608152602001600081525090565b6040805160a081019091526001805482526002805460208401919061031f90610866565b82805461056a90610866565b90600052602060002090601f01602090048101928261058c57600085556105d2565b82601f106105a557805160ff19168380011785556105d2565b828001600101855582156105d2579182015b828111156105d25782518255916020019190600101906105b7565b506105de9291506105e2565b5090565b5b808211156105de57600081556001016105e3565b6000815180845260005b8181101561061d57602081850181015186830182015201610601565b8181111561062f576000602083870101525b50601f01601f19169290920160200192915050565b85815260a06020820152600061065d60a08301876105f7565b856040840152828103606084015261067581866105f7565b9150508260808301529695505050505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126106af57600080fd5b813567ffffffffffffffff808211156106ca576106ca610688565b604051601f8301601f19908116603f011681019082821181831017156106f2576106f2610688565b8160405283815286602085880101111561070b57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806080858703121561074157600080fd5b8435935060208501359250604085013567ffffffffffffffff81111561076657600080fd5b6107728782880161069e565b949793965093946060013593505050565b60208152815160208201526000602083015160a060408401526107a960c08401826105f7565b9050604084015160608401526060840151601f198483030160808501526107d082826105f7565b915050608084015160a08401528091505092915050565b600080600080600060a086880312156107ff57600080fd5b85359450602086013567ffffffffffffffff8082111561081e57600080fd5b61082a89838a0161069e565b955060408801359450606088013591508082111561084757600080fd5b506108548882890161069e565b95989497509295608001359392505050565b600181811c9082168061087a57607f821691505b60208210810361089a57634e487b7160e01b600052602260045260246000fd5b50919050565b8481528360208201526080604082015260006108bf60808301856105f7565b905082606083015295945050505050565b838152600060206060818401526000855481600182811c9150808316806108f857607f831692505b858310810361091557634e487b7160e01b85526022600452602485fd5b6060880183905260808801818015610934576001811461094557610970565b60ff19861682528782019650610970565b60008c81526020902060005b8681101561096a57815484820152908501908901610951565b83019750505b5050505050508092505050826040830152949350505050565b8481526080602082015260006109a260808301866105f7565b604083019490945250606001529291505056fea26469706673582212207cf974aa71d156f3dd4100f098835f8f86a9c2dccc744c09d4da5744f59b16b664736f6c634300080d0033",

}

module.exports = {
  publicationContract
};