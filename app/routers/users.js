const express = require('express');
const { usersController } = require('../controllers');
const router = express.Router();
const validation = require("../service/validation");
const schemaUser = require("../schemas/userBody");
const auth = require("../service/security");


// Routes des membres
router.get('/users', auth.authMiddleware(['staff', 'admin']), usersController.getAll);
router.get('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), usersController.getUser);
router.patch('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaUser.update(),"body"), usersController.updateUser);
router.delete('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), usersController.deleteUser);

// Routes admin/staff
router.get('/admin/user/:id', auth.authMiddleware(['staff', 'admin']), usersController.adminGetUser);
router.patch('/admin/user/:id', auth.authMiddleware(['admin']), validation.check(schemaUser.updateAdmin(),"body"), usersController.adminUpdateUser);
router.delete('/admin/user/:id', auth.authMiddleware(['admin']), usersController.adminDeleteUser);


// Routes de la relation USER_HAS_TAG
router.get('/user/:id/tag', usersController.getUserTags);
router.post('/user/:id/tag', usersController.addUserTag);
router.delete('/user/:id/tag/:tagId', usersController.deleteUserTag);

// Route du matching de tous les animaux
router.get('/user/:id/matching', usersController.matching);

// Route du matching d'un animal
router.get('/user/:id/matching/:animalId', usersController.matchingOne);


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
 * @param {UserUpdate} request.body.required - UserUpdate info
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
 * GET /api/user/:id/tag
 * @summary Récupère le tag lié au user
 * @tags USER
 * @return {string} 200 - one user tag
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/user/:id/tag
 * @summary Crée une association
 * @tags USER
 * @return {string} 200 - new association
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/user/:id/tag/:tagId
 * @summary Supprime une association
 * @tags USER
 * @return {string} 200 - delete association
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id/matching
 * @summary Récupère la liste des animaux qui ont les mêmes tags
 * @tags USER
 * @return {string} 200 - animals with same tags
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id/matching/:id
 * @summary Compare les tags d'un animal et d'un user
 * @tags USER
 * @return {string} 200 - animal/user tags
 * @return {object} 500 - Unexpected error
 */

/**
  * User
 * @typedef {object} User
 * @property {string} lastname - nom
 * @property {string} firstname - prénom
 * @property {string} email - email
 * @property {string} password - mot de passe (min 6)
 * @property {string} phone - numéro de téléphone (doit commencer par 0 et contenir 10 chiffres)
 * @property {string} address - adresse
 * @property {string} city - ville
 * @property {string} postal_code - code postal
 * @property {string} country - pays
 * @property {number} role_id - id du rôle de l'utilisateur
 */

/**
 * User Update
 * @typedef {object} UserUpdate
 * @property {string} lastname - nom
 * @property {string} firstname - prénom
 * @property {string} email - email
 * @property {string} password - mot de passe (min 6)
 * @property {string} phone - numéro de téléphone (doit commencer par 0 et contenir 10 chiffres)
 * @property {string} address - adresse
 * @property {string} city - ville
 * @property {string} postal_code - code postal
 * @property {string} country - pays
 */


