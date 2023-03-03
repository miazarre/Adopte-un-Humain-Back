const express = require('express');
const { avatarsController } = require('../controllers');
const router = express.Router();
const auth = require("../service/security");
const multer = require('multer');
const upload = multer({dest: 'public/images/avatars'});
const validation = require("../service/validation");
const schemaAvatar = require("../schemas/avatarBody");
const schemaHasTag = require("../schemas/hasTagBody");



// Routes des avatars

router.get('/avatars', auth.authMiddleware(['membre','staff', 'admin']), avatarsController.getAll);
router.post('/avatar', auth.authMiddleware(['staff', 'admin']), validation.check(schemaAvatar.create(),"body"), upload.array('files'), avatarsController.addAvatar);
router.get('/avatar/:id', auth.authMiddleware(['membre','staff', 'admin']), avatarsController.getAvatar);
router.patch('/avatar/:id', auth.authMiddleware(['staff', 'admin']), validation.check(schemaAvatar.update(),"body"), upload.array('files'), avatarsController.updateAvatar);
router.delete('/avatar/:id', auth.authMiddleware(['staff', 'admin']), avatarsController.deleteAvatar);

// Routes de la relation AVATAR_HAS_TAG

router.get('/avatar/:id/tag', auth.authMiddleware(['membre','staff', 'admin']), avatarsController.getAvatarTags);
router.post('/avatar/:id/tag', auth.authMiddleware(['staff', 'admin']), validation.check(schemaHasTag.addTag(),"body"), avatarsController.addAvatarTag);
router.delete('/avatar/:id/tag/:tagId', auth.authMiddleware(['staff', 'admin']), avatarsController.deleteAvatarTag);

module.exports = router;

// doc swagger : /api-docs

/**
 * GET /api/avatars
 * @summary Récupère tous les avatars
 * @security bearerAuth
 * @tags AVATAR
 * @return {string} 200 - all avatars
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/avatar
 * @summary Crée un avatar
 * @security bearerAuth
 * @tags AVATAR
 * @param {Avatar} request.body.required - Avatar info
 * @return {string} 200 - new avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/avatar/:id
 * @summary Récupère un avatar
 * @security bearerAuth
 * @tags AVATAR
 * @return {string} 200 - one avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/avatar/:id
 * @summary Modifie un avatar
 * @security bearerAuth
 * @tags AVATAR
 * @param {AvatarUpdate} request.body.required - AvatarUpdate info
 * @return {string} 200 - update avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/avatar/:id
 * @summary Supprime un avatar
 * @security bearerAuth
 * @tags AVATAR
 * @return {string} 200 - delete avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/avatar/:id/tag
 * @summary Récupère le tag lié à l'avatar
 * @security bearerAuth
 * @tags AVATAR
 * @return {string} 200 - one avatar tag
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/avatar/:id/tag
 * @summary Crée une association
 * @security bearerAuth
 * @tags AVATAR
 * @return {string} 200 - new association
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/avatar/:id/tag
 * @summary Supprime l'association entre l'avatar et le tag
 * @security bearerAuth
 * @tags AVATAR
 * @return {string} 200 - delete association
 * @return {object} 500 - Unexpected error
 */

//  SCHEMA SWAGGER \\

/**
 * Avatar
 * @typedef {object} Avatar
 * @property {string} name - nom
 * @property {string} picture - nom de l'image de la photo
 */

/**
 * Avatar Update
 * @typedef {object} AvatarUpdate
 * @property {string} name - nom
 * @property {string} picture - nom de l'image de la photo
 */