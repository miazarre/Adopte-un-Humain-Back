const express = require('express');
const { animalsController } = require('../controllers');
const router = express.Router();
const auth = require("../service/security");
const multer = require('multer');
const upload = multer({dest: 'public/images/animals'});


// Routes des animaux

router.get('/animals', animalsController.getAll);
router.post('/animal', upload.array('files'), animalsController.addAnimal);
router.get('/animal/:id', animalsController.getAnimal);

router.patch('/animal/:id',upload.fields([{
    name: 'photo1', maxCount: 1
  }, {
    name: 'photo2', maxCount: 1
  }, {
    name: 'photo3', maxCount: 1
  }, {
    name: 'photo4', maxCount: 1
  }]), animalsController.updateAnimal);

router.delete('/animal/:id', animalsController.deleteAnimal);


// Routes de la relation ANIMAL_HAS_TAG 


// START : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Récupérer tous les tags d'un animal spécifique
router.get('/animal/:id/tag', animalsController.getAnimalTags);

// Ajouter un tag à un animal spécifique
router.post('/animal/:id/tag', animalsController.addAnimalTag);

// Supprimer un tag d'un animal spécifique
router.delete('/animal/:id/tag/:tagId', animalsController.deleteAnimalTag);

// END : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


module.exports = router;


// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/animals
 * @summary Récupère tous les animals
 * @tags ANIMAL
 * @return {string} 200 - all animals
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/animal
 * @summary Crée un animal
 * @tags ANIMAL
 * @param {Animal} request.body.required - Animal info
 * @return {string} 200 - new animal
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/animal/:id
 * @summary Récupère un animal
 * @tags ANIMAL
 * @return {string} 200 - one animal
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/animal/:id
 * @summary Modifie un animal
 * @tags ANIMAL
 * @param {AnimalUpdate} request.body.required - Animal info
 * @return {string} 200 - update animal
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/animal/:id
 * @summary Supprime un animal
 * @tags ANIMAL
 * @return {string} 200 - delete animal
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
 * @property {string} photo_1 - nom de l'image de la photo 1
 * @property {string} photo_2 - nom de l'image de la photo 2
 * @property {string} photo_3 - nom de l'image de la photo 3
 * @property {string} photo_4 - nom de l'image de la photo 4
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
 * @property {string} photo_1 - nom de l'image de la photo 1
 * @property {string} photo_2 - nom de l'image de la photo 2
 * @property {string} photo_3 - nom de l'image de la photo 3
 * @property {string} photo_4 - nom de l'image de la photo 4
 */