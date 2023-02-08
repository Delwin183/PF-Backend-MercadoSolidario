const { Router } = require("express");
const ongRouter = require("./ONGs/ongRouter");
const postsRouter = require("./PostsONG/postsRouter");
const emailRouter = require("./PostsEmail/emailRouter");
const companyRouter = require("./Companies/companiesRouter");
const usersRouter = require("./Users/usersRouter");
const confirmedRouter = require("./Confirmed/confirmedRouter");
const loginRouter = require("./AuthRoutes/loginRouter");
const allUsersrouter = require("./AllUsersRouter/allUsersRouter");
const reviewRouter = require("./Reviews/reviewsRouter");
const chatRouter = require("./Chat/chatRouter");
const chatbotRouter = require("./PostsEmail/chatbotRouter");

const router = Router();

router.use("/ong", ongRouter);
router.use("/posts", postsRouter);
router.use("/mailer", emailRouter);
router.use("/chatbot", chatbotRouter);
router.use("/company", companyRouter);
router.use("/user", usersRouter);
router.use("/confirmed", confirmedRouter);
router.use("/login", loginRouter);
router.use("/allusers", allUsersrouter);
router.use("/reviews", reviewRouter);
router.use("/chat", chatRouter);

//quiero que ande la ruta
module.exports = router;
