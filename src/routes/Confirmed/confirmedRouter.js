const express = require('express');
const router = express.Router();

const {registerInPost, getConfirmed } = require('../../controllers/ConfirmedControllers/ConfirmedControllers')

router.post("/newconfirmed", async (req, res) => {
    try {
      const newConfirmed = await registerInPost(req.body);
      res.status(200).send(newConfirmed);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const allConfirmed = await getConfirmed();
      res.status(200).send(allConfirmed);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;