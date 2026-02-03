const { Client } = require("discord.js");
const { loadFiles } = require("../utils/fileLoader");
const { EventTypes } = require("../types/EventTypes");
const { DisTube } = require("distube");
/**
 * 
 * @param {Client} client Discord Client
 * @param {DisTube} distubeClient Distube Client
 * 
 * this handles distube and twitch hook-up events
 */
async function loadEvents(client, distubeClient) {
    console.time("Events have been loaded in");
    console.log("Loading events...".underline);

    client.events = new Map();

    const events = new Array();

    const files = await loadFiles("events");
    for(const file of files) {
        try {
            const event = require(file);
            const eventType = event.type;
            /**
             * 
             * @param {*} fileEvents event
             * @param {*} inputClient client/tmiClient/distubeClient
             */
            // async function addEvent(fileEvents, inputClient, collectionRoute) {
            //     let execute = (...args) => fileEvents.execute(...args, inputClient);
            //     let target = fileEvents.rest ? inputClient.rest : inputClient;
            //     target[fileEvents.once ? "once" : "on"](fileEvents.name, execute);

            //     collectionRoute.set(fileEvents.name, execute);
            // }
            switch (eventType) {
                case EventTypes.Discord:
                    execute = (...args) => event.execute(...args, client);
                    target = event.rest ? client.rest : client;
                    target[event.once ? "once" : "on"](event.name, execute);

                    client.events.set(event.name, execute);
                    break;
            
                case EventTypes.Distube:
                    execute = (...args) => event.execute(...args, client);
                    target = event.rest ? distubeClient.rest : distubeClient;
                    target[event.once ? "once" : "on"](event.name, execute);

                    client.events.set(event.name, execute);
                    break;
                // case EventTypes.Twitch:
                //     execute = (...args) => event.execute(...args, client, tmiClient);
                //     target = event.rest ? tmiClient.rest : tmiClient;
                //     target[event.once ? "once" : "on"](event.name, execute);

                //     client.twitch.set(event.name, execute);
                //     break;
                case false:
                    throw new Error("You must define what type of event is this file: ".red, file.replace(/\\/g, "/").split("/").pop().slice(0, -3).bgRed)
                    break;
            }
            
            events.push({
                Event: event.name,
                Status: "✅",
                Type: eventType
            });
        } catch (e) {
            /**
             *  si no se ha podido pushear el evento
             */

          for(const file of files) {
            const event = require(file);
            events.push({ Event: `${file ? file.replace(/\\/g, "/").split("/").pop().slice(0, -3) : "#E1"}`, Status: "❌", Type: `${event.type ? event.type : undefined}`});
            console.log(String(e.stack).bgRed);
          }

            // events.push({ Event: `${file ? file.replace(/\\/g, "/").split("/").pop().slice(0, -3) : "#E1"}`, Status: "❌"});
          /**
             *  #E1 - Error code: Wasn't able to push file due to a lack of details within it.
             */
        }
    }

    console.table(events, ["Event", "Status", "Type"]);
    console.timeEnd("Events have been loaded in");
} // "Events have been loaded in".green

module.exports = {
    loadEvents
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */