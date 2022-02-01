import { Client, GuildMember, MessageEmbed, TextChannel } from "discord.js";

module.exports = async (client: Client, member: GuildMember) => {
	if (member.user.bot) return;
	const embed = new MessageEmbed()
		.setTitle("Oh non, quelqu'un est parti!")
		.setColor("RED")
		.setDescription("Au revoir, " + member.user.tag + ", EarthNetwork ne sera jamais le même sans toi!")
		.setThumbnail(member.user.displayAvatarURL())
		.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
		.setTimestamp()
		.setFooter({ text: "©️ EarthNetwork 2022-" + new Date().getFullYear(), iconURL: client.user.displayAvatarURL() });
	(await client.channels.fetch(process.env.WELCOME_CHANNEL_ID) as TextChannel).send({ embeds: [embed] });
}