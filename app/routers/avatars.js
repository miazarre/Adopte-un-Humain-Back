const express = require('express');
const { avatarsController } = require('../controllers');
const router = express.Router();
const auth = require("../service/security");
const multer = require('multer');
const upload = multer({dest: 'public/images/avatars'});


/**
 * GET /api/avatars
 * @summary Récupère tous les avatars
 * @tags AVATAR
 * @return {string} 200 - all avatars
 * @return {object} 500 - Unexpected error
 */

router.get('/avatars', avatarsController.getAll);

/**
 * POST /api/avatar
 * @summary Crée un avatar
 * @tags AVATAR
 * @return {string} 200 - new avatar
 * @return {object} 500 - Unexpected error
 */

router.post('/avatar', upload.array('files'), avatarsController.addAvatar);
// upload.array("files")

/**
 * GET /api/avatar/:id
 * @summary Récupère un avatar
 * @tags AVATAR
 * @return {string} 200 - one avatar
 * @return {object} 500 - Unexpected error
 */

router.get('/avatar/:id', avatarsController.getAvatar);

/**
 * PATCH /api/avatar/:id
 * @summary Modifie un avatar
 * @tags AVATAR
 * @return {string} 200 - update avatar
 * @return {object} 500 - Unexpected error
 */

router.patch('/avatar/:id', avatarsController.updateAvatar);

/**
 * DELETE /api/avatar/:id
 * @summary Supprime un avatar
 * @tags AVATAR
 * @return {string} 200 - delete avatar
 * @return {object} 500 - Unexpected error
 */

router.delete('/avatar/:id', avatarsController.deleteAvatar);


module.exports = router;