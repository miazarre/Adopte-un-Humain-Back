const express = require('express');
const router = express.Router();

const usersRouter = require("./users");
const apiRouter = require("./api");

// On ajoute nos routes à l'objet Router
router.use('/users', usersRouter);
router.use('/api', apiRouter);
// const avatarsRouter = require("./avatars");
// const animalsRouter = require("./animals");
// const rolesRouter = require("./roles");
// const tagsRouter = require("./tags");
// const adoptsRouter = require("./adopts");

module.exports = router;
//module.exports = { usersRouter, apiRouter };