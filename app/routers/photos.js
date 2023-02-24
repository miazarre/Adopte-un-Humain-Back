const express = require('express');
const { photosController } = require('../controllers');
const router = express.Router();
const auth = require("../service/security");


router.get('/images/animal/:filename', photosController.getPhotoAnimal);

router.get('/images/avatar/:filename', photosController.getPhotoAvatar);


module.exports = router;