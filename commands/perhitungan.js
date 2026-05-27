module.exports = [
    {
        name: 'hitung',
        description: 'Menghitung angka dengan 4 operasi dan 2 angka',
        category: 'Perhitungan 📕',
        execute(message, args){
            const contohOperasi = 
                    'Untuk mulai menghitung gunakan format: **.hitung <operasi> <angka1> <angka2>**\n\n' +
                    '**Operasi yang tersedia:**\n' +
                    '- **.hitung tambah** - untuk mengeksekusi penambahan\n' +
                    '- **.hitung kurang** - untuk mengeksekusi pengurangan\n' +
                    '- **.hitung kali** - untuk mengeksekusi perkalian\n' +
                    '- **.hitung bagi** - untuk mengeksekusi pembagian\n'
            if(args.length < 1) {
                return message.reply(contohOperasi)
            }else if(args.length < 3){
                return message.reply('Format salah, silahkan ulangi (contoh: .hitung <operasi> <angka1> <angka2>)')
            }

            const operasi = args[0].toLowerCase();
            const angka1 = Number(args[1]);
            const angka2 = Number(args[2]);


            if (isNaN(angka1) || isNaN(angka2)){
                return message.reply('Tolong masukkan angka yang valid');
            }

            let hasil;
            let simbol;

            switch(operasi){
                case 'tambah':
                    hasil = angka1 + angka2;
                    simbol = '+';
                    break
                case 'kurang':
                    hasil = angka1 - angka2;
                    simbol = '-'
                    break
                case 'kali':
                    hasil = angka1 * angka2;
                    simbol = 'x';
                    break
                case 'bagi':
                    if (angka2 === 0){
                        return message.reply('Maaf, tidak bisa dibagi 0')
                    }
                    hasil = angka1 / angka2;
                    simbol = '/'
                    break
                default:
                    return message.reply('Operasi tidak dikenali, silahkan coba kembali')

            }
            message.reply(`Hasil dari ${angka1} ${simbol} ${angka2} = ${hasil}`)
        }
    },
    
    // {
    //     name: 'fisika',
    //     description: 'menghitung fisika sederhana',
    //     execute(message, args){
    //         const infoBot = 
    //         'Untuk mulai menghitung gunakan format: .fisika <tipe> <angka1> <angka2>\n\n'+
    //         'Tipe yang bisa dikerjakan:\n'+
    //         '- .fisika jarak : menghitung jarak'
    //     }
    // }
]