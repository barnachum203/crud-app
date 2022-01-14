var express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const validateMiddleWare = require('../../middleware/validator');
const { registerJoi, loginJoi } = require('../../model/User');
const { requireUser } = require('../../middleware/auth');

router.get('/',requireUser, userController.getAll);
router.post('/register', [validateMiddleWare(registerJoi)],userController.register);
router.put('/update/:id', requireUser, userController.update);
router.post('/login',[validateMiddleWare(loginJoi)], userController.login);
router.delete('/delete/:id',requireUser, userController.deleteUser);
router.get('/user/:id', requireUser,userController.getUserById);

module.exports = router;