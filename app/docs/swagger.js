/****************************/
/****   Swagger config   ****/
/****************************/

// USER  #########################################################

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
 * User
 * @typedef {object} User
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

