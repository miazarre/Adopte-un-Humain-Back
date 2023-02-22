const express = require('express');
const { animalsController } = require('../controllers');
const router = express.Router();

router.get('/animals', animalsController.getAll);
router.post('/animal', animalsController.addAnimal);
router.get('/animal/:id', animalsController.getAnimal);
router.patch('/animal/:id', animalsController.updateAnimal);
router.delete('/animal/:id', animalsController.deleteAnimal);


module.exports = router;