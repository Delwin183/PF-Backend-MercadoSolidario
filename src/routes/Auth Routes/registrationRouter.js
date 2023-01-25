const express = require("express");
const router = express.Router();

const {
    registerOfAUser,
} = require("../../controllers/Auth/registrationController");


router.post("/", async (req, res) => {
    try {
        const register = await registerOfAUser(req.body);
        res.status(200).send(register);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router
