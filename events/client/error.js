const { Client, Events } = require("discord.js");
const { EventTypes } = require("../../types/EventTypes");

module.exports = {
    name: Events.Error,
    once: false,
    type: EventTypes.Discord,
    /**
     * 
     * @param {Error} err 
     * @param {Client} client 
     * @returns 
     */
    async execute(err, client) {

        console.log("[WARNING] An error has fired".bgRed);
        if(err) return console.log(err);

    }
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */