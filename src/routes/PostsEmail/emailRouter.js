const express = require("express");
const router = express.Router();
const postEmail = require("../../controllers/EmailControllers/emailControllers");

router.post("/email", async (req, res) => {
  try {
    const sendEmail = await postEmail(req.body);
    res.status(200).send(sendEmail);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
