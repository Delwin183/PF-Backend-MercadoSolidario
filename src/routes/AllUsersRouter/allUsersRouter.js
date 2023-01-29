const express = require("express");
const {
  allUsersTypes,
} = require("../../controllers/AllUsersControllers/allUsersControllers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await allUsersTypes();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
