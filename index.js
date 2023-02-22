require("dotenv").config();
const express = require('express');
const session = require('express-session');
const { authRouter, usersRouter, animalsRouter } = require("./app/router/index");
const app = express();
const PORT = process.env.PORT || 3000;

/* Configuration des sessions */
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: (1000*60*60)
	},
};

app.use(express.static('public'));

/* Autorisation de recevoir des données de type JSON */
app.use(express.json());

/* Mise en place des sessions */
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);

/* Mise en place du router */
app.use("/api",authRouter, usersRouter, animalsRouter);


app.listen(PORT, () => {
  console.log(`Server ready : http://localhost:${PORT}`);
});


module.exports = { app, sessionMiddleware};