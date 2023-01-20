const express = require('express');
const router = express.Router();

const {getPosts, createPost, getPostsForId} = require('../../controllers/PostsControllers/postsController')

router.get("/posts", async (req, res) => {
    const posts = await getPosts(req.body);
    res.status(200).send(posts);
})

router.get("/:id", async (req, res) => {
    try {
        const post = await getPostsForId(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/newpost", async (req, res) => {
    const newPost = await createPost(req.body);
    res.status(200).send(newPost)
})

module.exports = router;
