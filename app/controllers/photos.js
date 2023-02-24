const path = require('path');
const fs = require('fs');

const photosController = {
    async getPhoto(req, res, next) {
        try {
            const filename = req.params.filename;
            const filePath = path.resolve('public/images/', filename);
            // vérification si l'image existe
            if (fs.existsSync(filePath)) {
                    // Créer un flux de lecture à partir du fichier
                    const fileStream = fs.createReadStream(filePath);
                    // Envoyer le flux de lecture en tant que réponse
                    fileStream.pipe(res);
            } else {
                // Le fichier n'existe pas
                res.sendStatus(404);
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    }   
}

module.exports = photosController;