import { REST } from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('-----\nDémarrage de l\'analyse des commandes...');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commandes').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(__dirname + `/commandes/${file}`);
	console.log("Analyse de la commande " + command.data.name);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log("-----\nEnvoi des données vers Discord")
		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

	} catch (error) {
		console.error(error);
		process.exit(1)
	}
	console.log("Terminé! Les changement peuvent prendre jusqu'à une heure pour s'appliquer.");
})();