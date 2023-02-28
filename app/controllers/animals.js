const { Animal } = require("../models");
const cleanPhotos = require("../script/cleanPhoto");

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
          const animalId =  await Animal.findByPk(req.params.id);      // Vérification si l'id existe
          if(animalId) {    
            const data = {}                 
            if(req.files.photo1) {
                data.photo1 = req.files.photo1[0].filename
            }
            if(req.files.photo2) {
                data.photo2 = req.files.photo2[0].filename
            }
            if(req.files.photo3) {
                data.photo3 = req.files.photo3[0].filename
            }
            if(req.files.photo4) {
                data.photo4 = req.files.photo4[0].filename
            }
            if(req.body.name) {
                data.name = req.body.name
            }
            if(req.body.description) {
                data.description = req.body.description
            }
            if(req.body.needs) {
                data.needs = req.body.needs
            }
            if(req.body.status) {
                data.status = req.body.status
            }
            if(req.body.resume) {
                data.resume = req.body.resume
            }
            if(req.body.birthdate) {
                data.birthdate = req.body.birthdate
            }
            
            // Met à jour de l'animal en BDD
            const updatedAnimal = await Animal.update(req.params.id, data);
            // Retourne l'animal modifié
            if(updatedAnimal) {
                res.json(updatedAnimal);
            } else {
                next(new Error("Problème de BDD"));
            }
      
          } else {
            res.status(400).json({error: `l'animal avec l'id : ${req.params.id} n'existe pas !`})
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