import * as dotenv from "dotenv";
import { Client, Collection } from "discord.js";
import * as fs from "fs";

// Initialisation de dotenv
dotenv.config();

// Création du client et assignation à this
//configuration des intents à tous
const client = new Client({ intents: [32767] }) as any;


// Création d'une collection de commandes
client.commands = new Collection();
//Définition de commandfiles
const commandFiles = fs.readdirSync(__dirname + "/commandes").filter(file => file.endsWith(".js"));
//analyse de tous les fichiers
for (const file of commandFiles) {
	//importation de chaque fichier
	const command = require(__dirname + `/commandes/${file}`);
	//ajout de la commande à la collection
	client.commands.set(command.data.name, command);
}


//Event handler
client.events = [];
const eventfiles = fs.readdirSync(__dirname + "/events").filter(file => file.endsWith(".js"));
for (const file of eventfiles) {
	const event = require(__dirname + `/events/${file}`);
	const eventName = file.split(".")[0];
	client.on(eventName, event.bind(null, client));
	client.events.push(eventName);
}

const verifier = require("./verifier/server")
verifier.run(client);
async function addRole (userId){
	try {
        const server = await client.guilds.fetch(process.env.GUILDID);
        const role = await server.roles.fetch(process.env.ROLEID);
        const membre = await server.members.fetch(userId);
        await membre.roles.add(role.id).catch(console.error)
        //await console.info("Ajout du rôle à l'utilisateur ", membre.user.tag);
    } catch (error) {
        console.error(error);
    }
};
module.exports.addRole=addRole;
//Connexion avec le token
client.login(process.env.TOKEN);