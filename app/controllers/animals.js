import { Animal, Tag } from "../models/index.js";
import clean from "../script/cleanPhoto.js";

const animalsController = {
      // Récupère tous les animaux
    async getAll(req, res, next) {
      try {
        const animals = await Animal.findAll();
        if (!animals) {
          const error = new Error('Problème de BDD');
          error.statusCode = 404;
          throw error;
        }
        res.json(animals);
      } catch (error) {
        next(error);
      }
    },

  // Récupère un animal
  async getAnimal(req, res, next) {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
      res.json(animal);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Ajoute un animal
  async addAnimal(req, res, next) {
    const data = {};
    if (req.files.photo1) {
      data.photo1 = req.files.photo1[0].filename;
    }
    if (req.files.photo2) {
      data.photo2 = req.files.photo2[0].filename;
    }
    if (req.files.photo3) {
      data.photo3 = req.files.photo3[0].filename;
    }
    if (req.files.photo4) {
      data.photo4 = req.files.photo4[0].filename;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.description) {
      data.description = req.body.description;
    }
    if (req.body.needs) {
      data.needs = req.body.needs;
    }
    if (req.body.status) {
      data.status = req.body.status;
    }
    if (req.body.resume) {
      data.resume = req.body.resume;
    }
    if (req.body.birthdate) {
      data.birthdate = req.body.birthdate;
    }

    // const animal = new Animal(req.body);
    const addAnimal = await Animal.create(data);
    if (addAnimal) {
      clean.deleteAnimalsFiles();
      res.json(addAnimal);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Modifie un animal
  async updateAnimal(req, res, next) {
    const animalId = await Animal.findByPk(req.params.id); // Vérification si l'id existe
    if (animalId) {
      const data = {};
      if (req.files.photo1) {
        data.photo1 = req.files.photo1[0].filename;
      }
      if (req.files.photo2) {
        data.photo2 = req.files.photo2[0].filename;
      }
      if (req.files.photo3) {
        data.photo3 = req.files.photo3[0].filename;
      }
      if (req.files.photo4) {
        data.photo4 = req.files.photo4[0].filename;
      }
      if (req.body.name) {
        data.name = req.body.name;
      }
      if (req.body.description) {
        data.description = req.body.description;
      }
      if (req.body.needs) {
        data.needs = req.body.needs;
      }
      if (req.body.status) {
        data.status = req.body.status;
      }
      if (req.body.resume) {
        data.resume = req.body.resume;
      }
      if (req.body.birthdate) {
        data.birthdate = req.body.birthdate;
      }

      // Met à jour de l'animal en BDD
      const updatedAnimal = await Animal.update(req.params.id, data);
      // Retourne l'animal modifié
      if (updatedAnimal) {
        clean.deleteAnimalsFiles();
        res.json(updatedAnimal);
      } else {
        next(new Error("Problème de BDD"));
      }
    } else {
      clean.deleteAnimalsFiles();
      res
        .status(400)
        .json({
          error: `l'animal avec l'id : ${req.params.id} n'existe pas !`,
        });
    }
  },

  // Supprime un animal
  async deleteAnimal(req, res, next) {
    const animal = await Animal.delete(req.params.id);
    if (animal) {
      clean.deleteAnimalsFiles();
      res.json(animal);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Récupère les tags de l'animal
  async getAnimalTags(req, res) {
    const animalId = req.params.id;

    const tags = await Animal.getAnimalTags(animalId);
    if (tags) {
      res.json(tags);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Ajoute un tag à l'animal
  async addAnimalTag(req, res) {
    const tag = new Tag(req.body);
    const tagExist = await tag.checkTagId(req.body.tag_id);
    const animalExist = await Animal.checkAnimal(req.params.id);
    if (tagExist) {
      if (animalExist) {
        const animalHasTag = await Animal.addAnimalTag(
          req.params.id,
          req.body.tag_id
        );
        res.json(animalHasTag);
      } else {
        // L'animal n'existe pas
        res.status(500).json({
          error: `L'animal avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } else {
      // Le tag n'existe pas
      res.status(500).json({
        error: `Le tag avec l'id = ${req.body.tag_id} n'existe pas !`,
      });
    }
  },
  // Supprime un tag à l'animal
  async deleteAnimalTag(req, res) {
    await Animal.deleteAnimalTag(req.params.id, req.params.tagId);
    res.json({
      message: `L'association animal id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée`,
    });
  },
};

export default animalsController;