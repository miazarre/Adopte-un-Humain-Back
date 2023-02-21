const express = require('express');
const { authController } = require('../controllers');
const router = express.Router();

/**
 * POST /api/login - route pour vérifier les informations pour se connecter (email,password)
 */
router.post("/login", authController.checkLogin);


module.exports = router;