const { Animal } = require("../model");
const fs = require('fs');
const multer = require('multer');


const animalsController = {

    async addAnimal(req, res, next) {
        // Utiliser le middleware Multer pour gérer les téléchargements d'images d'animaux
        const upload = multer({
          storage: multer.diskStorage({
            destination: (req, file, cb) => {
              // Créer un répertoire pour l'animal s'il n'existe pas déjà
              const animalDir = `uploads/${req.params.animalName}`;
              if (!fs.existsSync(animalDir)) {
                fs.mkdirSync(animalDir);
              }
              // Enregistrer l'image dans le répertoire de l'animal
              cb(null, animalDir);
            },
            filename: (req, file, cb) => {
              // Utiliser le nom d'origine de l'image
              cb(null, file.originalname);
            }
          })
        }).single('image');
    
        upload(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
            return res.status(400).send('Une erreur est survenue lors du téléchargement de l\'image');
          } else if (err) {
            return res.status(400).send('Une erreur est survenue lors du téléchargement de l\'image');
          }
    
          // Si l'animal a une image, ajouter le nom du fichier dans la base de données
          const animalData = req.body;
          if (req.file) {
            animalData.image = req.file.filename;
          }
    
          const animal = await Animal.create(animalData);
          if (animal) {
            res.json(animal);
          } else {
            next(new Error("Problème de BDD"));
          }
        });
      },



    /**
     * Récupère la liste des animaux
     * @returns Liste des animaux
     */
    async getAll(_, res, next) {
        const animals = await Animal.findAll();
        if(animals) {
            res.json(animals);
        } else {
            next(new Error("Problème de BDD"));
        }   
    },

   // Récupère un animal
    async getAnimal(req, res, next) {
        const animal = await Animal.findByPk(req.params.id);
        if(animal) {
            res.json(animal);
        } else {
            next(new Error("Problème de BDD"));
        }
    },
    // Ajoute un animal
    async addAnimal(req, res, next) {
        const animal = await Animal.create(req.body);
        if(animal) {
            res.json(animal);
        } else {
            next(new Error("Problème de BDD"));
        }
    },
    // Modifie un animal
    async updateAnimal(req, res, next) {
        const animal = await Animal.update(req.params.id, req.body);
        if(animal) {
            res.json(animal);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

    // Supprime un animal
    async deleteAnimal(req,res,next){
        const animal = await Animal.delete(req.params.id);
        if (animal) {
            res.json(animal);
        }
        else {
            next(new Error("Problème de BDD"));
        }
    },
}

module.exports = animalsController;