const { prisma } = require(".prisma/client");
const express = require("express");
const router = express.Router();

const {
  signUp,
  getUsers,
  getUserById,
  logicDeleteUser,
  getDeleteUser,
  UpdateUser,
} = require("../../controllers/UsersControllers/usersControllers");

router.post("/newuser", async (req, res) => {
  try {
    const newUser = await signUp(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(JSON.parse(error.message));
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/deleted", async (req, res) => {
  try {
    const result = await getDeleteUser();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getUserById(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await logicDeleteUser(req.params.id);
    res
      .status(200)
      .send(
        `El usuario ${result.name} ${result.lastName} se removió correctamente`
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const result = await UpdateUser(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
