var express = require('express');

const router = express.Router();
const petController = require('../controllers/petController');
const joiMiddleware = require('../middleware/joiMiddleware');
const { requireUser } = require('../middleware/auth');
const { createSchema, updateSchema } = require('../middleware/petValidators');

router.get('/',requireUser, petController.getAll);
router.get('/under3',requireUser, petController.getAllUnder3);
router.post('/create', [joiMiddleware(createSchema),requireUser],petController.create);
router.put('/update/:id', [joiMiddleware(updateSchema),requireUser], petController.update);
router.delete('/delete/:id',requireUser, petController.deletePet);
router.get('/pet/:id', requireUser,petController.getPetById);

module.exports = router;