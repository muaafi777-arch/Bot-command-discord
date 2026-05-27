const Ollama_URL = "";
const Model_Name = "";

module.exports = [
    {
        name: 'chat',
        description: 'Berbicara dengan Bot',
        category: 'Chatbot 💬',
        execute(message, args){
            message.reply("Masih dalam tahap pengembangan")
        }
    },
]