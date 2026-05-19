<div align="center">

# 🤖 Zyubot

### A Powerful Discord Bot with Utility & Entertainment Features

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![discord.js](https://img.shields.io/badge/discord.js-v14-blue?style=for-the-badge&logo=discord)](https://discord.js.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge)](LICENSE)

[🚀 Quick Start](#-quick-start) • [📖 Commands](#-commands) • [🔧 Config](#-configuration) • [🤝 Contributing](#-contributing)

</div>

---

## 📌 About

Zyubot adalah **Discord Bot modern** yang dibuat dengan **Node.js** dan **discord.js**. Bot ini dirancang dengan fokus pada:

- 🏗️ **Clean Code** - Mudah dipahami dan di-maintain
- ⚡ **Performance** - Lightweight dan cepat
- 🔒 **Security** - Environment variables untuk sensistive data  
- 📚 **Documentation** - Lengkap dan mudah diikuti

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ⚡ Lightweight | Fast command execution |
| 🔄 Auto Load | Commands auto-load dari folder |
| 🛡️ Error Handling | Comprehensive error catching |
| 🎨 Rich Embeds | Beautiful formatted responses |
| 🔐 Secure Config | Environment variables support |
| 🌏 Timezone Support | Built-in Asia/Jakarta timezone |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** (included with Node.js)
- **Discord Bot Token** ([Create di sini](https://discord.com/developers/applications))

### Installation

```bash
# 1. Clone repository
git clone https://github.com/muaafi777-arch/Bot-command-discord.git
cd Bot-command-discord

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env dengan bot token Anda

# 4. Run bot
node main.js
```

✅ Sukses jika muncul: `Bot Zyubot sudah aktif`

---

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Discord Bot Token
TOKEN_DC=YOUR_BOT_TOKEN_HERE

# Command Prefix
PREFIX=.
```

### Custom Prefix

```env
PREFIX=!       # Gunakan !command
PREFIX=-       # Gunakan -command  
PREFIX=>>      # Gunakan >>command
```

> ⚠️ **Security:** File `.env` tidak boleh di-commit (sudah di `.gitignore`)

---

## 🎮 Commands

### System Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `.ping` | Check bot latency | `.ping` |
| `.help` | Show all commands | `.help` |
| `.info` | Bot information | `.info` |
| `.waktu` | Current time (Jakarta) | `.waktu` |

### Utility Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `.userinfo` | User profile info | `.userinfo [@User]` |
| `.hitung` | Calculator (4 ops) | `.hitung <op> <num1> <num2>` |

---

### Command Usage

#### 🧮 .hitung - Calculator

Operasi mathematika dengan 2 angka.

**Available Operations:**
- `tambah` - Addition (+)
- `kurang` - Subtraction (-)
- `kali` - Multiplication (×)
- `bagi` - Division (÷)

**Examples:**
```
.hitung tambah 10 5      → 15
.hitung kurang 20 8      → 12
.hitung kali 7 6         → 42
.hitung bagi 100 4       → 25
```

#### 👤 .userinfo - User Profile

Tampilkan informasi detail user/member dengan embed yang cantik.

**Shows:**
- Username & Tag
- User ID
- Account created date
- Server join date
- User avatar

**Examples:**
```
.userinfo              → Your profile
.userinfo @Username   → Other user's profile
```

---

## 📁 Project Structure

```
Bot-command-discord/
├── main.js              ← Bot entry point
├── package.json         ← Dependencies
├── .env                 ← Config (DO NOT COMMIT)
├── .env.example         ← Config template
├── .gitignore           ← Git rules
├── README.md            ← Documentation
└── commands/
    ├── sistem.js        ← System commands
    ├── perhitungan.js   ← Calculator (.hitung)
    └── memberData.js    ← User info (.userinfo)
```

---

## ➕ Creating New Commands

Commands auto-load dari folder `commands/`. No need to edit `main.js`!

### Command Template

```javascript
module.exports = [
    {
        name: 'commandname',         // lowercase
        description: 'Command desc',
        execute(message, args) {
            // Your code here
            message.reply('Hello!');
        }
    }
];
```

### Example: Dice Roller

**File:** `commands/game.js`

```javascript
module.exports = [
    {
        name: 'dadu',
        description: 'Roll dice (1-6)',
        execute(message) {
            const result = Math.floor(Math.random() * 6) + 1;
            message.reply(`🎲 Dice: **${result}**`);
        }
    }
];
```

**Usage:** `.dadu`

---

## 🐛 Troubleshooting

### Bot Offline / Not Responding

**Check:**
- [ ] Bot token di `.env` correct
- [ ] Internet connection OK
- [ ] Token valid di Discord Developer Portal
- [ ] Restart bot: `Ctrl+C` → `node main.js`

### Command Not Working

**Check:**
- [ ] Command name lowercase (`.userinfo` not `.userInfo`)
- [ ] Restart bot after adding command
- [ ] Check console for errors
- [ ] Bot has message permissions

### Module Error

```
Error: Cannot find module 'discord.js'
```

**Solution:**
```bash
npm install
```

### Setup Discord Developer Portal

1. Go to https://discord.com/developers/applications
2. Create or select application
3. Copy **Token** → paste to `.env` as `TOKEN_DC`
4. Enable Required Intents:
   - Guilds
   - Guild Members
   - Guild Messages
   - Message Content
5. Set OAuth2 Permissions:
   - Send Messages
   - Read Messages/View Channels
   - Read Message History

---

## 💻 Development

### Auto-reload with Nodemon

```bash
npm install -D nodemon
nodemon main.js
```

### Code Quality

```bash
npm run lint
```

### Best Practices

- Always use `.env` for sensitive data
- Never commit `.env` to Git
- Use lowercase for command names
- Add error handling (try-catch)
- Use embeds for responses
- Validate user input
- Add comments for complex code

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Commands | 6 |
| Language | JavaScript |
| Runtime | Node.js |
| Library | discord.js v14 |
| Status | Active |

**Quality Rating: 8.5/10**

---

## 🤝 Contributing

Contributions welcome! 

**Steps:**
1. Fork repository
2. Create feature branch (`git checkout -b feature/new-command`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/new-command`)
5. Open Pull Request

**Guidelines:**
- Follow existing code style
- Add comments for complex logic
- Test thoroughly
- Update README if needed

---

## 📄 License

ISC License - See `package.json`

---

## 🔗 Resources

- [discord.js Documentation](https://discord.js.org/)
- [Discord Developers Portal](https://discord.com/developers)
- [Node.js Documentation](https://nodejs.org/)

---

<div align="center">

Made with ❤️ by Zythetic

[⬆ Back to Top](#-zyubot)

</div>
