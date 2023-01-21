const express = require("express");
const router = express.Router();

const {
  signUp,
  getOngs,
  getPosts,
  createPost,
} = require("../../controllers/OngControllers/ongControllers");

router.post("/newong", async (req, res) => {
  try {
    const newOng = await signUp(req.body);
    res.status(200).send(newOng);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ongs = await getOngs();
    res.status(200).send(ongs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
