const express = require('express');
const { rolesController } = require('../controllers');
const router = express.Router();
const validation = require("../service/validation");
const auth = require("../service/security");
const schemaRole = require("../schemas/roleBody");


// Routes des Rôles

router.get('/roles', auth.authMiddleware(['staff', 'admin']), rolesController.getAll);
router.post('/role', auth.authMiddleware(['admin']), validation.check(schemaRole.create(),"body"), rolesController.addRole);
router.get('/role/:id', auth.authMiddleware(['staff', 'admin']), rolesController.getRole);
router.patch('/role/:id', auth.authMiddleware(['admin']), validation.check(schemaRole.update(),"body"), rolesController.updateRole);
router.delete('/role/:id', auth.authMiddleware(['admin']), rolesController.deleteRole);


module.exports = router;


// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/roles
 * @summary Récupère tous les roles
 * @tags ROLE
 * @return {string} 200 - all roles
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/role
 * @summary Crée un role
 * @tags ROLE
 * @param {Role} request.body.required - Role info
 * @return {string} 200 - new role
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/role/:id
 * @summary Récupère un role
 * @tags ROLE
 * @return {string} 200 - one role
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/role/:id
 * @summary Modifie un role
 * @tags ROLE
 * @param {RoleUpdate} request.body.required - RoleUpdate info
 * @return {string} 200 - update role
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/role/:id
 * @summary Supprime un role
 * @tags ROLE
 * @return {string} 200 - delete role
 * @return {object} 500 - Unexpected error
 */

/**
 * Role
 * @typedef {object} Role
 * @property {string} name - nom
 */

/**
 * Role Update
 * @typedef {object} RoleUpdate
 * @property {string} name - nom
 */