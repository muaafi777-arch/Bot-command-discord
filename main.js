require('dotenv').config();
const {Client, GatewayIntentBits, Collection, REST, Routes, Events, MessageFlags} = require('discord.js');
const fs = require('fs');
const path = require('path');

const token = process.env.TOKEN_DC;
if (!token) {
    console.error('❌ TOKEN_DC tidak ditemukan di .env');
    process.exit(1);
}

const clientId = process.env.CLIENT_ID;
if (!clientId) {
    console.error('❌ CLIENT_ID tidak ditemukan di .env');
    process.exit(1);
}

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

bot.commands = new Collection();

// Load commands
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    if (Array.isArray(command)) {
        for (const cmd of command) {
            if ('data' in cmd && 'execute' in cmd) {
                bot.commands.set(cmd.data.name, cmd);
                commands.push(cmd.data.toJSON());
            } else {
                console.warn(`[WARNING] Command di ${filePath} tidak punya "data" atau "execute"`);
            }
        }
    } else {
        if ('data' in command && 'execute' in command) {
            bot.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[WARNING] Command di ${filePath} tidak punya "data" atau "execute"`);
        }
    }
}

// Deploy commands
async function deployCommands() {
    try {
        console.log(`🔄 Started refreshing ${commands.length} application (/) commands.`);

        const rest = new REST({version: '10'}).setToken(token);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            {body: commands}
        );

        console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
    }
}

// Ready event
bot.once(Events.ClientReady, async (c) => {
    console.log(`Bot ${c.user.displayName} sudah aktif`);
    if (!global.storage) {
        global.storage = new Map();
    }
    await deployCommands();
});

// Interaction handler
bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Command ${interaction.commandName} tidak ditemukan`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const reply = {content: 'Terjadi error saat menjalankan command.', flags: MessageFlags.Ephemeral};
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(reply);
        } else {
            await interaction.reply(reply);
        }
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    bot.destroy();
    process.exit(0);
});


bot.login(token);