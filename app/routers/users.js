import express from 'express';
import auth from '../service/security.js';
import controller from '../controllers/index.js';
import validation from '../service/validation.js';
import schemaUser from '../schemas/userBody.js';
import schemaHasTag from '../schemas/hasTagBody.js';

const router = express.Router();

// Routes des membres
router.get('/users', auth.authMiddleware(['staff', 'admin']), controller.usersController.getAll);
router.get('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.getUser);
router.patch('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaUser.update(),"body"), controller.usersController.updateUser);
router.delete('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.deleteUser);

// Routes admin/staff
router.get('/admin/user/:id', auth.authMiddleware(['staff', 'admin']), controller.usersController.adminGetUser);
router.patch('/admin/user/:id', auth.authMiddleware(['admin']), validation.check(schemaUser.updateAdmin(),"body"), controller.usersController.adminUpdateUser);
router.delete('/admin/user/:id', auth.authMiddleware(['admin']), controller.usersController.adminDeleteUser);

// Routes de la relation USER_HAS_TAG
router.get('/user/:id/tag', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.getUserTags);
router.post('/user/:id/tag', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaHasTag.addTag(),"body"), controller.usersController.addUserTag);
router.delete('/user/:id/tag/:tagId', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.deleteUserTag);

// Route du matching de tous les animaux
router.get('/user/:id/matching', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.matching);

// Route du matching d'un animal
router.get('/user/:id/matching/:animalId', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.matchingOne);

export default router;

// doc swagger : /api-docs

/**
 * GET /api/users
 * @summary Récupère tous les users
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - all users
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id
 * @summary Récupère un user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - one user
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/user/:id
 * @summary Modifie un user
 * @security bearerAuth
 * @tags USER
 * @param {UserUpdate} request.body.required - UserUpdate info
 * @return {string} 200 - update user
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/user/:id
 * @summary Supprime un user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - delete user (by user, staff or admin)
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/admin/user/:id
 * @summary Récupère le profil d'un user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - users profile
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/admin/user/:id
 * @summary Modifie le rôle d'un user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - new user role
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/admin/user/:id
 * @summary supprime un user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - delete user (by admin only)
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id/tag
 * @summary Récupère le tag lié au user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - one user tag
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/user/:id/tag
 * @summary Crée une association
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - new association
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/user/:id/tag/:tagId
 * @summary Supprime une association
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - delete association
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id/matching
 * @summary Récupère la liste des animaux qui ont les mêmes tags
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - animals with same tags
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/user/:id/matching/:id
 * @summary Compare les tags d'un animal et d'un user
 * @security bearerAuth
 * @tags USER
 * @return {string} 200 - animal/user tags
 * @return {object} 500 - Unexpected error
 */

//  SCHEMA SWAGGER \\

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


