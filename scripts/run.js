const { hexStripZeros } = require("ethers/lib/utils")

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('NftPro'); 
    const nftContract = await nftContractFactory.deploy(); 
    console.log("deploying....")
    await nftContract.deployed(); 
    console.log("Contract deployed to:", nftContract.address); 
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