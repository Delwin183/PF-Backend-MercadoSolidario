const express = require('express');
const router = express.Router();

const {signUp, getUsers} = require('../../controllers/UsersControllers/usersControllers')

router.post("/newuser", async (req, res) => {
    const newUser = await signUp(req.body);
    res.status(200).send(newUser);
})

router.get("/getusers", async (req, res) => {
    const allUsers = await getUsers()
    res.status(200).send(allUsers);
})

module.exports = router;