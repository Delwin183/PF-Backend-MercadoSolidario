const express = require("express");
const router = express.Router();

const {
  signUp,
  getCompanies,
} = require("../../controllers/CompaniesControllers/CompaniesControllers");

router.post("/newcompany", async (req, res) => {
  try {
    const newCompany = await signUp(req.body);
    res.status(200).send(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCompanies = await getCompanies();
    res.status(200).send(allCompanies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
