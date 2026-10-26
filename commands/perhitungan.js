const {SlashCommandBuilder} = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('hitung')
            .setDescription('Menghitung angka dengan 4 operasi dan 2 angka')
            .addStringOption(option =>
                option.setName('operasi')
                    .setDescription('Operasi matematika')
                    .setRequired(true)
                    .addChoices(
                        {name: 'Tambah (+)', value: 'tambah'},
                        {name: 'Kurang (-)', value: 'kurang'},
                        {name: 'Kali (×)', value: 'kali'},
                        {name: 'Bagi (÷)', value: 'bagi'}
                    ))
            .addNumberOption(option =>
                option.setName('angka1')
                    .setDescription('Angka pertama')
                    .setRequired(true))
            .addNumberOption(option =>
                option.setName('angka2')
                    .setDescription('Angka kedua')
                    .setRequired(true)),
        async execute(interaction) {
            const operasi = interaction.options.getString('operasi');
            const angka1 = interaction.options.getNumber('angka1');
            const angka2 = interaction.options.getNumber('angka2');

            let hasil;
            let simbol;

            switch(operasi){
                case 'tambah':
                    hasil = angka1 + angka2;
                    simbol = '+';
                    break;
                case 'kurang':
                    hasil = angka1 - angka2;
                    simbol = '-';
                    break;
                case 'kali':
                    hasil = angka1 * angka2;
                    simbol = '×';
                    break;
                case 'bagi':
                    if (angka2 === 0){
                        return interaction.reply({content: 'Maaf, tidak bisa dibagi 0', ephemeral: true});
                    }
                    hasil = angka1 / angka2;
                    simbol = '÷';
                    break;
                default:
                    return interaction.reply({content: 'Operasi tidak dikenali', ephemeral: true});
            }

            await interaction.reply(`Hasil dari ${angka1} ${simbol} ${angka2} = ${hasil}`);
        }
    }
];