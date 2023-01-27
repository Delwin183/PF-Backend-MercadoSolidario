const express = require("express");
const router = express.Router();

const {
  signUp,
  getCompanies,
  logicDeleteCompany,
  getDeleteCompanies,
  UpdateCompanies,
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

router.put("/:id", async (req, res) => {
  try {
    const result = await logicDeleteCompany(req.params.id);
    res
      .status(200)
      .send(
        `La Empresa denominada ${result.companyName} se removió correctamente`
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/deleted", async (req, res) => {
  try {
    const result = await getDeleteCompanies();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const result = await UpdateCompanies(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
