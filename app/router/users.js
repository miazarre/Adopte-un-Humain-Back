const express = require('express');
const { usersController } = require('../controllers');
const router = express.Router();

router.get('/users', usersController.getAll);
router.post('/register', usersController.addUser);
router.get('/user/:id', usersController.getUser);
router.patch('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);


module.exports = router;
