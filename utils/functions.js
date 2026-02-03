const { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ActionRowBuilder, ComponentType, time, userMention } = require("discord.js");
const Discord = require("discord.js");
const { assets, config } = require("../index");

/**
 * 
 * @param {ChatInputCommandInteraction} interaction Command interaction
 * @param {String} message Message to be sent
 * @param {Boolean} disclose Whether message is ephemeral or not [true]
 * @returns 
 */
async function fastReply(interaction, message, disclose = true) {

    if(typeof message !== "string") return new Error("Input must be a string.");
    if(typeof disclose !== "boolean") return new Error("Input must be a boolean.");

    try {

        let embed = new EmbedBuilder().setDescription(message).setColor(`${assets.colors.empty}`);

        if (interaction.deferred) {
            await interaction.editReply({
                embeds: [embed]
            })
        } else {
            interaction.reply({
                embeds: [embed],
                ephemeral: disclose
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function getDevelopers() {
    let arr = Object.values(config.settings.developers);
    return arr;
}

module.exports = {
    fastReply,
    getDevelopers
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */
