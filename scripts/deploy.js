
const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

    const nftContractFactory = await hre.ethers.getContractFactory("NftPro");
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    //call the function 
    let txn = await nftContract.makeAnEpicNFT()
    // wait for it to be mined
    await txn.wait(); 
    console.log("Minted NFT #1");

    txn = await nftContract.makeAnEpicNFT(); 

    await txn.wait(); 
    console.log("Minted NFT #2");
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();