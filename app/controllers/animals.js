import { Animal, Tag } from "../models/index.js";
import { adminLog } from "../service/logger.js";
import fs from "fs";
import path from "path";
import * as url from "url";
import debug from "debug";
const log = debug("controller:animals");
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const imageDirectory = path.join(__dirname, "../../public/images/animals");

const animalsController = {
  // Récupère tous les animaux
  async getAll(_, res, next) {
    try {
      const animals = await Animal.findAll();
      res.json(animals);
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Récupère un animal
  async getAnimal(req, res, next) {
    try {
      const animalId = await Animal.findByPk(req.params.id); // Contrôle si l' animal existe
      if (animalId) {
        const animal = await Animal.findByPk(req.params.id);
        res.json(animal);
      } else {
        res.status(404).json({
          error: `L'animal' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },
  // Ajoute un animal
  async addAnimal(req, res, next) {
    try {
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

      const addAnimal = await Animal.create(data);
      res.json({
        message: "l'animal a bien été crée",
        animal: addAnimal,
      });
      adminLog.log("info", {
        // Log l'action de création d'un tag
        url: req.url,
        method: req.method,
        user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
        role: req.user.name,
        message: `Création de l'animal nom : ${req.body.name}`,
      });
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Modifie un animal
  async updateAnimal(req, res, next) {
    try {
      const animalId = await Animal.findByPk(req.params.id); // Vérification si l'id existe
      if (animalId) {
        const data = {};
        const animalPhotos = await Animal.findByPk(req.params.id);

        // Mettre à jour les photos et enregistrer les noms de fichiers mis à jour
        const updatedPhotoFileNames = [];
        for (let i = 1; i <= 4; i++) {
          const photoFieldName = `photo${i}`;
          const photoFile = req.files[photoFieldName]
            ? req.files[photoFieldName][0]
            : null; // Opérateur ternaire si une photo a été téléchargé
          const oldPhotoFileName = animalPhotos[photoFieldName];
          if (photoFile) {
            const newPhotoFileName = photoFile.filename;
            updatedPhotoFileNames.push({
              fieldName: photoFieldName,
              oldFileName: oldPhotoFileName,
              newFileName: newPhotoFileName,
            });
            data[photoFieldName] = newPhotoFileName;
          }
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

        const updatedAnimal = await Animal.update(req.params.id, data);

        // Supprimer les anciennes photos du répertoire si elles ont été mises à jour
        for (const updatedPhotoFileName of updatedPhotoFileNames) {
          if (updatedPhotoFileNames.oldFileName) {
            const oldPhotoFilePath = path.join(
              imageDirectory,
              updatedPhotoFileName.oldFileName
            );
            fs.unlink(oldPhotoFilePath, (err) => {
              if (err) {
                console.error(
                  `Erreur lors de la suppression du fichier ${oldPhotoFilePath}:`,
                  err
                );
              } else {
                console.log(`Le fichier ${oldPhotoFilePath} a été supprimé.`);
              }
            });
          }
        }
        res.json({
          message: "l'animal a bien été modifié",
          animal: updatedAnimal,
        });
        adminLog.log("info", {
          // Log l'action de création d'un tag
          url: req.url,
          method: req.method,
          user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
          role: req.user.name,
          message: `Modification de l'animal nom : ${animalId.name}`,
        });
      } else {
        res.status(400).json({
          error: `l'animal avec l'id : ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Supprime un animal
  async deleteAnimal(req, res, next) {
    try {
      const animalExist = await Animal.checkExist(req.params.id);
      if (animalExist) {
        const animalPhotos = await Animal.findByPk(req.params.id);
        for (let i = 1; i <= 4; i++) {
          // Récupère le nom des photos de l'animal et les supprimes
          const photoFieldName = `photo${i}`;
          const photoFileName = animalPhotos[photoFieldName];
          if (photoFileName) {
            const photoFilePath = path.join(imageDirectory, photoFileName);
            fs.unlink(photoFilePath, (err) => {
              if (err) {
                console.error(
                  `Erreur lors de la suppression du fichier ${photoFilePath}:`,
                  err
                );
              } else {
                console.log(`Le fichier ${photoFilePath} a été supprimé.`);
              }
            });
          }
        }
        const animal = await Animal.delete(req.params.id);
        res.json({
          message: "l'animal a bien été supprimé'",
          animal: animal,
        });
        adminLog.log("info", {
          // Log l'action de suppression d'un animal
          url: req.url,
          method: req.method,
          user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
          role: req.user.name,
          message: `Suppression de l'animal'  name : ${animal[0].name} - id : ${req.params.id}`,
        });
      } else {
        res.status(404).json({
          error: "L'id de l'animal n'existe pas",
        });
      }
    } catch {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Récupère les tags de l'animal
  async getAnimalTags(req, res, next) {
    try {
      const animalExist = await Animal.checkExist(req.params.id);
      if (animalExist) {
        const animalId = req.params.id;
        const tags = await Animal.getAnimalTags(animalId);
        res.json(tags);
      } else {
        res.status(404).json({
          error: "L'id de l'animal n'existe pas",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Ajoute un tag à l'animal
  async addAnimalTag(req, res, next) {
    try {
      const tagExist = await Tag.checkExist(req.body.tag_id);
      const animalExist = await Animal.checkAnimal(req.params.id);
      if (tagExist) {
        if (animalExist) {
          const animalHasTag = await Animal.addAnimalTag(
            req.params.id,
            req.body.tag_id
          );
          res.json({
            message: "le tag a bien été ajouté à l'animal",
            animal: animalHasTag,
          });
        } else {
          res.status(404).json({
            error: `L'animal avec l'id = ${req.params.id} n'existe pas !`,
          });
        }
      } else {
        res.status(404).json({
          error: `Le tag avec l'id = ${req.body.tag_id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Supprime un tag à l'animal
  async deleteAnimalTag(req, res, next) {
    try {
      const animalExist = await Animal.checkExist(req.params.id);
      const tagExist = await Tag.checkExist(req.params.tagId);
      if (animalExist) {
        if (tagExist) {
          await Animal.deleteAnimalTag(req.params.id, req.params.tagId);
          res.json({
            message: `L'association animal id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée`,
          });
        } else {
          res.status(404).json({
            error: `Le tag avec l'id = ${req.params.tagId} n'existe pas !`,
          });
        }
      } else {
        res.status(404).json({
          error: `L'animal' avec l'id  = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },
};

export default animalsController;
