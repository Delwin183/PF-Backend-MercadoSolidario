const express = require("express");
const { loginOfAUser, accessAdmin } = require("../../controllers/Auth/loginController");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const login = await loginOfAUser(req.body);

        res.status(200).send(login);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/admin", async (req, res) => {
    try {
        const acceso = await accessAdmin(req.body);
        res. status(200).send(`Acceso Admin correcto el ${acceso.date_login}`);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = router
