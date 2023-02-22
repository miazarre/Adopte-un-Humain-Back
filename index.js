require("dotenv").config();
const express = require('express');
const session = require('express-session');
const { authRouter, usersRouter, animalsRouter } = require("./app/router/index");
const app = express();
const PORT = process.env.PORT || 3000;


/****************************/
/**** Swagger generator  ****/
/****************************/

// Définition des options de configuration de Swagger

const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
        title: 'J\'Adopte un humain',
		description: 'My API with Swagger documentation',
        license: {
            name: 'MIT',
        },
    },
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
};

// Appel de la fonction expressJSDocSwagger() pour lui passer les options de configuration
expressJSDocSwagger(app)(options);
// Montage de l'interface utilisateur Swagger sur une route spécifique
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup);


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