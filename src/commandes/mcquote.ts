import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
const _importDynamic = new Function("modulePath", "return import(modulePath)");

async function fetch(...args) {
	const { default: fetch } = await _importDynamic("node-fetch");
	return fetch(...args);
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName("mcquote")
		.setDescription("Quoter un message qui s'est produit en jeu")
		.addStringOption(o => o.setName("pseudo").setRequired(true).setDescription("Pseudo InGame du joueur"))
		.addStringOption(o => o.setName("message").setRequired(true).setDescription("Message à quoter"))
		.addStringOption(o => o.setName("contexte").setRequired(false).setDescription("Contexte du message (facultatif)")),
	execute: async (client, interaction) => {
		let data;
		const args = interaction.options;
		await fetch("https://api.mojang.com/users/profiles/minecraft/" + args.getString("pseudo")).then(async res => {
			data = await res;
		});
		if (data.status == 204) return interaction.reply({content: "Ce pseudo Minecraft n'existe pas.", ephemeral: true});
		const body = await data.json();
		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setAuthor({ name: `${body.name}`, iconURL: "http://crafatar.com/avatars/" + body.id + "?overlay"})
			.setDescription(`> ${args.getString("message")}`);
		args.getString("contexte") ? embed.addField("Contexte", args.getString("contexte")) : null;
		embed.addField("\u200B", `Dixit ${body.name}`)
			.setFooter({ text: `Envoyé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
		await client.channels.cache.get(process.env.PERLES_CHANN_ID).send({ embeds: [embed] });
		interaction.reply({content: "La perle a été envoyée.", ephemeral: true});
	}
};