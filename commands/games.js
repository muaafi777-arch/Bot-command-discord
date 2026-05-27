module.exports = [
    {
        name: 'highlow',
        description: 'Start game High/Low',
        aliases: ['hl', 'highlowgame'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            // In-memory storage
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const userBalance = global.storage.get(user + '_balance') || 100;
            const userGame = global.storage.get(user + '_game');

            const embed = {
                title: '🎲 High/Low Game',
                description: 'Tebak apakah angka berikutnya lebih tinggi atau lebih rendah!',
                color: 0x5865F2,
                footer: { text: 'High/Low Bot' }
            };

            if (userGame && userGame.status === 'playing') {
                embed.title = '⏳ High/Low in Progress...';
                embed.description = `Anda bertaruh **$${userGame.bet}**!

Angka sebelumnya: **${userGame.previousNumber}**

Pilihan Anda: **${userGame.userChoice}**

Angka berikutnya akan muncul dalam ${userGame.timer}s`;

                embed.fields = [{
                    name: 'Aturan:',
                    value: '1. Tunggu timer habis\n'
                    + '2. Menang: dapat 2x taruhan Anda\n'
                    + '3. Kalah: taruhan hilang'
                }];

                return message.channel.send({ embeds: [embed] });
            }

            embed.title = '🎮 Main High/Low';
            embed.description = 'Angka acak akan muncul, lalu Anda harus menebak apakah angka berikutnya lebih tinggi atau lebih rendah!';
            embed.color = 0x5865F2;
            embed.fields = [{
                name: 'Cara Main:',
                value: '1. Taruh saldo (min: $10, max: $500)\n'
                + '2. Pilih **high** atau **low**\n'
                + '3. Menang = dapat 2x taruhan\n'
                + '4. Kalah = taruhan hilang'
            }];

            embed.fields.push({
                name: 'Saldo Anda:',
                value: `$${userBalance}`,
                inline: true
            });

            embed.fields.push({
                name: 'Pilih:',
                value: '**high** atau **low**',
                inline: true
            });

            // Simpan state game agar user tahu bisa mulai main (hanya jika belum bermain)
            if (!global.storage) {
                global.storage = new Map();
            }
            if (!userGame || userGame.status !== 'playing') {
                global.storage.set(message.author.id + '_game', {
                    status: 'ready',
                    timer: 10
                });
            }

            // Generate angka acak pertama kali
            const firstNumber = Math.floor(Math.random() * 100);
            global.storage.set(user + '_lastNumber', firstNumber);

            // Tampilkan angka terakhir jika ada
            const lastNumber = global.storage.get(user + '_lastNumber');
            if (lastNumber !== undefined) {
                embed.fields.push({
                    name: 'Angka Sebelumnya:',
                    value: lastNumber.toString(),
                    inline: true
                });
            }

            return message.channel.send({ embeds: [embed] });
        }
    },

    {
        name: 'high',
        description: 'Pilih HIGH',
        aliases: ['h'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            // In-memory storage
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const userBalance = global.storage.get(user + '_balance') || 100;
            const userGame = global.storage.get(user + '_game');

            // Ambil angka terakhir dari game sebelumnya
            const lastNumber = global.storage.get(user + '_lastNumber');

            if (!userGame || userGame.status !== 'ready') {
                return message.reply('⏳ Silakan ketik `.highlow` untuk mulai main High/Low!');
            }

            const betAmount = parseInt(args[0]);

            if (isNaN(betAmount) || betAmount <= 0) {
                return message.reply('❌ **Taruhan tidak valid!**\nSilakan masukkan jumlah saldo (angka).');
            }

            if (betAmount > userBalance) {
                return message.reply('❌ **Saldo tidak cukup!**\nSaldo Anda: $' + userBalance + '\nTaruhan maksimal: $' + userBalance);
            }

            if (betAmount < 10) {
                return message.reply('❌ **Taruhan minimum $10!**');
            }

            if (betAmount > 500) {
                return message.reply('❌ **Taruhan maksimum $500!**');
            }

            // Proses taruhan
            const previousNumber = lastNumber !== undefined ? lastNumber : Math.floor(Math.random() * 100);
            global.storage.set(user + '_balance', userBalance - betAmount);
            global.storage.set(user + '_game', {
                status: 'playing',
                bet: betAmount,
                previousNumber: previousNumber,
                timer: 10,
                userChoice: 'high'
            });
            
            // Hapus angka terakhir setelah digunakan
            global.storage.delete(user + '_lastNumber');

            const embed = {
                title: '✅ Pilihan Anda Diterima!',
                description: 'Anda memilih **HIGH**!',
                color: 0x00ff88,
                fields: [
                    {
                        name: 'Taruhan:',
                        value: '$' + betAmount,
                        inline: true
                    },
                    {
                        name: 'Angka Sebelumnya:',
                        value: previousNumber.toString(),
                        inline: true
                    }
                ],
                footer: { text: 'Tunggu timer habis...' }
            };

            const msg = await message.channel.send({ embeds: [embed] });

            // Timer untuk hasil game
            let timeLeft = 10;
            const timerInterval = setInterval(async () => {
                timeLeft--;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    await resolveGame(message, user);
                } else {
                    const updatedEmbed = { ...embed, footer: { text: `Tunggu timer habis... (${timeLeft}s)` } };
                    await msg.edit({ embeds: [updatedEmbed] });
                }
            }, 1000);

            global.storage.set(user + '_gameTimer', timerInterval);
        }
    },

    {
        name: 'low',
        description: 'Pilih LOW',
        aliases: ['l'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            // In-memory storage
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const userBalance = global.storage.get(user + '_balance') || 100;
            const userGame = global.storage.get(user + '_game');

            // Ambil angka terakhir dari game sebelumnya
            const lastNumber = global.storage.get(user + '_lastNumber');

            if (!userGame || userGame.status !== 'ready') {
                return message.reply('⏳ Silakan ketik `.highlow` untuk mulai main High/Low!');
            }

            const betAmount = parseInt(args[0]);

            if (isNaN(betAmount) || betAmount <= 0) {
                return message.reply('❌ **Taruhan tidak valid!**\nSilakan masukkan jumlah saldo (angka).');
            }

            if (betAmount > userBalance) {
                return message.reply('❌ **Saldo tidak cukup!**\nSaldo Anda: $' + userBalance + '\nTaruhan maksimal: $' + userBalance);
            }

            if (betAmount < 10) {
                return message.reply('❌ **Taruhan minimum $10!**');
            }

            if (betAmount > 500) {
                return message.reply('❌ **Taruhan maksimum $500!**');
            }

            // Proses taruhan
            const previousNumber = lastNumber !== undefined ? lastNumber : Math.floor(Math.random() * 100);
            global.storage.set(user + '_balance', userBalance - betAmount);
            global.storage.set(user + '_game', {
                status: 'playing',
                bet: betAmount,
                previousNumber: previousNumber,
                timer: 10,
                userChoice: 'low'
            });
            
            // Hapus angka terakhir setelah digunakan
            global.storage.delete(user + '_lastNumber');

            const embed = {
                title: '✅ Pilihan Anda Diterima!',
                description: 'Anda memilih **LOW**!',
                color: 0xff0055,
                fields: [
                    {
                        name: 'Taruhan:',
                        value: '$' + betAmount,
                        inline: true
                    },
                    {
                        name: 'Angka Sebelumnya:',
                        value: previousNumber.toString(),
                        inline: true
                    }
                ],
                footer: { text: 'Tunggu timer habis...' }
            };

            const msg = await message.channel.send({ embeds: [embed] });

            // Timer untuk hasil game
            let timeLeft = 10;
            const timerInterval = setInterval(async () => {
                timeLeft--;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    await resolveGame(message, user);
                } else {
                    const updatedEmbed = { ...embed, footer: { text: `Tunggu timer habis... (${timeLeft}s)` } };
                    await msg.edit({ embeds: [updatedEmbed] });
                }
            }, 1000);

            global.storage.set(user + '_gameTimer', timerInterval);
        }
    },

    {
        name: 'cancel',
        description: 'Batal taruhan',
        aliases: ['cancelbet', 'quit'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            // In-memory storage
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const userBalance = global.storage.get(user + '_balance') || 100;
            const userGame = global.storage.get(user + '_game');

            if (!userGame || userGame.status !== 'playing') {
                return message.reply('🎲 Anda tidak sedang bermain!\n\nKetik `.highlow` untuk mulai main High/Low.');
            }

            // Hentikan timer jika ada
            const timer = global.storage.get(user + '_gameTimer');
            if (timer) {
                clearInterval(timer);
                global.storage.delete(user + '_gameTimer');
            }

            // Kembalikan taruhan
            global.storage.set(user + '_balance', userBalance + userGame.bet);
            global.storage.set(user + '_game', {
                status: 'ready',
                timer: 10
            });

            const embed = {
                title: '❌ Taruhan Dibatalkan',
                description: 'Taruhan Anda dikembalikan ke saldo.',
                color: 0xffa500,
                fields: [
                    {
                        name: 'Taruhan Dikembalikan:',
                        value: '$' + userGame.bet,
                        inline: true
                    },
                    {
                        name: 'Saldo Baru:',
                        value: '$' + (userBalance + userGame.bet),
                        inline: true
                    }
                ]
            };

            return message.channel.send({ embeds: [embed] });
        }
    },

    {
        name: 'balance',
        description: 'Cek saldo',
        category: 'Game 🎮',
        aliases: ['bal', 'money'],
        execute: async (message, args) => {
            // In-memory storage
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const balance = global.storage.get(user + '_balance') || 100;
            const userGame = global.storage.get(user + '_game');

            const embed = {
                title: '💰 Saldo High/Low',
                description: 'Saldo Anda untuk game High/Low',
                color: 0x5865F2,
                fields: [
                    {
                        name: 'Saldo:',
                        value: '$' + balance,
                        inline: true
                    }
                ]
            };

            if (userGame && userGame.status === 'playing') {
                embed.fields.push({
                    name: 'Status Game:',
                    value: `Sedang bermain: **$${userGame.bet}**\nAngka sebelumnya: ${userGame.previousNumber}\nPilih: **${userGame.userChoice}**`
                });
            }

            return message.channel.send({ embeds: [embed] });
        }
    },

    {
        name: 'hlhelp',
        description: 'Tampilkan bantuan untuk game',
        aliases: ['hlcommands', 'highlowhelp'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            const embed = {
                title: '🎮 High/Low - Panduan Game',
                description: 'Game tebak angka yang lebih tinggi atau lebih rendah!',
                color: 0x5865F2,
                fields: [
                    {
                        name: '📌 Command Utama',
                        value: '`.highlow` atau `.hl` - Mulai game\n'
                              + '`.high <jumlah>` - Tebak angka lebih tinggi\n'
                              + '`.low <jumlah>` - Tebak angka lebih rendah'
                    },
                    {
                        name: '💰 Manajemen Saldo',
                        value: '`.balance` atau `.bal` - Cek saldo\n'
                              + '`.deposit <jumlah>` - Tambah saldo\n'
                              + '`.withdraw <jumlah>` - Tarik saldo'
                    },
                    {
                        name: '🎯 Aturan Game',
                        value: '• Minimal taruhan: $10\n'
                              + '• Maksimal taruhan: $500\n'
                              + '• Menang: dapat 2x taruhan\n'
                              + '• Kalah: taruhan hilang\n'
                              + '• Angka: 0-100'
                    },
                    {
                        name: '⚠️ Lainnya',
                        value: '`.cancel` - Batalkan permainan\n'
                              + '`.hlreset` - Reset saldo ke $100\n'
                              + '`.hltop` - Leaderboard'
                    }
                ],
                footer: { text: 'High/Low Bot' }
            };

            return message.channel.send({ embeds: [embed] });
        }
    },

    {
        name: 'hlreset',
        description: 'Reset saldo ke $100',
        aliases: ['hlrestart', 'resetbalance'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const currentBalance = global.storage.get(user + '_balance') || 100;

            // Hentikan timer jika ada
            const timer = global.storage.get(user + '_gameTimer');
            if (timer) {
                clearInterval(timer);
                global.storage.delete(user + '_gameTimer');
            }

            global.storage.set(user + '_balance', 100);
            global.storage.set(user + '_game', { status: 'ready', timer: 10 });

            const embed = {
                title: '🔄 Saldo Direset',
                description: 'Saldo High/Low Anda telah direset ke $100.',
                color: 0x00aaff,
                fields: [
                    { name: 'Saldo Lama:', value: '$' + currentBalance, inline: true },
                    { name: 'Saldo Baru:', value: '$100', inline: true }
                ]
            };

            return message.channel.send({ embeds: [embed] });
        }
    },

    {
        name: 'hltop',
        description: 'Lihat leaderboard',
        aliases: ['hllb', 'highlowleaderboard'],
        category: 'Game 🎮',
        execute: async (message, args) => {
            if (!global.storage) {
                global.storage = new Map();
            }

            const balances = [];
            for (const [key, value] of global.storage.entries()) {
                if (key.endsWith('_balance')) {
                    const userId = key.replace('_balance', '');
                    balances.push({ userId, balance: value });
                }
            }

            balances.sort((a, b) => b.balance - a.balance);
            const top10 = balances.slice(0, 10);

            let leaderboardText = '';
            if (top10.length === 0) {
                leaderboardText = 'Belum ada pemain!';
            } else {
                for (let i = 0; i < top10.length; i++) {
                    try {
                        const user = await message.client.users.fetch(top10[i].userId);
                        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
                        leaderboardText += `${medal} **${user.username}**: $${top10[i].balance}\n`;
                    } catch {
                        leaderboardText += `${i + 1}. <Unknown User>: $${top10[i].balance}\n`;
                    }
                }
            }

            const embed = {
                title: '🏆 High/Low Leaderboard',
                description: 'Top 10 pemain dengan saldo tertinggi!',
                color: 0xffd700,
                fields: [{ name: 'Pemain Teratas', value: leaderboardText || 'Belum ada pemain!' }],
                footer: { text: 'High/Low Bot' }
            };

            return message.channel.send({ embeds: [embed] });
        }
    },

    {
        name: 'withdraw',
        description: 'Tarik saldo ke saldo utama',
        usage: '.withdraw <amount>',
        category: 'Game 🎮',
        execute: async (message, args) => {
            // In-memory storage
            if (!global.storage) {
                global.storage = new Map();
            }

            const user = message.author.id;
            const balance = global.storage.get(user + '_balance') || 0;
            const withdrawAmount = parseInt(args[0]);

            if (!withdrawAmount || isNaN(withdrawAmount)) {
                return message.reply('❌ **Format salah!**\n\nGunakan: `.withdraw <jumlah>`\nContoh: `.withdraw 50`');
            }

            if (withdrawAmount < 10) {
                return message.reply('❌ **Minimal withdraw $10!**');
            }

            if (withdrawAmount > balance) {
                return message.reply('❌ **Saldo tidak cukup!**\nSaldo Anda: $' + balance);
            }

            global.storage.set(user + '_balance', balance - withdrawAmount);
            if (!global.storage.has(user + '_mainBalance')) {
                global.storage.set(user + '_mainBalance', 0);
            }
            global.storage.set(user + '_mainBalance', (global.storage.get(user + '_mainBalance') || 0) + withdrawAmount);

            const embed = {
                title: '✅ Withdraw Berhasil!',
                description: 'Saldo berhasil ditarik ke saldo utama.',
                color: 0x00ff88,
                fields: [
                    {
                        name: 'Ditarik:',
                        value: '$' + withdrawAmount,
                        inline: true
                    },
                    {
                        name: 'Saldo Game:',
                        value: '$' + (balance - withdrawAmount),
                        inline: true
                    },
                    {
                        name: 'Saldo Utama:',
                        value: '$' + ((global.storage.get(user + '_mainBalance') || 0) + withdrawAmount),
                        inline: true
                    }
                ]
            };

            return message.channel.send({ embeds: [embed] });
        }
    }
];

