import express from 'express';
import { avatarsController } from '../controllers/index.js';
import securityService from "../service/security.js";
import multer from 'multer';
const upload = multer({dest: 'public/images/avatars'});
const router = express.Router();
const authMiddleware = securityService.authMiddleware;


// Routes des avatars

router.get('/avatars', authMiddleware(['membre','staff', 'admin']), avatarsController.getAll);
router.post('/avatar', authMiddleware(['staff', 'admin']), upload.array('files'), avatarsController.addAvatar);
router.get('/avatar/:id', authMiddleware(['membre','staff', 'admin']), avatarsController.getAvatar);
router.patch('/avatar/:id', authMiddleware(['staff', 'admin']), upload.array('files'), avatarsController.updateAvatar);
router.delete('/avatar/:id', authMiddleware(['staff', 'admin']), avatarsController.deleteAvatar);

// Routes de la relation AVATAR_HAS_TAG

// Récupérer tous les tags d'un avatar spécifique
router.get('/avatar/:id/tag', authMiddleware(['membre','staff', 'admin']), avatarsController.getAvatarTags);

// Ajouter un tag à un avatar spécifique
router.post('/avatar/:id/tag', authMiddleware(['staff', 'admin']), avatarsController.addAvatarTag);

// Supprimer un tag d'un avatar spécifique
router.delete('/avatar/:id/tag/:tagId', authMiddleware(['staff', 'admin']), avatarsController.deleteAvatarTag);


export { router as avatarsRouter };

// doc swagger : http://localhost:3000/api-docs

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