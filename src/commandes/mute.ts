import { SlashCommandBuilder } from "@discordjs/builders"
import { ms } from "ms"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Mute un utilisateur")
		.addUserOption(o => o.setName("user").setRequired(true).setDescription("L'utilisateur à mute"))
		.addStringOption(o => o.setName("durée").setDescription("Durée du mute").setRequired(true))
		.addStringOption(o => o.setName("raison").setDescription("Raison du mute").setRequired(true)),
	async execute(client, interaction) {
		const raison = interaction.options.getString("raison");
		const user = interaction.options.getUser("user");
		const author = interaction.member;
		const durée = ms(interaction.options.getString("durée").replace("j", "d"));

	}
}