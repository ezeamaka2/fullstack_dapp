require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3("wss://eth-kovan.alchemyapi.io/v2/lRNMvlXmUDULxtYrQa9WaU_oUEKEkhIG");


// Contract details
const contractABI = require("../contract-abi.json")
const contractAddress = "smartcontract address"


export const helloWorldContract = new web3.eth.Contract(
    contractABI,
    contractAddress
  );

export const loadCurrentMessage = async () => { 
  const message = await helloWorldContract.methods.readMesage().call();
  console.log(message);
  return message
};

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const obj = {
            status: "👆🏽 Write a message in the text-field above.",
            address: addressArray[0],
          };
          return obj;
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
      } else {
        return {
          address: "",
          status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (addressArray.length > 0) {
            return {
              address: addressArray[0],
              status: "👆🏽 Write a message in the text-field above.",
            };
          } else {
            return {
              address: "",
              status: "🦊 Connect to Metamask using the top right button.",
            };
          }
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
      } else {
        return {
          address: "",
          status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          ),
        };
      }
};

export const updateMessage = async (address, message) => {
  if(!window.ethereum || address === null){
      return {
          status: "💡 Connect your Metamask wallet to update the message on the blockchain.",
      };
  }

  if(message.trim() === ""){
      return {
          status: "You message can not be an empty string",
      }
  }

  //set up transaction parameters
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: helloWorldContract.methods.updateMessage(message).encodeABI(),
    };

//sign the transaction
    try {
        const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
    });
        return {
            status: (
                <span>
                ✅{" "}
                <a target="_blank" rel="noreferrer" href={`https://kovan.etherscan.io/tx/${txHash}`}>
                    View the status of your transaction on Etherscan!
                </a>
                <br />
                ℹ️ Once the transaction is verified by the network, the message will
                be updated automatically.
                </span>
            ),
        };
    } catch (error) {
        return {
        status: "😥 " + error.message,
        };
    }
};
