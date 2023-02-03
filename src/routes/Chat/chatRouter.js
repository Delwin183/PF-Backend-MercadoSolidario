const express = require("express");
const router = express.Router()

const {getChats, createChat} = require("../../controllers/ChatControllers/chatController");

router.get("/", async (req, res) => {
    try {
        const chats = await getChats();
        res.status(200).send(chats);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post("/newchat", async (req, res) => {
    try {
        const newChat = await createChat(req.body);
        res.status(200).send(newChat);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;