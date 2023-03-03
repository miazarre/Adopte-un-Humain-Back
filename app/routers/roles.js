import express from 'express';
import { rolesController } from '../controllers/index.js';
const router = express.Router();
import validation from '../service/validation.js';

import schemaRole from '../schemas/roleBody.js';

import securityService from "../service/security.js";
const authMiddleware = securityService.authMiddleware;


// Routes des Rôles

router.get('/roles', authMiddleware(['staff', 'admin']), rolesController.getAll);
router.post('/role', authMiddleware(['admin']), validation.check(schemaRole.create(),"body"), rolesController.addRole);
router.get('/role/:id', authMiddleware(['staff', 'admin']), rolesController.getRole);
router.patch('/role/:id', authMiddleware(['admin']), validation.check(schemaRole.update(),"body"), rolesController.updateRole);
router.delete('/role/:id', authMiddleware(['admin']), rolesController.deleteRole);


export { router as rolesRouter };


// doc swagger : http://localhost:3000/api-docs

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