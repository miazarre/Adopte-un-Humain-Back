const { Animal } = require("../models");


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
        const animal = await Animal.create(req.body);
        if(animal) {

        //photo1: req.files.photo1[0].filename,
        //photo2: req.files.photo2[0].filename,
        //photo3: req.files.photo3[0].filename,
        //photo4: req.files.photo4[0].filename,


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