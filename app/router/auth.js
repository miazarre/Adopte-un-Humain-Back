const express = require('express');
const authController  = require('../controllers/auth');
const router = express.Router();

/**
 * POST /api/login
 * @summary Récupère tous les identifiants
 * @tags AUTH
 * @return {string} 200 - all ids
 * @return {object} 500 - Unexpected error
 */

router.post("/login", authController.checkLogin);


module.exports = router;