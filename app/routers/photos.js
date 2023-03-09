import express from 'express';
import controller from '../controllers/index.js';

const router = express.Router();

// Route pour récupérer les images d'animaux
router.get('/images/animal/:filename', controller.photosController.getPhotoAnimal);




export default router;

// doc swagger : /api-docs

/**
 * GET /api/images/animal/:filename
 * @summary Récupère toutes les photos des animaux
 * @tags IMAGES
 * @return {string} 200 - all animals photos
 * @return {object} 500 - Unexpected error
 */

