import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { epiAddress } from "../abi/address";
import EPIToken from "../abi/EPIToken.json";

export default function Token() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [mintValue, setMintValue] = useState("");
  const [burnValue, setBurnValue] = useState("");

  useEffect(() => {
    // Create a Web3Modal instance
    const web3Modal = new Web3Modal();

    // Connect to the user's Ethereum provider
    web3Modal.connect().then((provider) => {
      // Create an ethers.js provider using the Web3 provider
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      setProvider(ethersProvider);

      // Create an instance of the EPIToken contract using the contract ABI and address
      const epiContract = new ethers.Contract(
        epiAddress,
        EPIToken.abi,
        ethersProvider.getSigner()
      );
      setContract(epiContract);

      // Get the balance of the current user's Ethereum address
      ethersProvider
        .getSigner()
        .getAddress()
        .then((address) => {
          epiContract.balances(address).then((balance) => {
            setBalance(balance.toNumber());
          });
        });

      // Get the total supply of the EPIToken contract
      epiContract.totalSupply().then((totalSupply) => {
        setTotalSupply(totalSupply.toNumber());
      });

      // Get the token name of the EPIToken contract
      epiContract.name().then((name) => {
        setTokenName(name);
      });

      // Get the token name of the EPIToken contract
      epiContract.symbol().then((symbol) => {
        setTokenSymbol(symbol);
      });
    });
  }, []);

  // Function to mint new tokens and increase the balance of a specified address
  const mintTokens = async () => {
    // Make sure the address is valid
    const signer = await provider.getSigner();
    const to = await signer.getAddress();
    if (!ethers.utils.isAddress(to)) {
      console.error("Invalid address");
      alert("Invalid address");
      return;
    }

    // Mint new tokens
    try {
      const value = parseInt(mintValue);
      if (isNaN(value) || value <= 0) {
        console.error("Invalid mint value");
        alert("Invalid mint value");
        return;
      }

      const epiContract = new ethers.Contract(epiAddress, EPIToken.abi, signer);
      const tx = await epiContract.mint(to, value);
      await tx.wait();
      setMintValue('');
      console.log(`Minted ${value} EPI tokens to ${to}`);
      alert(`Minted ${value} EPI tokens to ${to}`);
    } catch (error) {
      console.error(`Error minting EPI tokens: ${error}`);
      alert(`Error minting EPI tokens: ${error}`);
    }
  };

  // Function to burn tokens and decrease the balance of the contract creator
  const burnTokens = async () => {
    // Make sure the contract creator has sufficient balance
    const value = parseInt(burnValue);
    if (isNaN(value) || value <= 0) {
      console.error("Invalid burn value");
      alert("Invalid burn value");
      return;
    }

    if (balance < value) {
      console.error("Insufficient balance");
      alert("Insufficient balance");
      return;
    }

    // Burn tokens
    try {
      const signer = provider.getSigner();
      const epiContract = new ethers.Contract(epiAddress, EPIToken.abi, signer);
      const tx = await epiContract.burn(value);
      await tx.wait();
      setBurnValue('');
      console.log(`Burned ${value} EPI tokens`);
      alert(`Burned ${value} EPI tokens`);
    } catch (error) {
      console.error(`Error burning EPI tokens: ${error}`);
      alert(`Error burning EPI tokens: ${error}`);
    }
  };

  return (
    <div>
      {provider && (
        <>
          <h1>{tokenName}</h1>
          <h2>${tokenSymbol}</h2>
          <div>
            <p>Connected to Ethereum provider</p>
            <p>Account balance: {balance}</p>
            <p>Total supply: {totalSupply}</p>
            <div>
              <h2>Mint Tokens</h2>
              <input
                type="number"
                value={mintValue}
                onChange={(e) => setMintValue(e.target.value)}
                style={{ textAlign: 'center' }}
              />
              <button onClick={mintTokens}>Mint</button>
            </div>
            <div>
              <h2>Burn Tokens</h2>
              <input
                type="number"
                value={burnValue}
                onChange={(e) => setBurnValue(e.target.value)}
                style={{ textAlign: 'center' }}
              />
              <button onClick={burnTokens}>Burn</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
