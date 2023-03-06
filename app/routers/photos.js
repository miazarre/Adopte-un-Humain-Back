import express from 'express';
import controller from '../controllers/index.js';

const router = express.Router();

// Route pour récupérer les images d'animaux
router.get('/images/animal/:filename', controller.photosController.getPhotoAnimal);

// Route pour récupérer les images d'avatars
router.get('/images/avatar/:filename', controller.photosController.getPhotoAvatar);

export default router;

// doc swagger : /api-docs

/**
 * GET /api/images/animal/:filename
 * @summary Récupère toutes les photos des animaux
 * @tags IMAGES
 * @return {string} 200 - all animals photos
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/avatar/:filename
 * @summary Récupère toutes les illus des avatars
 * @tags IMAGES
 * @return {string} 200 - all avatars pictures
 * @return {object} 500 - Unexpected error
 */
