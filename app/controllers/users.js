import { User, Tag } from "../models/index.js";
import bcrypt from "bcrypt";

const usersController = {
  // Récupère tous les utilisateurs
  async getAll(req, res, next) {
    try {
    const users = await User.findAll();
    if (users) {
      res.json(users);
    } else {
      res.status(500).json({
        message: "Il y a une erreur interne"
      });
    }
  }
  catch {
    next(new Error("Problème de BDD"));
  }
  },
  // Récupère un utilisateur dont le params.id correspond à l'id du token
  async getUser(req, res, next) {
    if (req.params.id == req.userProfil[0].id) {
      const user = await User.userFindByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        next(new Error("Problème de BDD"));
      }
    } else {
      res.status(500).json({
        error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
      });
    }
  },

  // Récupère un utilisateur par un admin
  async adminGetUser(req, res, next) {
    const user = await User.userFindByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Ajoute un utilisateur
  async addUser(req, res, next) {
    const email = new User(req.body);
    const emailExist = await email.checkEmail(); // Controle si le mail existe déjà
    if (!emailExist) {
      req.body.password = await bcrypt.hash(req.body.password, 10); // Crypt password
      req.body.phone = req.body.phone.replace(/[-. ]/g, ""); // Supprime les espaces, tirets et points
      const user = await User.create(req.body);
      if (user) {
        res.json(user);
      } else {
        next(new Error("Problème de BDD"));
      }
    } else {
      res.status(500).json({
        error: "L'e-mail est déjà utilisé !",
      });
    }
  },
  // Modification du profil utilisateur par son propriétaire
  async updateUser(req, res, next) {
    if (req.params.id == req.userProfil[0].id) {
      const userExist = new User(req.body);
      const emailExist = await userExist.checkEmail(); // Controle si le mail existe déjà
      if (!emailExist) {
        if (req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
          const user = await User.update(req.params.id, req.body);
          if (user) {
            res.json(user);
          } else {
            next(new Error("Problème de BDD"));
          }
        } else {
          const user = await User.update(req.params.id, req.body);
          if (user) {
            res.json(user);
          } else {
            next(new Error("Problème de BDD"));
          }
        }
      } else {
        res.status(500).json({
          error: "L'e-mail est déjà utilisé !",
        });
      }
    } else {
      res.status(500).json({
        error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
      });
    }
  },

  // Modifie un utilisateur par un admin
  async adminUpdateUser(req, res, next) {
    const user = await User.update(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Supprime son compte utilisateur
  async deleteUser(req, res, next) {
    if (req.params.id == req.userProfil[0].id) {
      const user = await User.delete(req.params.id);
      if (user) {
        res.json({
          message: "l'utilisateur a bien été supprimé",
          user: user,
        });
      } else {
        next(new Error("Problème de BDD"));
      }
    } else {
      res.status(500).json({
        error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
      });
    }
  },

  // Supprime un utilisateur par un admin
  async adminDeleteUser(req, res, next) {
    const user = await User.delete(req.params.id);
    if (user) {
      res.json({
        message: "l'utilisateur a bien été supprimé",
        user: user,
      });
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  //  Récupère les tags de l'utilisateur
  async getUserTags(req, res) {
    const userId = req.params.id;
    const tags = await User.getUserTags(userId);
    if (tags) {
      res.json(tags);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Ajoute un tag à l'utilisateur
  async addUserTag(req, res) {
    const tag = new Tag(req.body);
    const tagExist = await tag.checkTagId(req.body.tag_id);
    const userExist = await User.checkUser(req.params.id);
    if (tagExist) {
      if (userExist) {
        const userHasTag = await User.addUserTag(
          req.params.id,
          req.body.tag_id
        );
        res.json(userHasTag);
      } else {
        res.status(500).json({
          error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } else {
      res.status(500).json({
        error: `Le tag avec l'id = ${req.body.tag_id} n'existe pas !`,
      });
    }
  },

  // Supprime le tag d'un utilisateur
  async deleteUserTag(req, res) {
    await User.deleteUserTag(req.params.id, req.params.tagId);
    res.json({
      message: `L'association user id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée`,
    });
  },

  // Système de matching - Compare les tags d'un utilisateur à ceux de tous les animaux
  async matching(req, res, next) {
    const matching = await User.matchingAll(req.params.id);
    if (matching) {
      // Créer un objet qui contient les informations regroupées par nom d'animal
      const animals = {};
      matching.forEach((row) => {
        const animalId = row.animal_id;
        const animalName = row.animal_name;
        console.log("animalName : ", matching);
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

      // Convertir l'objet en tableau
      const finalResult = Object.values(animals);

      // Renvoyer la réponse JSON
      res.json(finalResult);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Compare les tags d'un utilisateur à un animal
  async matchingOne(req, res, next) {
    const matching = await User.matchingOne(req.params.id, req.params.animalId);
    if (matching) {
      res.json(matching);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
};

export default usersController;
