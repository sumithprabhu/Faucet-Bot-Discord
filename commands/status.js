const { SlashCommandBuilder } = require('@discordjs/builders');
const { FROM_ADDRESS,PRIVATE_KEY} = require('../config.json');
const ethers = require('ethers');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Gives you status of our Faucet'),
	async execute(interaction) {
		let balance;
		try {
			const provider = new ethers.providers.JsonRpcProvider(
				INFURA_GOERLI_URL
			  );
			const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
			balance = await wallet.getBalance();
			
		}
		catch (e) {
			console.log(e);
			return interaction.reply('Error getting balance. Please check logs.');
		}

		const balanceShort = (parseInt(balance) / 1e18).toFixed(3);;
		return interaction.reply(`Current balance: ${balanceShort} ETH.\nDonate: ${FROM_ADDRESS}`);
	},
};