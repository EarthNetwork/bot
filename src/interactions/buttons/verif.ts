import { ButtonInteraction, Client, MessageEmbed } from "discord.js";
const pool = require("../../verifier/pool");

module.exports = async(client:Client, interaction:ButtonInteraction)=> {
    if(client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id).roles.cache.has(process.env.ROLE_ID)) return interaction.reply({content:"Vous êtes déjà vérifié", ephemeral:true});
    const link = pool.createLink(interaction.user.id)
    const embed = new MessageEmbed()
    .setColor("YELLOW")
    .setTitle("C'est presque terminé!")
    .setDescription(`Rendez-vous [ici](https://verify.earthnetwork.fr/verify/${link}). Le lien expire dans 15 minutes.`)
    .setTimestamp()
    interaction.reply({embeds:[embed], ephemeral:true})
}