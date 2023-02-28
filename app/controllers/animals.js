const { Animal, Tag } = require("../models");
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
            console.log("test id", req.params.id);
            console.log("test name", req.body.name)
            const animal = await Animal.update(req.params.id, req.body);
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

// START : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async getAnimalTags(req, res) {
        const animalId = req.params.id;
      
        try {
        const tags = await Animal.getAnimalTags(animalId);
          res.json(tags);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error getting animal tags - controller' });
        }
      },
      
    async addAnimalTag(req, res) {
        try {
        const tag = new Tag(req.body);
        const animal = new Animal(req.params);
        const tagExist = await tag.checkTagId(req.body.tag_id);
        const animalExist = await Animal.checkAnimal(req.params.id);
        if(tagExist){
            if(animalExist){
                const animalHasTag = await Animal.addAnimalTag(req.params.id, req.body.tag_id);
                res.json(animalHasTag);
            } else {
                // L'animal n'existe pas
                res.status(500).json({
                error: `L'animal avec l'id = ${req.params.id} n'existe pas !`
                });
            }
        } else {
            // Le tag n'existe pas
            res.status(500).json({
                error: `Le tag avec l'id = ${req.body.tag_id} n'existe pas !`
            });
        }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error adding animal tag' });
        }
      },

    async deleteAnimalTag(req, res) {
        try {
          await Animal.deleteAnimalTag(req.params.id, req.params.tagId);
          res.json({
            message: `L'association animal id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée` 
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error deleting animal tag' });
        }
      }
// END : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}

module.exports = animalsController;