const express = require('express');
const session = require('express-session');
const {apiRouter} = require('./router');

const app = express();

// Configuration des sessions
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: (1000*60*60)
	},
};

// Mise en place des sessions
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);

// Autorisation de recevoir des données de type JSON
app.use(express.json());

// Mise en place des routers
app.use("/api",apiRouter);

// j'exporte l'app et la config de la session
module.exports = {app,sessionMiddleware};