// Fungsi untuk menyelesaikan game
async function resolveGame(message, userId) {
    if (!global.storage) {
        global.storage = new Map();
    }

    const userGame = global.storage.get(userId + '_game');
    if (!userGame || userGame.status !== 'playing') {
        return;
    }

    const previousNumber = userGame.previousNumber;
    const nextNumber = Math.floor(Math.random() * 101);
    const userChoice = userGame.userChoice;
    const betAmount = userGame.bet;

    let won = false;
    if (userChoice === 'high' && nextNumber > previousNumber) {
        won = true;
    } else if (userChoice === 'low' && nextNumber < previousNumber) {
        won = true;
    } else if (nextNumber === previousNumber) {
        // Seri - kembalikan taruhan
        const currentBalance = global.storage.get(userId + '_balance') || 100;
        global.storage.set(userId + '_balance', currentBalance + betAmount);
        
        const embed = {
            title: '🤝 Seri!',
            description: 'Angka sama, taruhan dikembalikan.',
            color: 0xffff00,
            fields: [
                { name: 'Angka Sebelumnya:', value: previousNumber.toString(), inline: true },
                { name: 'Angka Berikutnya:', value: nextNumber.toString(), inline: true },
                { name: 'Taruhan Dikembalikan:', value: '$' + betAmount, inline: true }
            ],
            footer: { text: 'Ketik .highlow untuk main lagi!' }
        };

        global.storage.set(userId + '_game', { status: 'ready', timer: 10 });
        global.storage.delete(userId + '_gameTimer');
        
        // Simpan angka berikutnya sebagai angka terakhir untuk game berikutnya
        global.storage.set(userId + '_lastNumber', nextNumber);
        
        return message.channel.send({ embeds: [embed] });
    }

    const currentBalance = global.storage.get(userId + '_balance') || 100;

    if (won) {
        const newBalance = currentBalance + (betAmount * 2);
        global.storage.set(userId + '_balance', newBalance);

        const embed = {
            title: '🎉 MENANG!',
            description: 'Selamat! Tebakan Anda benar!',
            color: 0x00ff00,
            fields: [
                { name: 'Angka Sebelumnya:', value: previousNumber.toString(), inline: true },
                { name: 'Angka Berikutnya:', value: nextNumber.toString(), inline: true },
                { name: 'Pilihan Anda:', value: userChoice.toUpperCase(), inline: true },
                { name: 'Taruhan:', value: '$' + betAmount, inline: true },
                { name: 'Kemenangan:', value: '$' + (betAmount * 2), inline: true },
                { name: 'Saldo Baru:', value: '$' + newBalance, inline: true }
            ],
            footer: { text: 'Ketik .highlow untuk main lagi!' }
        };

        message.channel.send({ embeds: [embed] });
    } else {
        const embed = {
            title: '😢 KALAH!',
            description: 'Tebakan Anda salah. Coba lagi ya!',
            color: 0xff0000,
            fields: [
                { name: 'Angka Sebelumnya:', value: previousNumber.toString(), inline: true },
                { name: 'Angka Berikutnya:', value: nextNumber.toString(), inline: true },
                { name: 'Pilihan Anda:', value: userChoice.toUpperCase(), inline: true },
                { name: 'Taruhan Hilang:', value: '$' + betAmount, inline: true },
                { name: 'Saldo Tersisa:', value: '$' + currentBalance, inline: true }
            ],
            footer: { text: 'Ketik .highlow untuk main lagi!' }
        };

        message.channel.send({ embeds: [embed] });
    }

    global.storage.set(userId + '_game', { status: 'ready', timer: 10 });
    global.storage.delete(userId + '_gameTimer');
    
    // Simpan angka berikutnya sebagai angka terakhir untuk game berikutnya
    global.storage.set(userId + '_lastNumber', nextNumber);
}