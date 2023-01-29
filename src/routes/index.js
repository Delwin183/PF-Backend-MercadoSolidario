const { Router } = require("express");
const ongRouter = require("./ONGs/ongRouter");
const postsRouter = require("./PostsONG/postsRouter");
const emailRouter = require("./PostsEmail/emailRouter");
const companyRouter = require("./Companies/companiesRouter");
const usersRouter = require("./Users/usersRouter");
const confirmedRouter = require("./Confirmed/confirmedRouter");
const loginRouter = require("./AuthRoutes/loginRouter");
// const allUsersrouter = require("./AllUserTypesRoutes/AllUserTypesRoute");

const router = Router();

router.use("/ong", ongRouter);
router.use("/posts", postsRouter);
router.use("/mailer", emailRouter);
router.use("/company", companyRouter);
router.use("/user", usersRouter);
router.use("/confirmed", confirmedRouter);
router.use("/login", loginRouter);
// router.use("/allusers", allUsersrouter);

module.exports = router;
