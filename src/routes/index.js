const { Router } = require("express");
const ongRouter = require("./ONGs/ongRouter");
const postsRouter = require("./PostsONG/postsRouter");
const emailRouter = require("./PostsEmail/emailRouter");

const router = Router();

// router.use('/volunteers')
router.use("/ongs", ongRouter);
// router.use('/companies')
router.use("/posts", postsRouter);
router.use("/mailer", emailRouter);

module.exports = router;
