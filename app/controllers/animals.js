const { Animal } = require("../models");
const multer = require('multer');

const animalsController = {

    /**
     * Récupère la liste des animaux
     * @returns Liste des animaux
     */
    async getAll(_, res, next) {
        try {
            const animals = await Animal.findAll();
            if(animals) {
                res.json(animals);
            } else {
                next(new Error("Problème de BDD"));
            } 
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }  
    },

   // Récupère un animal
    async getAnimal(req, res, next) {
        try {
            const animal = await Animal.findByPk(req.params.id);
            if(animal) {
                res.json(animal);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Ajoute un animal
    async addAnimal(req, res, next) {
        try {        
            // Pour chaque images récupérer je les mets dans mon req.body
            if(req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    let count = i + 1;
                    req.body[`photo${count}`] = req.files[i].filename;
                    console.log(req.body);
                }
            }

            // const animal = new Animal(req.body);

            const addAnimal = await Animal.create(req.body);
            if (addAnimal) {
                res.json(addAnimal);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }        
    },

    // Modifie un animal
    async updateAnimal(req, res, next) {
        try {
          const animalId = req.params.id;
          const data = {};
      
          // Vérifie si de nouvelles images sont envoyées
          if (req.files && req.files.length > 0) {
            for (let i = 0; i < Math.min(4, req.files.length); i++) {
            data[`photo${i + 1}`] = req.files[i].filename;
        }
      }
      
          // Vérifie si un nouveau nom est envoyé
          if (req.body.name) {
            data.name = req.body.name;
          }
      
          // Met à jour l'avatar en BDD
          const updatedAnimal = await Animal.update(animalId, data);
      
          // Retourne l'avatar modifié
          if(updatedAnimal) {
            res.json(updatedAnimal);
        } else {
            next(new Error("Problème de BDD"));
        }
    } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

    // Supprime un animal
    async deleteAnimal(req,res,next){
        try {
            const animal = await Animal.delete(req.params.id);
            if (animal) {
                res.json(animal);
            }
            else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
}

module.exports = animalsController;