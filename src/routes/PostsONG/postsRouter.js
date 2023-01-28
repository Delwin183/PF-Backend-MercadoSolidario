const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  getPostsForId,
  logicDeletePost,
  UpdatePosts,
} = require("../../controllers/PostsControllers/postsController");

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts(req.body);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await getPostsForId(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
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

router.put("/:id", async (req, res) => {
  try {
    const result = await logicDeletePost(req.params.id);
    res.status(200).send(`El Post ${result.title} se removió correctamente`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const result = await UpdatePosts(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
