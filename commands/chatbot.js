const {SlashCommandBuilder} = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('chat')
            .setDescription('Berbicara dengan Bot')
            .addStringOption(option =>
                option.setName('pesan')
                    .setDescription('Pesan untuk bot')
                    .setRequired(true)),
        async execute(interaction) {
            await interaction.reply('Masih dalam tahap pengembangan');
        }
    }
];