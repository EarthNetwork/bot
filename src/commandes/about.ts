import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('À mon propos'),
    async execute(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle('Bonjour! 👋')
            .setDescription("Moi, c'est" + client.user.tag + ", pour vous servir.\nJe suis développé par <@710836174050164757>.")
            .addField("Version de Node.JS", process.version)
            .addField("Version de Discord.JS", "v" + require("discord.js").version)
            .addField("Ram utilisé", Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "mb")
            .addField("Nombre de commandes", `${client.commands.size}`)
            .addField("Nombre d'events sur lesquels j'interargis", `${client.events.length}`)
            .addField("Nombre de membres", `${client.users.cache.size}`)
        await interaction.reply({ embeds: [embed] });

    },
};