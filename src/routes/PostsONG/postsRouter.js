const express = require('express');
const router = express.Router();

const {getPosts, createPost} = require('../../controllers/PostsControllers/postsController')

router.get("/posts", async (req, res) => {
    const posts = await getPosts(req.body);
    res.status(200).send(posts);
})

router.post("/newpost", async (req, res) => {
    const newPost = await createPost(req.body);
    res.status(200).send(newPost)
})

module.exports = router;
