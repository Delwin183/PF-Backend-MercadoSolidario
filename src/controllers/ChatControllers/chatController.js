const prisma =require("../../db");
validationChat = require("./validationChat")

module.exports = {
    getChats: async function () {
        const chats = await prisma.chatbot.findMany();
        return chats;
    },
    createChat: async function(body) {
        const validation = validationChat(body);
        
        if (validation.containErrors) {
            throw new Error(JSON.stringify(validation));
        }

        const result = await prisma.chatbot.create({
            data: body
        });
        return {...result, ...validation};

    }
}