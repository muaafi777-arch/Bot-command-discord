const { EmbedBuilder } = require('discord.js');

module.exports = [
    {
        name: 'userinfo',
        description: 'Menampilkan informasi user',
        category: 'Sistem ⚙️',
        execute(message, args){
            const targetMember = message.mentions.members.first()  || message.member;
            const user = targetMember.user;

            const waktuDibuat = Math.floor(user.createdTimestamp / 1000);
            const waktuBergabung = Math.floor(targetMember.joinedTimestamp / 1000);

            const avatarUser = user.displayAvatarURL({dynamic: true, size: 512});

            

            const infoEmbed = new EmbedBuilder()
                .setColor('Gold')
                .setTitle(`Profile ${user.username}`)
                .setThumbnail(avatarUser)
                .setFields(
                    { name: 'Tag', value: user.tag, inline: true},
                    { name: 'ID user', value: user.id, inline: true},
                    { name: '📅 Akun Dibuat', value: `<t:${waktuDibuat}:D> (<t:${waktuDibuat}:R>)`, inline: false },
                    { name: '📥 Masuk Server Ini', value: `<t:${waktuBergabung}:D> (<t:${waktuBergabung}:R>)`, inline: false }
                )
                

            message.reply({embeds: [infoEmbed]})
        }
    }
]