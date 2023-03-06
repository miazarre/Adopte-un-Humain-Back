import express from 'express';
import authController from '../controllers/auth.js';
import usersController from '../controllers/users.js';
import validation from "../service/validation.js";
import schemaRegister from "../schemas/registerBody.js";

const router = express.Router();

router.post("/login", validation.check(schemaRegister.login(),"body"), authController.checkLogin);
router.post("/register", validation.check(schemaRegister.create(),"body"), usersController.addUser);

export default router;

// doc swagger : /api-docs

/**
 * POST /api/login
 * @summary Identification
 * @tags REGISTER / LOGIN
 * @param {Login} request.body.required - Login info
 * @return {string} 200 - all ids
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/register
 * @summary Création d'un utilisateur
 * @tags  REGISTER / LOGIN
 * @param {Register} request.body.required - Register info
 * @type {Register}
 * @return {string} 200 - new user
 * @return {object} 500 - Unexpected error
 */

//  SCHEMA SWAGGER \\

/**
 * Register
 * @typedef {object} Register
 * @property {string} lastname - nom
 * @property {string} firstname - prénom
 * @property {string} email - email
 * @property {string} password - mot de passe (min 6)
 * @property {string} phone - numéro de téléphone (doit commencer par 0 et contenir 10 chiffres)
 */

/**
 * Login
 * @typedef {object} Login
 * @property {string} email - email de l'utilisateur
 * @property {string} password - mot de passe
 */

