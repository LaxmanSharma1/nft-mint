const { hexStripZeros } = require("ethers/lib/utils")

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    const nftContractFactory = await hre.ethers.getContractFactory('NftPro'); 
    const nftContract = await nftContractFactory.deploy(); 
    console.log("deploying....")
    await nftContract.deployed(); 
    console.log("Contract deployed to:", nftContract.address); 
    // call the smartcontract function
    let txn = await nftContract.makeAnEpicNFT();
    // wait for transaction to get complete
    await txn.wait(); 
    // Mint another NFT 
    txn = await nftContract.makeAnEpicNFT();
    await txn.wait(); 
};

const runMain = async () => {
    try {
        await main(); 
        process.exit(0); 
    } catch (error) {
        process.exit(1); 
    }
};

runMain();