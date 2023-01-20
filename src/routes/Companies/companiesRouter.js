const express = require('express');
const router = express.Router();

const {signUp, getCompanies} = require('../../controllers/CompaniesControllers/CompaniesControllers') 

router.post("/newcompany", async (req, res) => {
    const newCompany = await signUp(req.body);
    res.status(200).send(newCompany);
})

router.get("/getCompanies", async (req, res) => {
    const allCompanies = await getCompanies()
    res.status(200).send(allCompanies);
})

module.exports = router;