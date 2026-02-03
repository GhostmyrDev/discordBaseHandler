const { Client, Events } = require("discord.js");
const { loadCommands } = require("../../handlers/commands");
const { EventTypes } = require("../../types/EventTypes");
const { LoadEnvironment } = require("../../types/LoadCommands");

module.exports = {
    name: Events.ClientReady,
    once: true,
    type: EventTypes.Discord,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        console.log(`Ready event has fired. Client is functional.`.green);

        loadCommands(client, LoadEnvironment.Guild).then(async () => {
            await console.log("Commands are ready!".green);
            await console.log(`${client.user.username} is ready!`.bgGreen);
        });

    }
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */