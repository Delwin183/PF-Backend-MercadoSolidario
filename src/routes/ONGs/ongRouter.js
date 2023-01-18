const express = require('express');
const router = express.Router();

const {signUp, getOngs, getPosts, createPost} = require('../../controllers/OngControllers/ongControllers')

router.post("/newong", async (req, res) => {
    const newOng = await signUp(req.body);
    res.status(200).send(newOng);
})

router.get("/posts", async (req, res) => {
    const posts = await getPosts(req.body);
    res.status(200).send(posts);
})

router.post("/newpost", async (req, res) => {
    const newPost = await createPost(req.body);
    res.status(200).send(newPost)
})

router.get("/getong", async (req, res) => {
    const ongs = await getOngs()
    res.status(200).send(ongs);
})

module.exports = router;
