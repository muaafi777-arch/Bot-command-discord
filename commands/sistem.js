const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Mengecek latensi bot'),
        async execute(interaction) {
            const apiPing = interaction.client.ws.ping;
            await interaction.reply(`Pong!\nPing: ${apiPing}ms`);
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('Menampilkan list command'),
        async execute(interaction) {
            const daftarCommand = interaction.client.commands;

            const grupKategori = {};

            daftarCommand.forEach((command) => {
                const namaKategori = 'System';

                if (!grupKategori[namaKategori]){
                    grupKategori[namaKategori] = []
                }

                grupKategori[namaKategori].push(`**/${command.data.name}** - ${command.data.description || 'Tidak ada deskripsi'}`);
            });

            let teksBantuan = "**📚 Daftar Perintah Bot**\nBerikut adalah perintah yang tersedia:\n\n";

            for (const kategori in grupKategori){
                teksBantuan += `**__${kategori}__**\n`
                teksBantuan += grupKategori[kategori].join('\n')
                teksBantuan += '\n\n'
            }
            await interaction.reply(teksBantuan);
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('hari')
            .setDescription('Melihat hari'),
        async execute(interaction) {
            const waktu = new Date();
            const hari = waktu.toLocaleDateString('id-ID', {
                dateStyle: 'full',
                timeZone: 'Asia/Jakarta'
            });

            await interaction.reply(`Hari ${hari}`);
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('waktu')
            .setDescription('Melihat waktu'),
        async execute(interaction) {
            const waktu = new Date();
            const pukul = waktu.toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            await interaction.reply(`Pukul ${pukul}`);
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName('info')
            .setDescription('Menampilkan informasi Bot'),
        async execute(interaction) {
            const infoBot =
            '------------------\n'+
            'INFORMASI BOT:\n\n'+
            'Nama: Zyubot\n'+
            'Owner: Zythetic\n'+
            'Versi: Alpha 0.1\n\n'+
            'Bot masih dalam tahap pengembangan';

            await interaction.reply(infoBot);
        }
    }
];