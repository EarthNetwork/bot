import * as fs from "fs";
module.exports = async (client, interaction) => {
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			if(interaction.replied) await interaction.editReply({ content: "Une erreur s'est produite lors de l'éxecution de la commande", ephemeral: true });
			else await interaction.reply({ content: "Une erreur s'est produite lors de l'éxecution de la commande", ephemeral: true });
		}
	}
	else if(interaction.isContextMenu()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			if(interaction.replied) await interaction.editReply({ content: "Une erreur s'est produite lors de l'éxecution de la commande", ephemeral: true });
			else await interaction.reply({ content: "Une erreur s'est produite lors de l'éxecution de la commande", ephemeral: true });
		}
	}
	else if(interaction.isButton()) {
		const file = require(__dirname + `/../interactions/buttons/${interaction.customId}`.replace(".js", ""))
		file(client, interaction);
	}
};