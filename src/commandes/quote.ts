import { ContextMenuCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Quoter le message")
		.setType(3),
	execute: async(client, interaction) => {

		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setAuthor({name: interaction.targetMessage.author.tag, iconURL: interaction.targetMessage.author.displayAvatarURL()})
			.setDescription(`> ${interaction.targetMessage.content}`)
			.addField("\u200B", `Dixit ${interaction.guild.members.cache.get(interaction.targetMessage.author.id).nickname !== null ? interaction.guild.members.cache.get(interaction.targetMessage.author.id).nickname : interaction.targetMessage.author.username} le <t:${Math.round(interaction.targetMessage.createdTimestamp/1000)}:F>\n[Message original](https://discord.com/channels/${interaction.targetMessage.channel.id}/${interaction.targetMessage.id})`)
			.setFooter({text: `Envoyé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});
		await client.channels.cache.get(process.env.PERLES_CHANN_ID).send({embeds: [embed]});
		interaction.reply({ content: "Le message a été envoyé", ephemeral: true });
	},
};