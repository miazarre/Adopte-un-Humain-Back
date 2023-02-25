const express = require('express');
const { photosController } = require('../controllers');
const router = express.Router();

/**
 * POST /api/images/animal
 * @summary Récupère toutes les images des animaux
 * @tags IMAGES
 * @return {string} 200 - all images/animal
 * @return {object} 500 - Unexpected error
 */

router.get('/images/animal/:filename', photosController.getPhotoAnimal);

/**
 * POST /api/images/avatar
 * @summary Récupère toutes les images des avatars
 * @tags IMAGES
 * @return {string} 200 - all images/avatar
 * @return {object} 500 - Unexpected error
 */

router.get('/images/avatar/:filename', photosController.getPhotoAvatar);


module.exports = router;