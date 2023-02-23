const express = require('express');
const { photosController } = require('../controllers');
const router = express.Router();


router.get('/images/:filename', photosController.getPhoto);


module.exports = router;