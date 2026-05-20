module.exports = [
    {
        name: 'ping',
        description: 'Mengecek litensi pesan',
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
        execute(message) {
            // 1. Ambil semua command dari laci arsip
            const daftarCommand = message.client.command;

            // 2. Buat variabel teks awal (Gunakan 'let' karena teks ini akan kita tambah-tambah)
            let teksBantuan = "**📚 Daftar Perintah Bot**\nBerikut adalah perintah yang tersedia:\n\n";

            // 3. Looping: Masukkan nama dan deskripsi ke dalam teksBantuan
            daftarCommand.forEach((command) => {
                teksBantuan += `**.${command.name}** - ${command.description || 'Tidak ada deskripsi'}\n`;
            });

            // 4. Kirim teks yang sudah jadi ke Discord
            message.channel.send(teksBantuan);
        }
    },
    {
        name: 'waktu',
        description: 'Melihat waktu sekarang',
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
        name: 'info',
        description: 'Menampilkan informasi Bot',
        execute(message){
            const infoBot =
            '\n'+
            'INFORMASI BOT:\n\n'+ 
            'Nama: Zyubot\n'+
            'Owner: Zythetic\n'+
            'Versi: Alpha 0.1\n\n'+
            'Bot masih dalam tahap pengembangan'

            message.reply(infoBot);
        }
    }

];