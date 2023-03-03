const express = require('express');
const { tagsController } = require('../controllers');
const validation = require("../service/validation");
const schemaTag = require("../schemas/tagBody");
const auth = require("../service/security");
const router = express.Router();

// Routes des tags

router.get('/tags', auth.authMiddleware(['membre','staff', 'admin']),  tagsController.getAll);
router.post('/tag', auth.authMiddleware(['staff', 'admin']), validation.check(schemaTag.create(),"body"), tagsController.addTag);
router.get('/tag/:id', auth.authMiddleware(['membre','staff', 'admin']), tagsController.getTag);
router.patch('/tag/:id', auth.authMiddleware(['staff', 'admin']), validation.check(schemaTag.update(),"body"), tagsController.updateTag);
router.delete('/tag/:id', auth.authMiddleware(['staff', 'admin']), tagsController.deleteTag);


module.exports = router;



// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/tags
 * @summary Récupère tous les tags
 * @security bearerAuth
 * @tags TAG
 * @return {string} 200 - all tags
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/tag
 * @summary Crée un tag
 * @security bearerAuth
 * @tags TAG
 * @param {Tag} request.body.required - Tag info
 * @return {string} 200 - new tag
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/tag/:id
 * @summary Récupère un tag
 * @security bearerAuth
 * @tags TAG
 * @return {string} 200 - one tag
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/tag/:id
 * @summary Modifie un tag
 * @security bearerAuth
 * @tags TAG
 * @param {TagUpdate} request.body.required - TagUpdate info
 * @return {string} 200 - update tag
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/tag/:id
 * @summary Supprime un tag
 * @security bearerAuth
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