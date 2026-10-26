require('dotenv').config();
const {Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');

const token = process.env.TOKEN_DC;
if (!token) {
    console.error('❌ TOKEN_DC tidak ditemukan di .env');
    process.exit(1);
}

const prefix = process.env.PREFIX || '.';

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

bot.commands = new Collection();

// Membaca folder commands dan file .js
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    if (Array.isArray(command)) {
        for (const cmd of command) {
            bot.commands.set(cmd.name, cmd);
        }
    } else {
        bot.commands.set(command.name, command);
    }
}

// Pesan CMD: bot sudah aktif
bot.once('ready', () => {
    console.log(`Bot ${bot.user.displayName} sudah aktif`);
    // Inisialisasi storage
    if (!global.storage) {
        global.storage = new Map();
    }
});

// Memanggil command Bot
bot.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) {
        return message.reply('Command tidak tersedia, ketik **.help** untuk melihat command yang tersedia');
    }

    try {
        bot.commands.get(commandName).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Terjadi error saat menjalankan command.');
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    if (global.storage) {
        for (const [key, value] of global.storage.entries()) {
            if (key.endsWith('_gameTimer') && value) {
                clearInterval(value);
            }
        }
    }
    bot.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down...');
    if (global.storage) {
        for (const [key, value] of global.storage.entries()) {
            if (key.endsWith('_gameTimer') && value) {
                clearInterval(value);
            }
        }
    }
    bot.destroy();
    process.exit(0);
});

bot.login(token);