const express = require('express');
const { animalsController } = require('../controllers');
const router = express.Router();
const multer = require('multer');

// Import de 'multer' et création d'un objet de configuration pour gérer l'upload des fichiers.
// La fonction 'diskStorage()' permet de créer un objet de configuration qui définit le répertoire de destination où les fichiers téléchargés seront stockés et le nom de fichier qui sera utilisé.
// 'uploads/' est le dossier où sont stockées les images.
// 'cb' est un callback appelé losque le fichier imgage est uploadé.
// 'file.fieldname' permet d'obtenir le nom du champ de formulaire dans lequel le fichier a été téléchargé, et de l'utiliser comme préfixe pour le nom de fichier généré.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/")
    },
    filename: function (req, file, cb) {
// si les images ont une extension .png
      cb(null, file.fieldname + '-' + '.png')
    }
  })
  
  const upload = multer({ storage: storage })


/**
 * GET /api/animals
 * @summary Récupère tous les animals
 * @tags ANIMAL
 * @return {string} 200 - all animals
 * @return {object} 500 - Unexpected error
 */

router.get('/animals', animalsController.getAll);

/**
 * POST /api/animals
 * @summary Crée un animal
 * @tags ANIMAL
 * @return {string} 200 - new animal
 * @return {object} 500 - Unexpected error
 */

router.post('/animal', upload.array('files'), animalsController.addAnimal);
// upload.array("files")
/**
 * GET /api/animals/:id
 * @summary Récupère un animal
 * @tags ANIMAL
 * @return {string} 200 - one animal
 * @return {object} 500 - Unexpected error
 */

router.get('/animal/:id', animalsController.getAnimal);

/**
 * PATCH /api/animals/:id
 * @summary Modifie un animal
 * @tags ANIMAL
 * @return {string} 200 - update animal
 * @return {object} 500 - Unexpected error
 */

router.patch('/animal/:id', animalsController.updateAnimal);

/**
 * DELETE /api/animals/:id
 * @summary Supprime un animal
 * @tags ANIMAL
 * @return {string} 200 - delete animal
 * @return {object} 500 - Unexpected error
 */

router.delete('/animal/:id', animalsController.deleteAnimal);


module.exports = router;