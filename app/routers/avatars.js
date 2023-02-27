const express = require('express');
const { avatarsController } = require('../controllers');
const router = express.Router();
const auth = require("../service/security");
const multer = require('multer');
const upload = multer({dest: 'public/images/avatars'});



// Routes des avatars

router.get('/avatars', avatarsController.getAll);
router.post('/avatar', upload.array('files'), avatarsController.addAvatar);
router.get('/avatar/:id', avatarsController.getAvatar);
router.patch('/avatar/:id',upload.array('files'), avatarsController.updateAvatar);
router.delete('/avatar/:id', avatarsController.deleteAvatar);

// Routes de la relation AVATAR_HAS_TAG

router.get('/avatar/:id/tag');
router.post('/avatar/:id/tag');
router.delete('/avatar/:id/tag');


module.exports = router;

// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/avatars
 * @summary Récupère tous les avatars
 * @tags AVATAR
 * @return {string} 200 - all avatars
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/avatar
 * @summary Crée un avatar
 * @tags AVATAR
 * @return {string} 200 - new avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/avatar/:id
 * @summary Récupère un avatar
 * @tags AVATAR
 * @return {string} 200 - one avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/avatar/:id
 * @summary Modifie un avatar
 * @tags AVATAR
 * @return {string} 200 - update avatar
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/avatar/:id
 * @summary Supprime un avatar
 * @tags AVATAR
 * @return {string} 200 - delete avatar
 * @return {object} 500 - Unexpected error
 */