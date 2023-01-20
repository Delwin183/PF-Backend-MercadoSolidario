const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
} = require("../../controllers/PostsControllers/postsController");

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts(req.body);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/newpost", async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
