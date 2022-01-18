import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('about')
		.setType(3)
,
    async execute(client, interaction) {

    },
};