import { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
module.exports = {
    data: new SlashCommandBuilder()
        .setName("spawnverif")
        .setDescription("Faire apparaître le message de vérification"),
    execute: async (client: Client, interaction: CommandInteraction) => {
        const button = new MessageButton()
        .setStyle("SUCCESS")
        .setEmoji("🔄")
        .setLabel("Je ne suis pas un robot")
        .setCustomId("verif");
        const row = new MessageActionRow()
        .addComponents(button);
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Vérification")
            .setDescription("Veuillez vous vérifier afin d'accéder au serveur.")
            .setFooter({text: "Made with ❤ by GeekCornerD#8010 - EarthNetwork Verification"})
        interaction.channel.send({embeds: [embed], components: [row]});
        interaction.reply({ content: "Le message de vérification a été envoyé", ephemeral: true });
    }
}