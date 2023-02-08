const express = require("express");
const router = express.Router();
const sendEmail = require("../../controllers/EmailControllers/chatbotControllers");

const fs = require("fs");
const path = require("path");

router.post("/email", async (req, res) => {
  try {
    sendEmail(req.body.email, req.body.subject, req.body.text);
    res.send("Email enviado");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = router;
