const router = require('express').Router();

const calcController = require('../controllers/calcController');

router.post('/calc/create', calcController.createCalc);


module.exports = router;