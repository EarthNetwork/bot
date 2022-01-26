import { SlashCommandBuilder } from "@discordjs/builders";
import {MessageEmbed, Permissions} from "discord.js"
import * as ms  from "ms"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Bannir un utilisateur")
		.addUserOption(o => o.setName("user").setRequired(true).setDescription("L'utilisateur à bannir"))
		.addStringOption(o => o.setName("raison").setDescription("Raison du ban").setRequired(true).setAutocomplete(true)),
	async execute(client, interaction) {
		if(!(await interaction.guild.members.fetch(interaction.user.id)).permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({ content: "Vous n'avez pas les permissions nécessaires pour effectuer cette commande", ephemeral: true });
		const raison = interaction.options.getString("raison");
		const author = await interaction.guild.members.fetch(interaction.user.id)
		const member = await interaction.guild.members.fetch(interaction.options.getUser("user").id);
		if (!await author.roles.highest.position > await member.roles.highest.position) return interaction.reply({ content: "Vous ne pouvez pas bannir un utilisateur avec un rôle supérieur au votre rôle", ephemeral: true });
		if(!member.moderatable) return interaction.reply({ content: "Cet utilisateur ne peut pas être banni", ephemeral: true });
		await member.ban({reason: raison, days: 1});
		(await client.channels.fetch(process.env.LOGS_CHANNEL_ID)).send(`${member.user.tag} a été banni par ${author.user.tag} pour ${interaction.options.getString("durée")} pour la raison suivante: ${raison}`);
		interaction.reply({ content: `${member.user.tag} a été banni pour ${raison}`, ephemeral: true });
		try {
			const embed = new MessageEmbed()
			.setColor("GREEN")
			.setDescription("Cliquez [ici](https://docs.google.com/forms/d/e/1FAIpQLSd4-TnTzX4R6Xh1h4bAGxKUcwwdHq7Up1f0zMc5JfPfHEPMig/viewform?usp=sf_link) pour effectuer une demande de débanissement")
			await member.send({content: `Vous avez été banni de EarthNetworkpendant pour la raison suivante: ${raison}`, embeds:[embed]});
		}
		catch {
			await interaction.followUp({content: "Impossible d'envoyer un mp au membre", ephemeral: true})
		}

	}
}