const express = require('express');
const authController  = require('../controllers/auth');
const router = express.Router();
const validationModule = require("../service/validation");
const { usersController } = require('../controllers');
const schemaRegisterBody = require("../schemas/registerBody");

/**
 * A Register
 * @typedef {object} Register
 * @property {string} route - slug
 * @property {string} label - titre
 */

/**
 * POST /api/login
 * @summary Récupère tous les identifiants
 * @tags AUTH
 * @return {string} 200 - all ids
 * @return {object} 500 - Unexpected error
 */

router.post("/login", authController.checkLogin);

/**
 * POST /api/register
 * @summary Crée un user
 * @tags USER
 * @param {Register} request.body.required - Register info
 * @type {Resgister}
 * @return {string} 200 - new user
 * @return {object} 500 - Unexpected error
 */
router.post('/register', validationModule.check(schemaRegisterBody,"body"), usersController.addUser);

module.exports = router;