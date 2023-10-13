import path from "path";
import fs from "fs";
import debug from "debug";
const log = debug("controller:photos");

const photosController = {
  // Permet d'afficher l'image
  async getPhotoAnimal(req, res, next) {
    try {
      const filename = req.params.filename;
      const filePath = path.resolve("public/images/animals", filename);

      if (fs.existsSync(filePath)) {
        // vérification si l'image existe
        const fileStream = fs.createReadStream(filePath); // Créer un flux de lecture à partir du fichier
        fileStream.pipe(res); // Envoyer le flux de lecture en tant que réponse
      } else {
        res.status(404).json({
          message: "l'image n'est pas trouvé",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },
};

export default photosController;
