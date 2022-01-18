import {SlashCommandBuilder} from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	async execute(client, interaction) {
        function color(n : number) {
            let result;
            n <= 250 ? result = "🟢" : (n <= 500 ? result = "🟡" : result = "🔴");
            return result;
        }
		const pong = await interaction.reply({content: 'Pong!', fetchReply: true});
        const latence = pong.createdAt - interaction.createdAt;
        await interaction.editReply(`Pong!\nConnexion à la gateway: ${color(parseInt(client.ws.ping))} ${client.ws.ping}ms\nLatence du bot: ${color(latence)} ${pong.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};