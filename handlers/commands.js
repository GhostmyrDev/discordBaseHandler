const { SlashCommandBuilder, SlashCommandSubcommandBuilder, PermissionFlagsBits, Client, REST, Routes, GuildDefaultMessageNotifications } = require("discord.js");
const { loadFiles, loadSubcommandFiles } = require("../utils/fileLoader");
const fs = require("fs");
const path = require("path");
const { LoadEnvironment } = require("../types/LoadCommands");
const { config } = require("../index");
const colors = require("colors");

/**
 * 
 * @param {Client} client Discord Client
 * @param {String} loadType By default: LoadEnvironment.Guild
 */
async function loadCommands(client, loadType = LoadEnvironment.Guild) {
  // const table = new ascii().setHeading("Commands", "Status");
  switch (loadType) {
    case LoadEnvironment.Global:
        console.log("Loading **GLOBAL** commands...".underline);
      console.time("Commands have been loaded".green);

      await client.commands.clear();
      await client.subcommands.clear();
      client.commands = new Map();
    
      const commandsArr = new Array();
      const commandStatus = new Array();
    
      const files = await loadFiles("commands");
      const subcommandFiles = await loadSubcommandFiles("commands");
    
      files.forEach((file) => {
        try {
          const command = require(file);
    
          if(command.subcommand) return client.subcommands.set(command.subcommand, command);
          
          client.commands.set(command.data.name, command);
    
          commandsArr.push(command.data.toJSON());
    
          commandStatus.push({
            Command: command.data.name,
            Status: "✅"
          });
        } catch (e) {
    
          for (const file of files) {
            commandStatus.push({ Command: `${file ? file.replace(/\\/g, "/").split("/").pop().slice(0, -3) : "#C1"}`, Status: "❌" });
            console.log(String(e.stack).bgRed);
          }
    
          /**
                 *  #C1 - Error code: Wasn't able to push file due to a lack of details within it.
                 */
          
        }
      });
    
      client.application.commands.set(commandsArr);
      console.table(commandStatus, ["Command", "Status"]);
      console.log(`Successfully pushed ${commandStatus.length} application (/) commands.`.green);
      console.timeEnd("Commands have been loaded".green);
      break;
  
    case LoadEnvironment.Guild:
      if(config.client.guilds.length == 0) {
          throw new Error("No guilds have been input in config/config.json > config/client/guilds. Add a recognisable Guild ID or set the loading environemnt to LoadEnvironment.Global");
        }
      console.log(`Loading **GUILD** commands for the next guilds:`.underline);

      async function getAllGuilds() {
        let arr = new Array();
        for(const guild of config.client.guilds) {
          client.guilds.fetch(guild).then(async (g, rejected) => {
            if(g) {
              let str = `${g.name} (${g.id})`;
              arr.push(str);
            } else if (rejected) {
              throw new Error(`Couldn't find the guild tied to this ID: ${guild}. Have you made sure to add me to this guild or if this even is a guild?`)
            }
          })
        }
        return arr;
      }

      let allGuilds = await getAllGuilds();
      // for(let i = 0; i < config.client.guilds.length; i++) {
      //   let currentGuild = config.client.guilds[i];
        
      // }
      // console.log(allGuilds);
      console.log(`${allGuilds.join("\n")}`.bgYellow);
      console.time("Commands have been loaded");

      const commands = [];
      const guildCommandStatus = new Array();
      // Grab all the command folders from the commands directory you created earlier
      const foldersPath = path.join(__dirname, '../commands');
      const commandFolders = fs.readdirSync(foldersPath);
      // console.log(foldersPath);
      // Grab all the subcommand folders
      
      for (const folder of commandFolders) {
          // Grab all the command files from the commands directory you created earlier
          const commandsPath = path.join(foldersPath, folder);
          const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
          // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
          for (const file of commandFiles) {

            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            // command.data.setDescription(".");

            if(command.subcommand) return client.subcommands.set(command.subcommand, command);

            if ('data' in command && 'execute' in command) {
              commands.push(command.data.toJSON());
              client.commands.set(command.data.name, command);
              guildCommandStatus.push({
                Command: command.data.name,
                Status: "✅"
              });
            } else {
              console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`.bgRed);
              guildCommandStatus.push({ Command: `${file ? file.replace(/\\/g, "/").split("/").pop().slice(0, -3) : "#C1"}`, Status: "❌" });
              console.log(String(e.stack).bgRed);
              continue;
            }
          }
        }

        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(client.token);
        let guildRoster = new Array();
        // and deploy your commands!
        (async () => {
          try {

            config.client.guilds.forEach(async (g) => {
                console.log(`Started refreshing ${commands.length} application (/) commands for ${g}.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                Routes.applicationGuildCommands(client.user.id, g),
                { body: commands },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands in ${g}.`.green);
                guildRoster.push({
                    Guild: g
                });
            });

          } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
          }
        })();

        console.table(guildCommandStatus, ["Command", "Status"]);
        // console.log("it's around here");
        // console.table(guildRoster, ["Guild"])
        console.timeEnd("Commands have been loaded");
      break;
  }
  
}

module.exports = {
  loadCommands
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */