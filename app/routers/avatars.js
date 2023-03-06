import express from 'express';
import controller from '../controllers/index.js';
import auth from "../service/security.js";
import multer from 'multer';
import validation from "../service/validation.js";
import schemaAvatar from "../schemas/avatarBody.js";
import schemaHasTag from "../schemas/hasTagBody.js";

const router = express.Router();
const upload = multer({dest: 'public/images/avatars'});

// Routes des avatars
router.get('/avatars', auth.authMiddleware(['membre','staff', 'admin']), controller.avatarsController.getAll);
router.post('/avatar', auth.authMiddleware(['staff', 'admin']), validation.check(schemaAvatar.create(),"body"), upload.array('files'), controller.avatarsController.addAvatar);
router.get('/avatar/:id', auth.authMiddleware(['membre','staff', 'admin']), controller.avatarsController.getAvatar);
router.patch('/avatar/:id', auth.authMiddleware(['staff', 'admin']), validation.check(schemaAvatar.update(),"body"), upload.array('files'), controller.avatarsController.updateAvatar);
router.delete('/avatar/:id', auth.authMiddleware(['staff', 'admin']), controller.avatarsController.deleteAvatar);

// Routes de la relation AVATAR_HAS_TAG
router.get('/avatar/:id/tag', auth.authMiddleware(['membre','staff', 'admin']), controller.avatarsController.getAvatarTags);
router.post('/avatar/:id/tag', auth.authMiddleware(['staff', 'admin']), validation.check(schemaHasTag.addTag(),"body"), controller.avatarsController.addAvatarTag);
router.delete('/avatar/:id/tag/:tagId', auth.authMiddleware(['staff', 'admin']), controller.avatarsController.deleteAvatarTag);

export default router;

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