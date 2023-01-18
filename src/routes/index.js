const {Router} = require('express');
const ongRouter = require('./ONGs/ongRouter');

const router = Router();

// router.use('/volunteers')
router.use('/ongs', ongRouter)
// router.use('/companies')

module.exports = router;
