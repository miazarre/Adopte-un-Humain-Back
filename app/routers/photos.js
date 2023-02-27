const express = require('express');
const { photosController } = require('../controllers');
const router = express.Router();


// Route pour récupérer les images d'animaux
router.get('/images/animal/:filename', photosController.getPhotoAnimal);

// Route pour récupérer les images d'avatars
router.get('/images/avatar/:filename', photosController.getPhotoAvatar);


module.exports = router;