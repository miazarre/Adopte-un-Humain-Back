const express = require('express');
const { tagsController } = require('../controllers');
const validationModule = require("../service/validation");
const schemaTag = require("../schemas/tagBody");
const schemaUpdateTag = require("../schemas/updateTagBody");

const router = express.Router();

/**
 * GET /api/tags
 * @summary Récupère tous les tags
 * @tags TAG
 * @return {string} 200 - all tags
 * @return {object} 500 - Unexpected error
 */

router.get('/tags', tagsController.getAll);

/**
 * POST /api/tag
 * @summary Crée un tag
 * @tags TAG
 * @return {string} 200 - new tag
 * @return {object} 500 - Unexpected error
 */

router.post('/tag', validationModule.check(schemaTag,"body"), tagsController.addTag);

/**
 * GET /api/tag/:id
 * @summary Récupère un tag
 * @tags TAG
 * @return {string} 200 - one tag
 * @return {object} 500 - Unexpected error
 */

router.get('/tag/:id', tagsController.getTag);

/**
 * PATCH /api/tag/:id
 * @summary Modifie un tag
 * @tags TAG
 * @return {string} 200 - update tag
 * @return {object} 500 - Unexpected error
 */

router.patch('/tag/:id', validationModule.check(schemaUpdateTag,"body"), tagsController.updateTag);

/**
 * DELETE /api/tag/:id
 * @summary Supprime un tag
 * @tags TAG
 * @return {string} 200 - delete tag
 * @return {object} 500 - Unexpected error
 */

router.delete('/tag/:id', tagsController.deleteTag);


module.exports = router;