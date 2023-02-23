const express = require('express');
const { adoptsController } = require('../controllers');
const router = express.Router();


/**
 * GET /api/adopts
 * @summary Récupère toutes les adoptions
 * @tags ADOPT
 * @return {string} 200 - all adopts
 * @return {object} 500 - Unexpected error
 */

router.get('/adopts', adoptsController.getAll);

/**
 * POST /api/adopts
 * @summary Crée une adoption
 * @tags ADOPT
 * @return {string} 200 - new adopt
 * @return {object} 500 - Unexpected error
 */

router.post('/adopt', adoptsController.addAdopt);
// upload.array("files")
/**
 * GET /api/adopts/:id
 * @summary Récupère une adoption
 * @tags ADOPT
 * @return {string} 200 - one adopt
 * @return {object} 500 - Unexpected error
 */

router.get('/adopt/:id', adoptsController.getAdopt);

/**
 * PATCH /api/adopts/:id
 * @summary Modifie une adoption
 * @tags ADOPT
 * @return {string} 200 - update adopt
 * @return {object} 500 - Unexpected error
 */

router.patch('/adopt/:id', adoptsController.updateAdopt);

/**
 * DELETE /api/adopts/:id
 * @summary Supprime une adoption
 * @tags ADOPT
 * @return {string} 200 - delete adopt
 * @return {object} 500 - Unexpected error
 */

router.delete('/adopt/:id', adoptsController.deleteAdopt);


module.exports = router;