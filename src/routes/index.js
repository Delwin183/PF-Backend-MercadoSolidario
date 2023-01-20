const {Router} = require('express');
const ongRouter = require('./ONGs/ongRouter');
const postsRouter = require('./PostsONG/postsRouter');

const router = Router();

// router.use('/volunteers')
router.use('/ongs', ongRouter)
// router.use('/companies')
router.use('/posts', postsRouter)

module.exports = router;
