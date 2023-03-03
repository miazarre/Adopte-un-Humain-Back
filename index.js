require("dotenv").config();
const express = require('express');
const { authRouter, usersRouter, animalsRouter, tagsRouter, rolesRouter, photosRouter, avatarsRouter, adoptRouter } = require("./app/routers/index");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');


const path = require('path');
app.use(express.static(path.join(__dirname, './public/')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cors())

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
        bearerAuth: {
            type: 'http',
            scheme: 'bearer'
        }
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js'
};

// Appel de la fonction expressJSDocSwagger() pour lui passer les options de configuration
expressJSDocSwagger(app)(options);
// Montage de l'interface utilisateur Swagger sur une route spécifique
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup);


/* Autorisation de recevoir des données de type JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Mise en place du router */
app.use("/api",authRouter, usersRouter, animalsRouter, tagsRouter, rolesRouter, photosRouter, avatarsRouter, adoptRouter);


app.listen(PORT, () => {
  console.log(`Server ready : http://localhost:${PORT}`);
});


module.exports = app ;