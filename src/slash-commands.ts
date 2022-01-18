import { REST } from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('-----\nDémarrage de l\'analyse des commandes...\n-----');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commandes').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(__dirname + `/commandes/${file}`);
	console.log("Analyse de la commande " + command.data.name);
	commands.push(command.data.toJSON());
}
console.log("Terminé!");
console.log('-----\nDémarrage de l\'analyse des interactions contextuelles...\n-----');
const interaction = [];
const interactionFiles = fs.readdirSync(__dirname + '/interactions/context').filter(file => file.endsWith('.js'));


for (const file of interactionFiles) {
	const command = require(__dirname + `/interactions/context/${file}`);
	console.log("Analyse de l'interaction contextuelle " + command.data.name);
	interaction.push(command.data.toJSON());
}
console.log("Terminé!");

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log("Envoie des données vers Discord")
		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

	} catch (error) {
		console.error(error);
		process.exit(1)
	}
	console.log("Terminé!");
})();