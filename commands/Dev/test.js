const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const Discord = require("discord.js");
const { assets } = require("../../index");
const { fastReply } = require("../../utils/functions");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is a developer-exclusive command.")
    .setNSFW(false),
    developer: true,
    undone: false,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        // await fastReply(interaction, "```* (This commands seems to function all well...) ```\n ```* (All the hard work seems to have paid off...) ```\n ```* (You're filled with DETERMINATION) ```");

        await interaction.deferReply({});
        await interaction.editReply({content: "```* (This commands seems to function all well...) ```\n ```* (All the hard work seems to have paid off...) ```\n ```* (You're filled with DETERMINATION.) ```"})
        console.log("* (Huh... this client hasn't crashed it seems, even after using this command... and it fills you with DETERMINATION.)")
    }
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */