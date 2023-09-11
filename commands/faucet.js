const { amount } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const sendGoerli = require('../utils/sendGoerli.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('faucet')
		.setDescription('Request testnet funds from the faucet')
		.addStringOption(option =>
			option.setName('address')
				.setDescription('The address to request funds from the faucet')
				.setRequired(true)),
	async execute(interaction) {
		const address = interaction.options.get('address').value.trim();

		const reply = 
			'Request sent to Faucet. Wait for few seconds to get transaction hash.';

		await	interaction.reply(reply);

		const request = await sendGoerli(address, amount);

		if (request.status === 'success') {
			const embed = new MessageEmbed()
				.setColor('#3BA55C')
				.setDescription(`[View on Etherscan](https://goerli.etherscan.io//tx/${request.message})`);
			return interaction.followUp({ content: `Transaction for ${amount} ETH created.`, embeds: [embed] });
		}
		else {
			return interaction.followUp(`Failed to send funds. Error: ${request.message}`);
		}
	},
};