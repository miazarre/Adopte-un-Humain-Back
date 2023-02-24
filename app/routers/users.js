const express = require('express');
const { usersController } = require('../controllers');
const router = express.Router();
const validationModule = require("../service/validation");
const schemaRegisterBody = require("../schemas/registerBody");
const schemaUserBody = require("../schemas/userBody");
const securityService = require("../service/security");

/**
 * GET /api/users
 * @summary Récupère tous les users
 * @tags USER
 * @return {string} 200 - all users
 * @return {object} 500 - Unexpected error
 */

router.get('/users', usersController.getAll);

/**
 * POST /api/register
 * @summary Crée un user
 * @tags USER
 * @return {string} 200 - new user
 * @return {object} 500 - Unexpected error
 */

router.post('/register', validationModule.check(schemaRegisterBody,"body"), usersController.addUser);

/**
 * GET /api/user/:id
 * @summary Récupère un user
 * @tags USER
 * @return {string} 200 - one user
 * @return {object} 500 - Unexpected error
 */

router.get('/user/:id', usersController.getUser);

/**
 * PATCH /api/user/:id
 * @summary Modifie un user
 * @tags USER
 * @return {string} 200 - update user
 * @return {object} 500 - Unexpected error
 */

router.patch('/user/:id', securityService.checkToken, validationModule.check(schemaUserBody,"body"), usersController.updateUser);

/**
 * DELETE /api/user/:id
 * @summary Supprime un user
 * @tags USER
 * @return {string} 200 - delete user
 * @return {object} 500 - Unexpected error
 */

router.delete('/user/:id', usersController.deleteUser);


module.exports = router;
