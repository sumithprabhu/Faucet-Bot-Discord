const { SlashCommandBuilder } = require('@discordjs/builders');
const {  PRIVATE_KEY } = require('../config.json');
const ethers = require('ethers');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with general instrtuctions about the bot'),
	async execute(interaction) {
		return interaction.reply(`Gm gm! Make sure to checkout instructions 👇\n/ping : Gets you general instructions\n/status : Display remaining balance of Faucet (make sure to drop some Geth if faucet is weak)\n/faucet : Enter Address and voila you will have your Geth in your wallet`);
	},
};