import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import {Curl, curly} from "node-libcurl";
const curl = new Curl();
curl.setOpt(Curl.option.SSL_VERIFYHOST, 0);
curl.setOpt(Curl.option.SSL_VERIFYPEER, 0);
module.exports = {
    data: new SlashCommandBuilder()
    .setName('mcquote')
    .setDescription("Quoter un message qui s'est produit en jeu")
    .addStringOption(o=>o.setName("pseudo").setRequired(true).setDescription("Pseudo InGame du joueur"))
    .addStringOption(o=>o.setName("message").setRequired(true).setDescription("Message à quoter"))
    .addStringOption(o=>o.setName("contexte").setRequired(false).setDescription("Contexte du message (facultatif)")),
    execute: async(client, interaction) => {
        const args = interaction.options;
        const {statusCode} = await curly.get("http://api.mojang.com/users/profiles/minecraft/"+ args.getString("pseudo"));
        if (statusCode == 204) return await interaction.reply({"content": "Le pseudo indiqué n'existe pas", "ephemeral": true});
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({name:args.getString("pseudo"), iconURL: "https://crafatar.com/avatars/"+JSON.parse(await curly.get("http://api.mojang.com/users/profiles/minecraft/"+ args.getString("pseudo")).toString()).id})
            .setDescription(`> ${args.getString("message")}`)
            args.getString("contexte") ? embed.addField("Contexte", args.getString("contexte")) : null;
            embed.addField("\u200B", `Dixit ${args.getString("pseudo")}`)
            .setFooter({text: `Envoyé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
            await client.channels.cache.get(process.env.PERLES_CHANN_ID).send({embeds: [embed]});
    }
}