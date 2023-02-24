const { Animal } = require("../models");
const multer = require('multer');

const animalsController = {

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

        console.log(req.body);
        console.log(req.files);
        
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