const { ChatInputCommandInteraction, EmbedBuilder, Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } = require("discord.js");
const Discord = require("discord.js");
const { config, assets } = require("../../index");
const { EventTypes } = require("../../types/EventTypes");
const { fastReply, getDevelopers } = require("../../utils/functions");


module.exports = {
    name: Events.InteractionCreate,
    type: EventTypes.Discord,
    once: false,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction Command interaction
     * @param {Discord.Client} client Discord Client
     */
    async execute (interaction, client) {

        if(interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return fastReply(interaction, "This command doesn't exist or couldn't be found.");

            if(!interaction.guild.members.me.permissions.has(Discord.PermissionFlagsBits.Administrator) && command.name !== "help") {
                return fastReply(interaction, "I cannot help until I have all my permissions in order: `Administrator`", false)
            }

            if(command.developer && !getDevelopers().includes(interaction.user.id)) {
                interaction.reply({
                    embeds: [new EmbedBuilder().setAuthor({iconURL: `${interaction.guild.members.me.displayAvatarURL()}`, name: `${interaction.guild.members.me.displayName}`}).setColor(`${assets.colors.client}`).setDescription("This command is developer-exclusive.")],
                    ephemeral: true
                });
                return;
            }

            if(command.undone) {
                if(typeof command.undone !== "boolean") {
                    throw new Error("You may input a boolean.");
                } else if (command.undone == true) {
                    interaction.reply({
                        embeds: [new EmbedBuilder().setAuthor({iconURL: `${interaction.guild.members.me.displayAvatarURL()}`, name: `${interaction.guild.members.me.displayName}`}).setColor(`${assets.colors.client}`).setDescription("Sorry, this command is not available yet.")],
                    ephemeral: true
                    });
                    return;
                }
            }

            // command.execute(interaction, client);

            const subcommand = interaction.options.getSubcommand(false);
            if(subcommand) {
                const subcommandFile = client.subcommands.get(`${interaction.commandName}/${subcommand}`);
                
                if(subcommandFile) {
                    if(subcommandFile.developer && !getDevelopers().includes(interaction.user.id)) {
                        interaction.reply({
                            embeds: [new EmbedBuilder().setAuthor({iconURL: `${interaction.guild.members.me.displayAvatarURL()}`, name: `${interaction.guild.members.me.displayName}`}).setColor(`${assets.colors.client}`).setDescription("This sub-command is developer-exclusive.")],
                            ephemeral: true
                        });
                        return;
                    }
        
                    if(subcommandFile.undone) {
                        if(typeof subcommandFile.undone !== "boolean") {
                            throw new Error("You may input a boolean.");
                        } else if (subcommandFile.undone == true) {
                            interaction.reply({
                                embeds: [new EmbedBuilder().setAuthor({iconURL: `${interaction.guild.members.me.displayAvatarURL()}`, name: `${interaction.guild.members.me.displayName}`}).setColor(`${assets.colors.client}`).setDescription("Sorry! This subcommand is currently under development.")],
                            ephemeral: true
                            });
                            return;
                        }
                    }
                    subcommandFile.execute(interaction, client);
                }
            } else command.execute(interaction, client);

        } 
        // else if(interaction.isButton()) {
            
        //     await interaction.deferReply({ ephemeral: true }).then(async () => {
        //         if(interaction.customId.split("_")[0] == "music") {

        //             let buttonType = interaction.customId.split("_")[1];
        //             let queue = client.distube.getQueue(interaction.guildId);
        //             let defaultEmbed = interaction.message.embeds;

        //             const play = new ButtonBuilder()
        //             .setCustomId("music_play_button")
        //             .setDisabled(false)
        //             .setStyle(ButtonStyle.Success)
        //             .setEmoji(`${assets.guild.emojis.music_buttons.play}`);
        //             // .setLabel("Play");
    
        //             const pause = new ButtonBuilder()
        //             .setCustomId("music_pause_button")
        //             .setDisabled(false)
        //             .setStyle(ButtonStyle.Success)
        //             .setEmoji(`${assets.guild.emojis.music_buttons.pause}`);
        //             // .setLabel("Pause");
    
        //             const stop = new ButtonBuilder()
        //             .setCustomId("music_stop_button")
        //             .setDisabled(false)
        //             .setStyle(ButtonStyle.Secondary)
        //             .setEmoji(`${assets.guild.emojis.music_buttons.stop}`);
        //             // .setLabel("Stop");
    
        //             const skip = new ButtonBuilder()
        //             .setCustomId("music_skip_button")
        //             .setDisabled(false)
        //             .setStyle(ButtonStyle.Primary)
        //             .setEmoji(`${assets.guild.emojis.music_buttons.skip}`);
        //             // .setLabel("Skip");
    
        //             let row = new Discord.ActionRowBuilder();
                    
        //             if(queue) {
        //                 if(!interaction.member.voice?.channel) {
        //                 await interaction.editReply({
        //                     embeds: [new EmbedBuilder().setDescription("You must be in a voice channel.").setColor(`${assets.client.empty}`)]
        //                 });
        //                     return;
        //                 }
    
        //                 if(interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channelId) {
        //                     await interaction.editReply({
        //                     embeds: [new EmbedBuilder().setDescription("You must be in the same voice channel as me!").setColor(`${assets.client.empty}`)]
        //                 });
        //                     return;
        //                 }
    
        //                 switch (buttonType) {
        //                     case "skip":
        //                         try {
        //                             await queue.skip()
        //                             interaction.message.edit({
        //                                 embeds: [new EmbedBuilder().setDescription("Track has been skipped.").setColor(`${assets.client.colour}`)],
        //                                 components: []
        //                             });
        //                             await interaction.editReply({
        //                                 embeds: [new EmbedBuilder().setDescription("Skipped track.").setColor(`${assets.client.colour}`)]
        //                             });
        //                         } catch (e) {
        //                             await queue.stop();
        //                             interaction.message.edit({
        //                             embeds: [new EmbedBuilder().setDescription("Clearing the queue and leaving the channel.").setColor(`${assets.client.colour}`)],
        //                             components: []
        //                             });
        //                             await interaction.editReply({
        //                                 embeds: [new EmbedBuilder().setDescription("Stopped queue.").setColor(`${assets.client.colour}`)]
        //                             });
        //                         }
                                
        //                             // let model = await q.findOne({ where: { guildId: queue.id }, logging: false });
        //                             // if(model.isFirstSong == true) model.isFirstSong = false;
        //                             // await model.save({ logging: false });
        //                         break;
        //                     case "stop":
        //                         await queue.stop()
        //                         interaction.message.edit({
        //                             embeds: [new EmbedBuilder().setDescription("Clearing the queue and leaving the channel.").setColor(`${assets.client.colour}`)],
        //                             components: []
        //                         });
        //                         await interaction.editReply({
        //                             embeds: [new EmbedBuilder().setDescription("Stopped queue.").setColor(`${assets.client.colour}`)]
        //                         })
        //                         break;
        //                     case "play":
        //                         await queue.resume()
        //                         row.addComponents(pause, stop, skip);
        //                         interaction.message.edit({
        //                             embeds: defaultEmbed,
        //                             components: [row]
        //                         });
        //                         await interaction.editReply({
        //                             embeds: [new EmbedBuilder().setDescription("Resuming queue.").setColor(`${assets.client.colour}`)]
        //                         })
        //                         break;
        //                     case "pause":
        //                         await queue.pause()
        //                         row.addComponents(play, stop, skip);
        //                         interaction.message.edit({
        //                             embeds: defaultEmbed,
        //                             components: [row]
        //                         });
        //                         await interaction.editReply({
        //                             embeds: [new EmbedBuilder().setDescription("Paused queue.").setColor(`${assets.client.colour}`)]
        //                         });
        //                         break;
                                
        //                 }
    
        //             } else if((queue && queue.playing) || !queue || (queue.songs.length <= 1 && queue.playing)) {
        //                 await interaction.editReply({
        //                     embeds: [new EmbedBuilder().setDescription("Sorry, these interactive buttons have expired.").setColor(`${assets.client.colour}`)]
        //                 });
        //                 interaction.message.edit({
        //                     embeds: [new EmbedBuilder().setDescription("This queue is over.").setColor(`${assets.client.colour}`)],
        //                     components: []
        //                 });
        //             }
        //         }
        //     });
        // }
    }
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */