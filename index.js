import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { authRouter, usersRouter, animalsRouter, tagsRouter, rolesRouter, photosRouter, avatarsRouter, adoptRouter } from "./app/routers/index.js";
const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";

import path from "path";
const currentFileUrl = import.meta.url;
const currentDirPath = path.dirname(currentFileUrl);
app.use(express.static(path.join(currentDirPath, 'public')));
app.use('/images', express.static(path.join(currentDirPath, 'public/images')));
app.use(cors())

/****************************/
/**** Swagger generator  ****/
/****************************/

// Définition des options de configuration de Swagger

import expressJSDocSwagger from 'express-jsdoc-swagger';


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
    baseDir: currentDirPath,
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


export default app;