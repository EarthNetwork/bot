import {Client} from "discord.js";
module.exports = async(client: Client) => {
	console.log("Ready: Connecté en tant que " + client.user.tag);
	await client.user.setPresence({"status": "online", activities: [{name: "EarthNetwork", type: "PLAYING", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}]});
};