import { SlashCommandBuilder } from "@discordjs/builders";
import {Permissions} from "discord.js"
import * as ms  from "ms"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Mute un utilisateur")
		.addUserOption(o => o.setName("user").setRequired(true).setDescription("L'utilisateur à mute"))
		.addStringOption(o => o.setName("durée").setDescription("Durée du mute").setRequired(true))
		.addStringOption(o => o.setName("raison").setDescription("Raison du mute").setRequired(true).setAutocomplete(true)),
	async execute(client, interaction) {
		if(!(await interaction.guild.members.fetch(interaction.user.id)).permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({ content: "Vous n'avez pas les permissions nécessaires pour effectuer cette commande", ephemeral: true });
		const raison = interaction.options.getString("raison");
		const author = await interaction.guild.members.fetch(interaction.user.id)
		const member = await interaction.guild.members.fetch(interaction.options.getUser("user").id);
		const duration = ms(interaction.options.getString("durée").replace("j", "d"));
		if (!await author.roles.highest.position > await member.roles.highest.position) return interaction.reply({ content: "Vous ne pouvez pas mute un utilisateur avec un rôle supérieur au votre rôle", ephemeral: true });
		if(duration == undefined) return interaction.reply({ content: "La durée du mute est invalide", ephemeral: true });
		if(!member.moderatable) return interaction.reply({ content: "Cet utilisateur ne peut pas être mute", ephemeral: true });
		await member.timeout(duration);
		(await client.channels.fetch(process.env.LOGS_CHANNEL_ID)).send(`${member.user.tag} a été mute par ${author.user.tag} pour ${interaction.options.getString("durée")} pour la raison suivante: ${raison}`);
		interaction.reply({ content: `${member.user.tag} a été mute pour ${raison}`, ephemeral: true });

	}
}