const express = require('express');
const { rolesController } = require('../controllers');
const router = express.Router();
const validationModule = require("../service/validation");
const auth = require("../service/security");
const schemaRole = require("../schemas/roleBody");
const schemaUpdateRole = require("../schemas/updateRoleBody");


/**
 * GET /api/roles
 * @summary Récupère tous les roles
 * @tags ROLE
 * @return {string} 200 - all roles
 * @return {object} 500 - Unexpected error
 */

router.get('/roles', rolesController.getAll);

/**
 * POST /api/role
 * @summary Crée un role
 * @tags ROLE
 * @return {string} 200 - new role
 * @return {object} 500 - Unexpected error
 */

router.post('/role',validationModule.check(schemaRole,"body"), rolesController.addRole);

/**
 * GET /api/role/:id
 * @summary Récupère un role
 * @tags ROLE
 * @return {string} 200 - one role
 * @return {object} 500 - Unexpected error
 */

router.get('/role/:id', rolesController.getRole);

/**
 * PATCH /api/role/:id
 * @summary Modifie un role
 * @tags ROLE
 * @return {string} 200 - update role
 * @return {object} 500 - Unexpected error
 */

router.patch('/role/:id',validationModule.check(schemaUpdateRole,"body"), rolesController.updateRole);

/**
 * DELETE /api/role/:id
 * @summary Supprime un role
 * @tags ROLE
 * @return {string} 200 - delete role
 * @return {object} 500 - Unexpected error
 */

router.delete('/role/:id', rolesController.deleteRole);


module.exports = router;