const express = require('express');
const { animalsController } = require('../controllers');
const router = express.Router();
const auth = require("../service/security");
const multer = require('multer');
const upload = multer({dest: 'public/images/animals'});



// Routes des animaux

router.get('/animals', auth.authMiddleware(['membre','staff', 'admin']),  animalsController.getAll);
router.post('/animal', auth.authMiddleware(['staff', 'admin']),  upload.array('files'), animalsController.addAnimal);
router.get('/animal/:id', auth.authMiddleware(['membre','staff', 'admin']), animalsController.getAnimal);

router.patch('/animal/:id', auth.authMiddleware(['staff', 'admin']), upload.fields([{
    name: 'photo1', maxCount: 1
  }, {
    name: 'photo2', maxCount: 1
  }, {
    name: 'photo3', maxCount: 1
  }, {
    name: 'photo4', maxCount: 1
  }]), animalsController.updateAnimal);

router.delete('/animal/:id', auth.authMiddleware(['staff', 'admin']),  animalsController.deleteAnimal);


// Routes de la relation ANIMAL_HAS_TAG 

// Récupérer tous les tags d'un animal spécifique
router.get('/animal/:id/tag', auth.authMiddleware(['membre','staff', 'admin']), animalsController.getAnimalTags);

// Ajouter un tag à un animal spécifique
router.post('/animal/:id/tag', auth.authMiddleware(['staff', 'admin']),  animalsController.addAnimalTag);

// Supprimer un tag d'un animal spécifique
router.delete('/animal/:id/tag/:tagId', auth.authMiddleware(['staff', 'admin']), animalsController.deleteAnimalTag);




module.exports = router;


// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/animals
 * @summary Récupère tous les animals
 * @security bearerAuth
 * @tags ANIMAL
 * @return {string} 200 - all animals
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/animal
 * @summary Crée un animal
 * @security bearerAuth
 * @tags ANIMAL
 * @param {Animal} request.body.required - Animal info
 * @return {string} 200 - new animal
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/animal/:id
 * @summary Récupère un animal
 * @security bearerAuth
 * @tags ANIMAL
 * @return {string} 200 - one animal
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/animal/:id
 * @summary Modifie un animal
 * @security bearerAuth
 * @tags ANIMAL
 * @param {AnimalUpdate} request.body.required - Animal info
 * @return {string} 200 - update animal
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/animal/:id
 * @summary Supprime un animal
 * @security bearerAuth
 * @tags ANIMAL
 * @return {string} 200 - delete animal
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/animal/:id/tag
 * @summary Récupère le tag lié à l'animal
 * @security bearerAuth
 * @tags ANIMAL
 * @return {string} 200 - one animal tag
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/animal/:id/tag
 * @summary Crée une association
 * @security bearerAuth
 * @tags ANIMAL
 * @return {string} 200 - new association
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/animal/:id/tag/:tagId
 * @summary Supprime une association
 * @security bearerAuth
 * @tags ANIMAL
 * @return {string} 200 - delete association
 * @return {object} 500 - Unexpected error
 */


/**
 * Animal
 * @typedef {object} Animal
 * @property {string} name - nom
 * @property {string} description - description de l'animal
 * @property {string} resume - résumé de la description
 * @property {string} needs - besoin de l'animal
 * @property {string} birthdate - date de naissance
 * @property {string} status - status de l'animal
 * @property {string} photo1 - nom de l'image de la photo 1
 * @property {string} photo2 - nom de l'image de la photo 2
 * @property {string} photo3 - nom de l'image de la photo 3
 * @property {string} photo4 - nom de l'image de la photo 4
 * @property {number} user_id - id de l'utilisateur crée le profil
 */

/**
 * Animal Update
 * @typedef {object} AnimalUpdate
 * @property {string} name - nom
 * @property {string} description - description de l'animal
 * @property {string} resume - résumé de la description
 * @property {string} needs - besoin de l'animal
 * @property {string} birthdate - date de naissance
 * @property {string} status - status de l'animal
 * @property {string} photo1 - nom de l'image de la photo 1
 * @property {string} photo2 - nom de l'image de la photo 2
 * @property {string} photo3 - nom de l'image de la photo 3
 * @property {string} photo4 - nom de l'image de la photo 4
 */