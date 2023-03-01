const express = require('express');
const { usersController } = require('../controllers');
const router = express.Router();
const validation = require("../service/validation");
const schemaUser = require("../schemas/registerBody");
const auth = require("../service/security");

// Routes des membres

router.get('/users', auth.checkToken, usersController.getAll);
router.get('/user/:id', auth.checkToken, usersController.getUser);
router.patch('/user/:id', usersController.updateUser);
router.delete('/user/:id', auth.checkToken, usersController.deleteUser);


// Routes de la relation USER_HAS_TAG

router.get('/user/:id/tag', usersController.getUserTags);
router.post('/user/:id/tag', usersController.addUserTag);
router.delete('/user/:id/tag/:tagId', usersController.deleteUserTag);

// Routes du matching
 
router.get('/user/:id/matching', usersController.matching);

module.exports = router;

// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/users
 * @summary Récupère tous les users
 * @tags USER
 * @return {string} 200 - all users
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id
 * @summary Récupère un user
 * @tags USER
 * @return {string} 200 - one user
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/user/:id
 * @summary Modifie un user
 * @tags USER
 * @param {UserUpdate} request.body.required - User info
 * @return {string} 200 - update user
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/user/:id
 * @summary Supprime un user
 * @tags USER
 * @return {string} 200 - delete user
 * @return {object} 500 - Unexpected error
 */


/**
 * User Update
 * @typedef {object} UserUpdate
 * @property {string} lastname - nom
 * @property {string} firstname - prénom
 * @property {string} email - email
 * @property {string} password - mot de passe (min 6)
 * @property {string} phone - numéro de téléphone (doit commencer à 0 et contenir 10 chiffres)
 * @property {string} addresse - adresse
 * @property {string} city - ville
 * @property {string} postal_code - code postal
 * @property {string} country - pays
 */
