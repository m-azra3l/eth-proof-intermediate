import {useState} from 'react'
import {ethers} from 'ethers'
import './WalletConnect.css'

/**
 * WalletConnect component for connecting with MetaMask wallet
 * @returns JSX element
 */
const WalletConnect = () => {

	// Declare state variables
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	/**
	 * Handles connection to MetaMask wallet
	 * Updates state variables and fetches account balance
	 */
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	/**
	 * Updates the default account and fetches account balance
	 * @param {string} newAccount - new account address
	 */
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	/**
	 * Fetches account balance and updates userBalance state variable
	 * @param {string} account - account address
	 */
	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	/**
	 * Reloads the page on chain change to avoid any errors
	 */
	const chainChangedHandler = () => {
		window.location.reload();
	}

	// Listen for account and chain changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div className='wallet'>
			<h4> {"Connect Metamask"} </h4>
			<button className='connectButton' onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
		</div>
	);
}

export default WalletConnect;