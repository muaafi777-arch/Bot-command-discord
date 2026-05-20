require('dotenv').config();
const {Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');
const token = process.env.TOKEN_DC;


const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

bot.command = new Collection();

//Membaca folder commands dan file .js
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    

    if(Array.isArray(command)){
        for(const cmd of command){
            bot.command.set(cmd.name, cmd);
        }
    }else {
            bot.command.set(command.name, command);
        }
}

//Pesan CMD: bot sudah aktif
bot.once('ready', () => {
    console.log(`Bot ${bot.user.displayName} sudah aktif`)
});


//Memanggil command Bot
bot.on('messageCreate', (message) =>{
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) ||message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!bot.command.has(commandName)) {
        return message.reply('Command tidak tersedia, ketik ***.help*** untuk melihat command yang tersedia')};

    try {
            bot.command.get(commandName).execute(message, args);

    } catch(error){
        console.log(error);
        message.reply('Sistem error');
    }
});

bot.login(token);