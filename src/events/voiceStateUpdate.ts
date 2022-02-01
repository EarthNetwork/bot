import { Client, VoiceState } from "discord.js";

module.exports = async (client, oldState: VoiceState, newState: VoiceState) => {
    let type;
    if (oldState.member.user.bot || newState.member.user.bot) return;
    if (!(await (oldState.guild.members.fetch(client.user.id))).permissions.has("ADMINISTRATOR")) return;
    if (newState.channelId == process.env.PUBLIC_TEMP_CHANNEL_ID) type = "public";
    else if (newState.channelId == process.env.STAFF_TEMP_CHANNEL_ID) type = "staff";

    if (client.tempChannels.includes(oldState.channel.id)) {
        const data = client.tempChannels.public.find(owner => owner.owner == oldState.member.user.id)
        if (!data) return;
        else {
            await (await oldState.guild.channels.fetch(data.voc)).delete();
            await (await oldState.guild.channels.fetch(data.txt)).delete();
            //get array position of data
            const index = client.tempChannels.public.findIndex(owner => owner.owner == oldState.member.user.id);
            //remove data
            client.tempChannels.public.splice(index, 1);

        }

    }

    if (type == "public") {
        const guild = await (newState.guild.fetch())
        const voc = await guild.channels.create(`🔊・Salon de ${newState.member.nickname || newState.member.user.username}`, { type: "GUILD_VOICE", parent: process.env.PUBLIC_TEMP_CHANNEL_CATEGORY_ID })
        const txt = await guild.channels.create(`🔊・Salon no-mic de ${newState.member.nickname || newState.member.user.username}`, { type: "GUILD_TEXT", parent: process.env.PUBLIC_TEMP_CHANNEL_CATEGORY_ID })
        client.tempChannels.public.push({ voc: voc.id, txt: txt.id, owner: newState.member.id });
        newState.setChannel(voc);
        console.log(client.tempChannels.public);
    }
    if (type == "staff") {
        const guild = await (newState.guild.fetch())
        const voc = await guild.channels.create(`🔊・Bureau de ${newState.member.nickname || newState.member.user.username}`, { type: "GUILD_VOICE", parent: process.env.PUBLIC_TEMP_CHANNEL_CATEGORY_ID })
        const txt = await guild.channels.create(`🔊・Bureau no-mic de ${newState.member.nickname || newState.member.user.username}`, { type: "GUILD_TEXT", parent: process.env.PUBLIC_TEMP_CHANNEL_CATEGORY_ID })
        client.tempChannels.staff.push({ voc: voc.id, txt: txt.id, owner: newState.member.id });
        newState.setChannel(voc);
        console.log(client.tempChannels.public);
    }

}