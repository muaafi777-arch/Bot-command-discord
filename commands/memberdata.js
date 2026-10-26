const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = [
    {
        data: new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Menampilkan informasi user')
            .addUserOption(option =>
                option.setName('target')
                    .setDescription('User yang ingin dilihat')
                    .setRequired(false)),
        async execute(interaction) {
            const targetUser = interaction.options.getUser('target') || interaction.user;
            
            // Get member only if in guild
            let targetMember = null;
            if (interaction.guild) {
                targetMember = interaction.options.getMember('target') || interaction.member;
            }

            const waktuDibuat = Math.floor(targetUser.createdTimestamp / 1000);
            const waktuBergabung = targetMember?.joinedTimestamp ? Math.floor(targetMember.joinedTimestamp / 1000) : null;

            const avatarUser = targetUser.displayAvatarURL({dynamic: true, size: 512});

            const infoEmbed = new EmbedBuilder()
                .setColor('Gold')
                .setTitle(`Profile ${targetUser.username}`)
                .setThumbnail(avatarUser)
                .setFields(
                    {name: 'Tag', value: targetUser.tag, inline: true},
                    {name: 'ID user', value: targetUser.id, inline: true},
                    {name: '📅 Akun Dibuat', value: `<t:${waktuDibuat}:D> (<t:${waktuDibuat}:R>)`, inline: false}
                );

            if (waktuBergabung) {
                infoEmbed.addFields({name: '📥 Masuk Server Ini', value: `<t:${waktuBergabung}:D> (<t:${waktuBergabung}:R>)`, inline: false});
            } else if (interaction.guild) {
                infoEmbed.addFields({name: '📥 Masuk Server Ini', value: 'Tidak diketahui', inline: false});
            }

            await interaction.reply({embeds: [infoEmbed]});
        }
    }
];