export const contractABI = [{
    "constant": false,
    "inputs": [
        {
            "name": "_implementationAddress",
            "type": "address"
        },
        {
            "name": "_CreateSubContractNum",
            "type": "uint256"
        }
    ],
    "name": "CreateSubContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
    {
        "constant": false,
        "inputs": [
            {
                "name": "_TargetAddress",
                "type": "address"
            },
            {
                "name": "_data",
                "type": "bytes"
            },
            {
                "name": "_SubContractMintStartNum",
                "type": "uint256"
            },
            {
                "name": "_MintContractNum",
                "type": "uint256"
            }
        ],
        "name": "BatchMintStart",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "_NFT_Address",
                "type": "address"
            },
            {
                "name": "_MAX_PER_WALLET",
                "type": "uint256"
            },
            {
                "name": "_WithdrawContractStart",
                "type": "uint256"
            },
            {
                "name": "_WithdrawContractNum",
                "type": "uint256"
            },
            {
                "name": "_tokenId_first",
                "type": "uint256"
            }
        ],
        "name": "BatchWithdrawNft",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }

]



export const contractAddress = ""




// 0x2e47215f000000000000000000000000a26de5c16eab60870f53dd02d554a14675d3d0d4000000000000000000000000000000000000000000000000000000000000000a

// 0x2e47215f000000000000000000000000ff9389f4feaa0512e7bc081507ea224698445e86000000000000000000000000000000000000000000000000000000000000000a