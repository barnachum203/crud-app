var express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const joiMiddleware = require('../middleware/joiMiddleware');
const { registerSchema, loginSchema } = require('../middleware/userValidators');
const { requireUser } = require('../middleware/auth');

router.get('/',requireUser, userController.getAll);
router.post('/register', [joiMiddleware(registerSchema)],userController.register);
router.put('/update/:id', requireUser, userController.update);
router.post('/login',[joiMiddleware(loginSchema)], userController.login);
router.delete('/delete/:id',requireUser, userController.deleteUser);
router.get('/user/:id', requireUser,userController.getUserById);

module.exports = router;