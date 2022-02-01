import { Client, GuildMember, MessageEmbed, TextChannel } from "discord.js";

module.exports = async (client: Client, member: GuildMember) => {
	if (member.user.bot) return;
	const embed = new MessageEmbed()
	.setTitle("Bienvenue sur le serveur !")
	.setColor("GREEN")
	.setDescription("Bienvenue à toi! Le staff te souhaite de passer un bon moment sur le serveur. N'hésite pas à checker le <#888119759206514708>, et c'est parti!\nEn cas de questions, n'hésite pas à ouvrir un <#937258461090160640> 🙃")
	.setThumbnail(member.user.displayAvatarURL())
	.setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL()})
	.setTimestamp()
	.setFooter({text: "©️ EarthNetwork 2022-" + new Date().getFullYear(), iconURL: client.user.displayAvatarURL()});
	(await client.channels.fetch(process.env.WELCOME_CHANNEL_ID)as TextChannel).send({embeds: [embed], content: `<@${member.user.id}>`});
}