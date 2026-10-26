const {SlashCommandBuilder, EmbedBuilder, ChannelType, MessageFlags} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Menampilkan informasi server ini'),
    async execute(interaction) {
        if (!interaction.inGuild()) {
            return interaction.reply({
                content: 'Command ini hanya bisa digunakan di server.',
                flags: MessageFlags.Ephemeral
            });
        }

        const guild = interaction.guild;
        const owner = await guild.fetchOwner();
        const channels = await guild.channels.fetch();
        const textChannels = channels.filter(channel => channel.type === ChannelType.GuildText).size;
        const voiceChannels = channels.filter(channel => channel.type === ChannelType.GuildVoice).size;
        const createdAt = Math.floor(guild.createdTimestamp / 1000);
        const verificationLevels = ['Tidak ada', 'Rendah', 'Sedang', 'Tinggi', 'Tertinggi'];

        const embed = new EmbedBuilder()
            .setColor('Gold')
            .setTitle(`Informasi ${guild.name}`)
            .setThumbnail(guild.iconURL({size: 512}))
            .addFields(
                {name: 'ID Server', value: guild.id, inline: true},
                {name: 'Pemilik', value: `${owner.user.tag} (${owner.id})`, inline: false},
                {name: 'Dibuat', value: `<t:${createdAt}:D> (<t:${createdAt}:R>)`, inline: true},
                {name: 'Anggota', value: guild.memberCount.toLocaleString('id-ID'), inline: true},
                {name: 'Channel', value: `${textChannels} teks · ${voiceChannels} suara`, inline: true},
                {name: 'Verifikasi', value: verificationLevels[guild.verificationLevel] ?? 'Tidak diketahui', inline: true}
            );

        await interaction.reply({embeds: [embed]});
    }
};