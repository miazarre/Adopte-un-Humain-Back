const express = require('express');
const { tagsController } = require('../controllers');
const validation = require("../service/validation");
const schemaTag = require("../schemas/tagBody");
const auth = require("../service/security");
const router = express.Router();

// Routes des tags

router.get('/tags', auth.checkToken, tagsController.getAll);
router.post('/tag', auth.checkToken, tagsController.addTag);
router.get('/tag/:id', auth.checkToken, tagsController.getTag);
router.patch('/tag/:id', auth.checkToken, tagsController.updateTag);
router.delete('/tag/:id', auth.checkToken, tagsController.deleteTag);


module.exports = router;



// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/tags
 * @summary Récupère tous les tags
 * @tags TAG
 * @return {string} 200 - all tags
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/tag
 * @summary Crée un tag
 * @tags TAG
 * @return {string} 200 - new tag
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/tag/:id
 * @summary Récupère un tag
 * @tags TAG
 * @return {string} 200 - one tag
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/tag/:id
 * @summary Modifie un tag
 * @tags TAG
 * @return {string} 200 - update tag
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/tag/:id
 * @summary Supprime un tag
 * @tags TAG
 * @return {string} 200 - delete tag
 * @return {object} 500 - Unexpected error
 */

/**
 * Tag
 * @typedef {object} Tag
 * @property {string} name - nom
 * @property {boolean} priority - obligatoire (true) ou oprionnel (false)
 */

/**
 * Tag Update
 * @typedef {object} TagUpdate
 * @property {string} name - nom
 * @property {boolean} priority - obligatoire (true) ou oprionnel (false)
 */