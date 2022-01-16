var express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const errorMiddleware = require('../middleware/errorMiddleware');
const { registerSchema, loginSchema } = require('../middleware/errorMiddleware');
const { requireUser } = require('../middleware/auth');

router.get('/',requireUser, userController.getAll);
router.post('/register', [errorMiddleware(registerSchema)],userController.register);
router.put('/update/:id', requireUser, userController.update);
router.post('/login',[errorMiddleware(loginSchema)], userController.login);
router.delete('/delete/:id',requireUser, userController.deleteUser);
router.get('/user/:id', requireUser,userController.getUserById);

module.exports = router;