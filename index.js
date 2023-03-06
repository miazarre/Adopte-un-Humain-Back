import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { authRouter, usersRouter, animalsRouter, tagsRouter, rolesRouter, photosRouter, avatarsRouter, adoptRouter } from './app/routers/index.js';
import expressJSDocSwagger from 'express-jsdoc-swagger';
const app = express();
dotenv.config();
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(__dirname, './public/')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cors())

/****************************/
/**** Swagger generator  ****/
/****************************/

// Définition des options de configuration de Swagger

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

/* Autorisation de recevoir des données de type JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Mise en place du router */
app.use("/api",authRouter, usersRouter, animalsRouter, tagsRouter, rolesRouter, photosRouter, avatarsRouter, adoptRouter);


/* Lancement du serveur */
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server ready : http://${process.env.APP_URL}:${PORT}`);
});

export default app;