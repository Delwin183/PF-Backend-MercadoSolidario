const express = require("express");
const router = express.Router();
const sendEmail = require("../../controllers/EmailControllers/emailControllers");

const fs = require("fs");
const path = require("path");

router.post("/email", async (req, res) => {
  try {
    const email = req.body.email;
    const filePath = path.join(__dirname, "./templateEmail.html");
    const html = fs.readFileSync(filePath, "utf8");
    sendEmail(email, html);
    res.status(200).send("Email enviado");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
