import express from 'express';
import { adoptsController } from '../controllers/index.js';
const router = express.Router();

import securityService from "../service/security.js";
const authMiddleware = securityService.authMiddleware;


// Routes des demandes d'adoptions

router.get('/adopts', authMiddleware(['staff', 'admin']), adoptsController.getAll);
router.post('/adopt', authMiddleware(['membre','staff', 'admin']), adoptsController.addAdopt);
router.get('/adopt/:id', authMiddleware(['staff', 'admin']), adoptsController.getAdopt);
// router.get('/admin/adopt/:id', authMiddleware(['staff', 'admin']), adoptsController.adminGetAdopt);
router.patch('/adopt/:id', authMiddleware(['staff', 'admin']), adoptsController.updateAdopt);
router.delete('/adopt/:id', authMiddleware(['staff', 'admin']), adoptsController.deleteAdopt);


export { router as adoptRouter };


// doc swagger : http://localhost:3000/api-docs

/**
 * GET /api/adopts
 * @summary Récupère toutes les adoptions
 * @security bearerAuth
 * @tags ADOPT
 * @return {string} 200 - all adopts
 * @return {object} 500 - Unexpected error
 */

/**
 * POST /api/adopt
 * @summary Crée une adoption
 * @security bearerAuth
 * @tags ADOPT
 * @param {Adopt} request.body.required - Adopt info
 * @return {string} 200 - new adopt
 * @return {object} 500 - Unexpected error
 */

/**
 * GET /api/adopt/:id
 * @summary Récupère une adoption
 * @security bearerAuth
 * @tags ADOPT
 * @return {string} 200 - one adopt
 * @return {object} 500 - Unexpected error
 */

/**
 * PATCH /api/adopt/:id
 * @summary Modifie une adoption
 * @security bearerAuth
 * @tags ADOPT
 * @param {AdoptUpdate} request.body.required - AdoptUpdate info
 * @return {string} 200 - update adopt
 * @return {object} 500 - Unexpected error
 */

/**
 * DELETE /api/adopt/:id
 * @summary Supprime une adoption
 * @security bearerAuth
 * @tags ADOPT
 * @return {string} 200 - delete adopt
 * @return {object} 500 - Unexpected error
 */


/**
 * Adopt
 * @typedef {object} Adopt
 * @property {string} form_1- formulaire partie 1
 * @property {string} form_2 - formulaire partie 2
 * @property {string} form_3 - formulaire partie 3
 * @property {string} comment - commentaire du refuge concernant l'adoption en cours
 * @property {string} status - status de la demande d'adoption
 * @property {string} date_adopt - date effective de l'adoption
 * @property {number} user_id - utilisateur à l'origine de la demande d'adoption
 * @property {number} animal_id - animal concerné par l'adoption
 */

/**
 * Adopt Update
 * @typedef {object} AdoptUpdate
 * @property {string} comment - commentaire du refuge concernant l'adoption en cours
 * @property {string} status - status de la demande d'adoption
 * @property {string} date_adopt - date effective de l'adoption
 */

