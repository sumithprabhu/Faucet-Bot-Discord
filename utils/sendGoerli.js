const {PRIVATE_KEY, FROM_ADDRESS } = require('../config.json');
const ethers = require("ethers");

module.exports = async (toAddress, amount) => {
  

  
  console.log("Received new request from ", toAddress, "for", amount);
  if (!PRIVATE_KEY || !FROM_ADDRESS) {
    return {
      status: "error",
      message:
        "Missing environment variables, please ask human to set them up.",
    };
  }
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/d1a5661a0d464cf291b547adb04f1da9"
  );


  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


  const amountInWei = ethers.utils.parseEther(amount);
 
  return new Promise(async (resolve, reject) => {
    try {
      // Check the balance of the sending account
      const balance = await wallet.getBalance();
    
      if (balance < parseFloat(amount)) {
     	reject({ status: 'error', message: `I'm out of funds! Please donate: ${FROM_ADDRESS}` });
     }

      // Create a transaction object
      const tx = {
        to: toAddress,
        value: amountInWei,
      };

      // Sign and send the transaction
      const txResponse = await wallet.sendTransaction(tx);
      console.log(`Transaction hash: ${txResponse.hash}`);
	  resolve({ status: 'success', message: txResponse.hash });

     

     
    } catch (error) {
      console.error("Error:", error);
	  reject({ status: 'error', message: error });
    }
  });
};
