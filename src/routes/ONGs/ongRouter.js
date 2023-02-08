const express = require("express");
const router = express.Router();

const {
  signUp,
  getOngs,
  logicDeleteONG,
  getDeleteONGs,
  UpdateOng,
  getOngById,
} = require("../../controllers/OngControllers/ongControllers");

router.post("/newong", async (req, res) => {
  try {
    const newOng = await signUp(req.body);
    res.status(200).send(newOng);
  } catch (error) {
    res.status(400).json(JSON.parse(error.message));
  }
});

router.get("/", async (req, res) => {
  try {
    const ongs = await getOngs();
    res.status(200).send(ongs);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/deleted", async (req, res) => {
  try {
    const result = await getDeleteONGs();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ong = await getOngById(req.params.id);
    res.status(200).send(ong);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const result = await UpdateOng(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await logicDeleteONG(req.params.id, req.body);
    console.log(result.isActive)
    res
      .status(200)
      .send(`La ONG denominada ${result.ongName} se puso en ${result.isActive.toString().toUpperCase()} correctamente`);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


module.exports = router;
