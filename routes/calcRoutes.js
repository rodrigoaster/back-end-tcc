const router = require('express').Router();

const calcController = require('../controllers/calcController');

const verifyToken = require("../helpers/verifyToken");

router.post('/calc/create', calcController.createCalc);
router.get('/calcs', verifyToken, calcController.checkCalc);


module.exports = router;