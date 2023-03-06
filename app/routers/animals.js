import express from 'express';
import controller from '../controllers/index.js';
import auth from "../service/security.js";
import multer from 'multer';
import validation from "../service/validation.js";
import schemaAnimal from "../schemas/animalBody.js";
import schemaHasTag from "../schemas/hasTagBody.js";

const router = express.Router();
const upload = multer({dest: 'public/images/animals'});

// Routes des animaux
router.get('/animals', auth.authMiddleware(['membre','staff', 'admin']),  controller.animalsController.getAll);
router.delete('/animal/:id', auth.authMiddleware(['staff', 'admin']),  controller.animalsController.deleteAnimal);
router.get('/animal/:id', auth.authMiddleware(['membre','staff', 'admin']), controller.animalsController.getAnimal);

router.post('/animal', auth.authMiddleware(['staff', 'admin']), validation.check(schemaAnimal.create(),"body"), upload.fields([{
  name: 'photo1', maxCount: 1
}, {
  name: 'photo2', maxCount: 1
}, {
  name: 'photo3', maxCount: 1
}, {
  name: 'photo4', maxCount: 1
}]), controller.animalsController.addAnimal);

router.patch('/animal/:id', auth.authMiddleware(['staff', 'admin']), validation.check(schemaAnimal.update(),"body"), upload.fields([{
    name: 'photo1', maxCount: 1
  }, {
    name: 'photo2', maxCount: 1
  }, {
    name: 'photo3', maxCount: 1
  }, {
    name: 'photo4', maxCount: 1
  }]), controller.animalsController.updateAnimal);


// Routes de la relation ANIMAL_HAS_TAG
router.get('/animal/:id/tag', auth.authMiddleware(['membre','staff', 'admin']), controller.animalsController.getAnimalTags);
router.post('/animal/:id/tag', auth.authMiddleware(['staff', 'admin']), validation.check(schemaHasTag.addTag(),"body"), controller.animalsController.addAnimalTag);
router.delete('/animal/:id/tag/:tagId', auth.authMiddleware(['staff', 'admin']), controller.animalsController.deleteAnimalTag);

export default router;



// doc swagger : /api-docs

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

//  SCHEMA SWAGGER \\

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