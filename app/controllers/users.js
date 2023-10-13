import { User, Tag, Animal } from "../models/index.js";
import bcrypt from "bcrypt";
import { adminLog } from "../service/logger.js";
import debug from "debug";
const log = debug("controller:users");

const usersController = {
  // Récupère tous les utilisateurs
  async getAll(_, res, next) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Récupère un utilisateur dont le params.id correspond à l'id du token
  async getUser(req, res, next) {
    try {
      if (req.params.id == req.userProfil[0].id) {
        const user = await User.userFindByPk(req.params.id);
        res.json(user);
      } else {
        res.status(400).json({
          error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Récupère un utilisateur par un admin
  async adminGetUser(req, res, next) {
    try {
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (userExist) {
        const user = await User.userFindByPk(req.params.id);
        res.json(user);
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Ajoute un utilisateur
  async addUser(req, res, next) {
    try {
      req.body.email = req.body.email.toLowerCase(); // passe l'email en minuscule
      const email = new User(req.body);
      const emailExist = await email.checkEmail(req); // Controle si le mail existe déjà
      if (!emailExist) {
        req.body.password = await bcrypt.hash(req.body.password, 10); // Crypt password
        req.body.phone = req.body.phone.replace(/[-. ]/g, ""); // Supprime les espaces, tirets et points
        const user = await User.create(req.body);
        res.json({
          message: "l'utilisateur a bien été crée",
          user: user,
        });
      } else {
        res.status(409).json({
          message: "L'e-mail est déjà utilisé !",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Modification du profil utilisateur par son propriétaire
  async updateUser(req, res, next) {
    try {
      if (req.params.id == req.userProfil[0].id) {
        // Controle si l'id en param est == à l'id de l'utilisateur connecté,
        if (req.body.email) {
          // passe l'email en minuscule
          req.body.email = req.body.email.toLowerCase();
        }
        const userExist = new User(req.body); // info enregistré dans req.userProfil lors de l'authentification, pendant la vérification du token
        const emailExist = await userExist.checkEmail(); // Controle si le mail existe déjà
        if (!emailExist) {
          if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10); // Hash du mot de passe avec bcrypt
            const user = await User.update(req.params.id, req.body);
            res.json({
              message: "l'utilisateur a bien été modifié",
              user: user,
            });
          } else {
            // Uniquement si le mot de passe n'est pas modifié
            const user = await User.update(req.params.id, req.body);
            res.json({
              message: "l'utilisateur a bien été modifié",
              user: user,
            });
          }
        } else {
          res.status(409).json({
            error: "L'e-mail est déjà utilisé !",
          });
        }
      } else {
        res.status(400).json({
          error: "Ce n'est pas la bonne fiche, l'id ne correspond pas !",
        });
      }
    } catch {
      res.status(500).json(error.message);
      next(error);
    }
  },

  // Modifie un utilisateur par un admin
  async adminUpdateUser(req, res, next) {
    try {
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (userExist) {
        const user = await User.update(req.params.id, req.body);
        res.json({
          message: "le role a bien été modifié",
          user: user,
        });
        adminLog.log("info", {
          // Log l'action de changement du role de l'utilisateur par l'admin
          url: req.url,
          method: req.method,
          user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
          role: req.user.name,
          message: `Update de l'utilisateur avec l'id : ${req.params.id} au Role id de : ${req.body.role_id}`,
        });
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Supprime son compte utilisateur
  async deleteUser(req, res, next) {
    try {
      if (req.params.id == req.userProfil[0].id) {
        const user = await User.delete(req.params.id);
        res.json({
          message: "l'utilisateur a bien été supprimé",
          user: user,
        });
      } else {
        res.status(403).json({
          error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Supprime un utilisateur par un admin
  async adminDeleteUser(req, res, next) {
    try {
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (userExist) {
        const user = await User.delete(req.params.id);
        res.json({
          message: "l'utilisateur a bien été supprimé",
          user: user,
        });
        adminLog.log("info", {
          // Log l'action de suppression d'un utilisateur par l'admin
          url: req.url,
          method: req.method,
          user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
          role: req.user.name,
          message: `Suppression de l'utilisateur : ${req.params.id} - ${user[0].email} - role_id : ${user[0].role_id}`,
        });
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  //  Récupère les tags de l'utilisateur
  async getUserTags(req, res, next) {
    try {
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (userExist) {
        const userId = req.params.id;
        const tags = await User.getUserTags(userId);
        res.json(tags);
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Ajoute un tag à l'utilisateur
  async addUserTag(req, res, next) {
    try {
      // const tag = new Tag(req.body);
      const tagExist = await Tag.checkTagId(req.body.tag_id); // Vérifie si le tag existe
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (tagExist) {
        if (userExist) {
          const userHasTag = await User.addUserTag(
            req.params.id,
            req.body.tag_id
          );
          res.json({
            message: "le tag a bien été ajouté",
            user: userHasTag,
          });
        } else {
          res.status(404).json({
            error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
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

  // Supprime le tag d'un utilisateur
  async deleteUserTag(req, res, next) {
    try {
      // const tag = new Tag(req.body);
      const tagExist = await Tag.checkTagId(req.params.tagId); // Vérifie si le tag existe
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (userExist) {
        if (tagExist) {
          await User.deleteUserTag(req.params.id, req.params.tagId);
          res.json({
            message: `L'association user id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée`,
          });
        } else {
          res.status(404).json({
            error: `Le tag avec l'id = ${req.params.tagId} n'existe pas !`,
          });
        }
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Système de matching - Compare les tags d'un utilisateur à ceux de tous les animaux
  async matching(req, res, next) {
    try {
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      if (userExist) {
        const matching = await User.matchingAll(req.params.id);
        const animals = {}; // Créer un objet qui contient les informations regroupées par nom d'animal
        matching.forEach((row) => {
          const animalId = row.animal_id;
          const animalName = row.animal_name;
          if (!animals[animalName]) {
            animals[animalName] = {
              id: animalId,
              name: animalName,
              tags: [],
            };
          }
          animals[animalName].tags.push({
            tag_id: row.tag_id,
            tag_name: row.tag_name,
            priority: row.priority,
          });
        });
        const finalResult = Object.values(animals); // Convertir l'objet en tableau
        res.json(finalResult);
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Compare les tags d'un utilisateur à un animal
  async matchingOne(req, res, next) {
    try {
      const userExist = await User.checkUser(req.params.id); // Vérifie si l'utilisateur existe
      const animalExist = await Animal.checkAnimal(req.params.animalId); // Vérifie si l'animal existe
      if (userExist) {
        if (animalExist) {
          const matching = await User.matchingOne(
            req.params.id,
            req.params.animalId
          );
          res.json(matching);
        } else {
          res.status(404).json({
            error: `L'animal' avec l'id = ${req.params.animalId} n'existe pas !`,
          });
        }
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },
};

export default usersController;
