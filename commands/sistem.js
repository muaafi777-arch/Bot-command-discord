module.exports = [
    {
        name: 'ping',
        description: 'Mengecek litensi pesan',
        category: 'Sistem ⚙️',
        async execute(message) {
            const pesanSementara = await message.reply('Sedang menghitung....')
            const apiPing = message.client.ws.ping;
            const hasilAkhir = 
            `Pong!\n`+
            `Ping: ${apiPing}ms`
            
            pesanSementara.edit(hasilAkhir)
        }
    },
    {
        name: 'help',
        description: 'Menampilkan list command',
        category: 'Sistem ⚙️',
        execute(message) {
            const daftarCommand = message.client.command;

            const grupKategori = {}

            daftarCommand.forEach((command) => {
                const namaKategori = command.category || 'Lainnya';

                if (!grupKategori[namaKategori]){
                    grupKategori[namaKategori] = []
                }


                grupKategori[namaKategori].push(`**.${command.name}** - ${command.description || 'Tidak ada deskripsi'}`);
            });

            let teksBantuan = "**📚 Daftar Perintah Bot**\nBerikut adalah perintah yang tersedia:\n\n";

            for (const kategori in grupKategori){
                teksBantuan += `**__${kategori}__**\n`
                teksBantuan += grupKategori[kategori].join('\n')
                teksBantuan += '\n\n'
            }
            message.channel.send(teksBantuan);
        }
    },
    {
        name: 'hari',
        description: 'Melihat hari',
        category: 'Sistem ⚙️',
        execute(message){
            const waktu = new Date();
            const hari = waktu.toLocaleDateString('id-ID', {
                dateStyle: 'full',
                timeZone: 'Asia/Jakarta'
            });
        
            message.reply(`Hari ${hari} `)
        }
    },
    {
        name: 'waktu',
        description: 'Melihat waktu',
        category: 'Sistem ⚙️',
        execute(message){
            const waktu = new Date();
            const pukul = waktu.toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        
            message.reply(`Pukul ${pukul} `)
        }
    },
    {
        name: 'info',
        description: 'Menampilkan informasi Bot',
        category: 'Sistem ⚙️',
        execute(message){
            const infoBot =
            '------------------\n'+
            'INFORMASI BOT:\n\n'+ 
            'Nama: Zyubot\n'+
            'Owner: Zythetic\n'+
            'Versi: Alpha 0.1\n\n'+
            'Bot masih dalam tahap pengembangan'

            message.reply(infoBot);
        }
    }

];