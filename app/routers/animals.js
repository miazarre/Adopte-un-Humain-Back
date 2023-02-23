const express = require('express');
const { animalsController } = require('../controllers');
const router = express.Router();



/**
 * GET /api/animals
 * @summary Récupère tous les animals
 * @tags ANIMAL
 * @return {string} 200 - all animals
 * @return {object} 500 - Unexpected error
 */

router.get('/animals', animalsController.getAll);

/**
 * POST /api/animals
 * @summary Crée un animal
 * @tags ANIMAL
 * @return {string} 200 - new animal
 * @return {object} 500 - Unexpected error
 */

router.post('/animal', animalsController.addAnimal);

/**
 * GET /api/animals/:id
 * @summary Récupère un animal
 * @tags ANIMAL
 * @return {string} 200 - one animal
 * @return {object} 500 - Unexpected error
 */

router.get('/animal/:id', animalsController.getAnimal);

/**
 * PATCH /api/animals/:id
 * @summary Modifie un animal
 * @tags ANIMAL
 * @return {string} 200 - update animal
 * @return {object} 500 - Unexpected error
 */

router.patch('/animal/:id', animalsController.updateAnimal);

/**
 * DELETE /api/animals/:id
 * @summary Supprime un animal
 * @tags ANIMAL
 * @return {string} 200 - delete animal
 * @return {object} 500 - Unexpected error
 */

router.delete('/animal/:id', animalsController.deleteAnimal);


module.exports = router;