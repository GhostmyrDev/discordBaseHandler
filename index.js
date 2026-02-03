const Discord = require("discord.js");
const { Collection } = require("discord.js");
const config = require("./config/config.json");
const assets = require("./assets/assets.json");

const client = new Discord.Client({
    //fetchAllMembers: false,
    //restTimeOffset: 0,
    //restWsBridgetimeout: 100,
    // shards: "auto",
    allowedMentions: {
      parse: [ "users", "roles", "everyone" ],
      repliedUser: false,
    },
    partials: [
      Discord.Partials.Message,
      Discord.Partials.Channel,
      Discord.Partials.Reaction,
      Discord.Partials.User,
      Discord.Partials.GuildMember,
      Discord.Partials.ThreadMember,
      Discord.Partials.GuildScheduledEvent
    ],
    intents: [ 
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        //Discord.Intents.FLAGS.GUILD_BANS,
        //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        //Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.MessageContent,
        //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Discord.Intents.FLAGS.DIRECT_MESSAGES,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: { // https://discord.js.org/docs/packages/discord.js/14.16.3/PresenceData:Interface
        activities: [
          {
            name:"the Flight of the Bumblebee",
            state: "in YouTube",
            type: Discord.ActivityType.Listening,
            url: "https://www.youtube.com/watch?v=9ZsGEhTGL6g"
          }
        ],
        status: "online"
    }
});

// defining collections
client.events = new Collection();
client.commands = new Collection();
client.categories = require("fs").readdirSync(`./commands`);
client.permissions = [
  Discord.PermissionFlagsBits.Administrator
];
client.subcommands = new Collection();


const { loadEvents } = require("./handlers/events");
loadEvents(client);

module.exports = {
    client,
    config,
    assets
};

client.login(config.client.token).catch((e) => {
  if(e) {
    console.log(e)
  }
    // console.log(e.red);
});

/*
      ___       ___           ___           ___     
     /\__\     /\  \         /\  \         /\__\    
    /:/  /    /::\  \        \:\  \       /:/  /    
   /:/  /    /:/\:\  \        \:\  \     /:/__/     
  /:/  /    /::\~\:\  \       /::\  \   /::\  \ ___ 
 /:/__/    /:/\:\ \:\__\     /:/\:\__\ /:/\:\  /\__\
 \:\  \    \:\~\:\ \/__/    /:/  \/__/ \/__\:\/:/  /
  \:\  \    \:\ \:\__\     /:/  /           \::/  / 
   \:\  \    \:\ \/__/     \/__/            /:/  /  
    \:\__\    \:\__\                       /:/  /   
     \/__/     \/__/                       \/__/            made this.
*/