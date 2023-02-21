const express = require('express');
const { apiController, usersController } = require('../controllers');
const router = express.Router();
const security = require("../service/security");

// GET /api/users - route pour récupérer tous les users
router.get("/users",security.checkToken,usersController.getAll);

// POST /api/login - route pour vérifier les informations pour se connecter (email,password)
router.post("/login",apiController.checkLogin);

module.exports = router;