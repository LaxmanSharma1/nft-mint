import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect } from "react";
import {useState} from "react";
import { ethers } from "ethers"; 
import NftPro from './utils/NftPro.json';

// Constants

const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const App = () => {
  const [currentAccount, setCurrentAccount] = useState(""); 
  // Render Methods
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window; 
    if(!ethereum) {
      console.log("Make sure you have metamask!");
      return ; 
    }
    else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts'});

    if(accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account", account);
      setCurrentAccount(account); 
    } else {
      console.log("No authorized account found");
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window; 
      if(!ethereum) {
        alert("Get Metamask"); 
        return ; 
      }
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Connected",accounts[0]); 
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error); 
    }
  }

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0xBfd5cd347Fa246E03A556EEC3A2DcC2E855393c4"; 

    try {
      const { ethereum } = window; 
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum); 
        const signer = provider.getSigner(); 
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS,NftPro.abi, signer);

        console.log("Goring to pop wallent now to pay gas..."); 
        let nftTxn = await connectedContract.makeAnEpicNFT();
        console.log("Mining...please wait."); 
        await nftTxn.wait(); 
        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error) {
      console.log(error); 
    }
  }
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  },[]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
            {
              currentAccount === "" ? (
                renderNotConnectedContainer()
              ) : (
                <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
                  Mint NFT
                </button>
              )
            }
        </div>
        <div className="footer-container">

        </div>
      </div>
    </div>
  );
};

export default App;
