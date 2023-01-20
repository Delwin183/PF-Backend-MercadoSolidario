const { Router } = require("express");
const ongRouter = require("./ONGs/ongRouter");
const postsRouter = require("./PostsONG/postsRouter");
const emailRouter = require("./PostsEmail/emailRouter");
const companyRouter = require('./Companies/companiesRouter')
const usersRouter = require('./Users/usersRouter')

const router = Router();

router.use("/ongs", ongRouter);
router.use("/posts", postsRouter);
router.use("/mailer", emailRouter);
router.use('/companies', companyRouter)
router.use('/users', usersRouter)

module.exports = router;
