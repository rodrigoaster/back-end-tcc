const router = require('express').Router();

const userController = require('../controllers/userController');

const verifyToken = require("../helpers/verifyToken");

router.post('/user/create', userController.createUser);
router.post('/user/login', userController.loginUser);
router.get('/users', userController.checkUser);
router.get('/users/:user_Id', userController.checkUserId);
router.patch('/user/edit/:user_Id', verifyToken, userController.updateUser);
router.delete('/user/delete', verifyToken, userController.deleteUser);

module.exports = router;