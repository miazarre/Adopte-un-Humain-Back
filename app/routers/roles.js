import express from 'express';
import controller from '../controllers/index.js';
import validation from '../service/validation.js';
import auth from "../service/security.js";
import schemaRole from "../schemas/roleBody.js";

const router = express.Router();

// Routes des Rôles

router.get('/roles', auth.authMiddleware(['staff', 'admin']), controller.rolesController.getAll);
router.post('/role', auth.authMiddleware(['admin']), validation.check(schemaRole.create(),"body"), controller.rolesController.addRole);
router.get('/role/:id', auth.authMiddleware(['staff', 'admin']), controller.rolesController.getRole);
router.patch('/role/:id', auth.authMiddleware(['admin']), validation.check(schemaRole.update(),"body"), controller.rolesController.updateRole);
router.delete('/role/:id', auth.authMiddleware(['admin']), controller.rolesController.deleteRole);

export default router;


// doc swagger : /api-docs

/**
 * GET /api/roles
 * @summary Récupère tous les roles
 * @security bearerAuth
 * @tags ROLE
 * @return {string} 200 - all roles
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/role
 * @summary Crée un role
 * @security bearerAuth
 * @tags ROLE
 * @param {Role} request.body.required - Role info
 * @return {string} 200 - new role
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/role/:id
 * @summary Récupère un role
 * @security bearerAuth
 * @tags ROLE
 * @return {string} 200 - one role
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/role/:id
 * @summary Modifie un role
 * @security bearerAuth
 * @tags ROLE
 * @param {RoleUpdate} request.body.required - RoleUpdate info
 * @return {string} 200 - update role
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/role/:id
 * @summary Supprime un role
 * @security bearerAuth
 * @tags ROLE
 * @return {string} 200 - delete role
 * @return {object} 500 - Unexpected error
 */

//  SCHEMA SWAGGER \\

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