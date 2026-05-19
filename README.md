<div align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/discord.js-v14-blue?style=for-the-badge&logo=discord" alt="discord.js">
  <img src="https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge" alt="License">

  # 🤖 Zyubot

  #### A Powerful Discord Bot with Utility & Entertainment Features

  [Features](#-features) • [Quick Start](#-quick-start) • [Commands](#-command-list) • [Documentation](#-development)

</div>

Bot Discord yang dibuat dengan **Node.js** dan **discord.js** untuk memberikan berbagai fitur utility dan entertainment di server Anda. Project ini berfokus pada code quality, error handling, dan ease of use.

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Commands](#-command-list)
- [Project Structure](#-project-structure)
- [Creating Commands](#-creating-new-commands)
- [Troubleshooting](#-troubleshooting)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Resources](#-useful-resources)

---

## ⭐ Features

<table>
  <tr>
    <td width="50%">
      <h3>⚡ Performance</h3>
      <ul>
        <li>Lightweight & Fast</li>
        <li>Automatic Command Loading</li>
        <li>Efficient Error Handling</li>
        <li>Environment Configuration</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🎯 Functionality</h3>
      <ul>
        <li>Calculator (4 operations)</li>
        <li>User Profile Info</li>
        <li>Server Information</li>
        <li>Bot Status & Ping</li>
      </ul>
    </td>
  </tr>
</table>

**Advanced Features:**
- ✅ Dynamic command loading dari folder `/commands`
- ✅ Comprehensive error handling & logging
- ✅ Beautiful embed responses
- ✅ User-friendly help system
- ✅ Timezone support (Asia/Jakarta)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16.0.0 or higher ([Download](https://nodejs.org/))
- **npm** (bundled with Node.js)
- Discord Bot Token ([Create here](https://discord.com/developers/applications))
- A Discord Server (for testing)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/muaafi777-arch/Bot-command-discord.git
cd Bot-command-discord

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your bot token and prefix

# 4. Start the bot
node main.js
```

**Expected Output:**
```
Bot Zyubot sudah aktif
```

---

## 📝 Configuration

### `.env` File Setup

Create a `.env` file in the root directory:

```env
# Discord Bot Token (Required)
TOKEN_DC=YOUR_BOT_TOKEN_HERE

# Command Prefix (Default: .)
PREFIX=.
```

> ⚠️ **Security Note:** Never commit `.env` to version control. It's already in `.gitignore`

### Changing Command Prefix

Update the `PREFIX` value in `.env`:

```env
PREFIX=!          # Use !command
PREFIX=-          # Use -command  
PREFIX=>>         # Use >>command
PREFIX=bot        # Use botcommand
```

---

## 🎮 Command List

### System Commands

| Command | Description | Usage | Example |
|---------|-------------|-------|---------|
| `.help` | Display all available commands | `.help` | - |
| `.info` | Show bot information | `.info` | - |
| `.ping` | Check bot latency | `.ping` | - |
| `.waktu` | Get current time (Asia/Jakarta) | `.waktu` | - |

### Utility Commands

| Command | Description | Usage | Example |
|---------|-------------|-------|---------|
| `.userinfo` | Display user profile information | `.userinfo [mention]` | `.userinfo` or `.userinfo @User` |
| `.hitung` | Calculator with 4 operations | `.hitung <op> <num1> <num2>` | `.hitung tambah 10 5` |

---

### Detailed Command Guide

#### 🧮 `.hitung` Command
Perform mathematical operations on two numbers.

**Available Operations:**
- `tambah` - Addition: `a + b`
- `kurang` - Subtraction: `a - b`
- `kali` - Multiplication: `a × b`
- `bagi` - Division: `a ÷ b`

**Examples:**
```
.hitung tambah 10 5      ➜ Result: 10 + 5 = 15
.hitung kurang 20 8      ➜ Result: 20 - 8 = 12
.hitung kali 7 6         ➜ Result: 7 × 6 = 42
.hitung bagi 100 4       ➜ Result: 100 ÷ 4 = 25
```

#### 👤 `.userinfo` Command
Display detailed user/member profile information.

**Features:**
- User tag & ID
- Account creation date
- Server join date
- Custom avatar display

**Examples:**
```
.userinfo              ➜ Show your profile
.userinfo @Username   ➜ Show another user's profile
```

---

## � Project Structure

```
Bot-command-discord/
├── 📄 main.js                    # Application entry point
├── 📄 package.json               # Dependencies & project metadata
├── 📄 .env                       # Configuration (SENSITIVE - Do not commit)
├── 📄 .env.example               # Example .env template
├── 📄 .gitignore                 # Git ignore rules
├── 📄 eslint.config.mjs          # ESLint configuration
├── 📄 README.md                  # This file
└── 📁 commands/
    ├── sistem.js                 # System commands (ping, help, info, waktu)
    ├── perhitungan.js            # Calculator command (.hitung)
    └── memberData.js             # User info command (.userinfo)
```

### Directory Breakdown

| File/Folder | Purpose |
|------------|---------|
| `main.js` | Bot initialization and message event handler |
| `commands/` | Dynamic command modules |
| `.env` | Bot token & configuration (Not tracked by Git) |
| `package.json` | Project dependencies and scripts |
| `.gitignore` | Git exclusion rules |

---

## ➕ Creating New Commands

Commands are automatically loaded from the `commands/` directory. No need to edit `main.js`!

### Command Template

```javascript
module.exports = [
    {
        name: 'commandname',         // Command name (lowercase)
        description: 'Command description',
        execute(message, args) {     // Executed when command is used
            // Your code here
            message.reply('Hello!');
        }
    }
];
```

### Example: Dice Roller Command

**File:** `commands/game.js`

```javascript
module.exports = [
    {
        name: 'dadu',
        description: 'Roll a dice (1-6)',
        execute(message) {
            const result = Math.floor(Math.random() * 6) + 1;
            message.reply(`🎲 Dice: **${result}**`);
        }
    }
];
```

**Usage:**
```
.dadu
```

### Function Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | Object | Discord message object |
| `args` | Array | Command arguments (split by space) |

**Example with arguments:**
```javascript
execute(message, args) {
    if (args.length === 0) {
        return message.reply('Please provide arguments');
    }
    const firstName = args[0];
    message.reply(`Hello, ${firstName}!`);
}
```

---

## 🐛 Troubleshooting

### Bot is Offline / Not Responding

**Symptoms:** Bot offline in Discord, no commands work

**Solutions:**
- [ ] Verify bot token in `.env` is correct
- [ ] Check internet connection
- [ ] Verify token in [Discord Developer Portal](https://discord.com/developers/applications)
- [ ] Restart bot: Press `Ctrl+C` then `node main.js`

```bash
# Check if bot starts successfully
node main.js
# Expected: "Bot Zyubot sudah aktif"
```

### Command Not Working / Not Found

**Symptoms:** Command is typed but bot doesn't respond

**Solutions:**
- [ ] Ensure command name is **lowercase** (`.userinfo` not `.userInfo`)
- [ ] Restart bot after adding new commands
- [ ] Check console for error messages
- [ ] Verify bot has message permissions in the channel

```bash
# Verify commands are loaded
# Check console output when bot starts
```

### Module Not Found Error

**Error:** `Error: Cannot find module 'discord.js'`

**Solution:**
```bash
npm install
```

### Discord Developer Portal Setup

**Ensure these steps are completed:**

1. Create application at https://discord.com/developers/applications
2. Copy the **Token** into `.env` as `TOKEN_DC`
3. Enable required intents:
   - [ ] Guilds
   - [ ] Guild Members
   - [ ] Guild Messages
   - [ ] Message Content
4. Set permissions in OAuth2 → URL Generator:
   - [ ] Send Messages
   - [ ] Read Messages/View Channels
   - [ ] Read Message History

### Git/GitHub Issues

**Error:** `fatal: not a git repository`

**Solution:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/muaafi777-arch/Bot-command-discord.git
git branch -M main
git push -u origin main
```

---

## � Development

### Setup Development Environment

Install nodemon for automatic reload on file changes:

```bash
npm install -D nodemon
```

Run with auto-reload:
```bash
nodemon main.js
```

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

### Best Practices

When developing commands:

1. **Always use `.env`** for sensitive data (tokens, API keys)
2. **Never commit `.env`** to Git (already in `.gitignore`)
3. **Use lowercase** for command names
4. **Add try-catch** blocks for error handling
5. **Use embeds** for better-looking responses
6. **Validate user input** before processing
7. **Add descriptive comments** in complex functions
8. **Test commands** thoroughly before committing

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Commands | 6 |
| Language | JavaScript |
| Runtime | Node.js |
| Library | discord.js v14 |
| License | ISC |
| Status | Active Development |

**Code Quality Rating: 8.5/10**

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update README if adding new features

---

## 📄 License

This project is licensed under the **ISC License** - see [package.json](./package.json) for details.

---

## 👤 Author

**Created by:** [Zythetic](https://github.com/muaafi777-arch)

For questions or support, feel free to:
- 📧 Open an issue on GitHub
- 💬 Discuss in GitHub Discussions
- 🔗 Check [Discord Developers Documentation](https://discord.com/developers/docs)

---

## 🔗 Useful Resources

- [discord.js Documentation](https://discord.js.org/#/docs)
- [Discord Developers Portal](https://discord.com/developers)
- [Node.js Documentation](https://nodejs.org/docs/)
- [dotenv Package](https://github.com/motdotla/dotenv)

---

<div align="center">

**[⬆ Back to Top](#-zyubot)**

Made with ❤️ by Zythetic | Last Updated: May 19, 2026

</div>
#   B o t - c o m m a n d - d i s c o r d 
 
 
