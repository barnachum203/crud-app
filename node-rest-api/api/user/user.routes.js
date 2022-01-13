var express = require('express');

// var router = express.Router();
const router = express.Router();
const userController = require('./userController');
const validateMiddleWare = require('../../middleware/validator');
const { joiValidate } = require('../../model/User');
const { requireUser } = require('../../middleware/auth');

router.get('/',requireUser, userController.getAll);
router.post('/register', [validateMiddleWare(joiValidate)],userController.register);
router.put('/update/:id', requireUser, userController.update);
router.post('/login', userController.login);
router.delete('/delete/:id',requireUser, userController.deleteUser);
router.get('/user/:id', requireUser,userController.getUserById);

module.exports = router;