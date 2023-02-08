const express = require("express");
const { loginOfAUser } = require("../../controllers/Auth/loginController");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const login = await loginOfAUser(req.body);
        res.status(200).send(login);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router
