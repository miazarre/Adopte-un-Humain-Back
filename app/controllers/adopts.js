import { Adopt, Animal, User } from "../models/index.js";
import { adminLog } from "../service/logger.js";
import debug from "debug";
const log = debug("controller:adopts");

const adoptsController = {
  //Récupère toutes les adoptions
  async getAll(_, res, next) {
    try {
      const adopts = await Adopt.findAll();
      res.json(adopts);
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Récupère une adoption par l'utilisateur
  async getAdopt(req, res, next) {
    try {
      const adopt = await Adopt.findByPk(req.params.id);
      if (req.userProfil[0].id == adopt.user_id) {
        if (adopt) {
          res.json(adopt);
        } else {
          res.status(404).json({
            error: `L'adoption' avec l'id = ${req.params.id} n'existe pas !`,
          });
        }
      } else {
        res.status(500).json({
          error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Récupère une adoption par un admin ou un membre du staff
  async adminGetAdopt(req, res, next) {
    try {
      const adopt = await Adopt.findByPk(req.params.id);
      if (adopt) {
        res.json(adopt);
      } else {
        res.status(404).json({
          error: `L'adoption' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Ajoute une adoption
  async addAdopt(req, res, next) {
    try {
      const userExist = await User.checkExist(req.body.user_id);
      const animalExist = await Animal.checkExist(req.body.animal_id);
      if (userExist) {
        if (animalExist) {
          const addAdopt = await Adopt.create(req.body);
          res.json(addAdopt);
        } else {
          res.status(404).json({
            error: `L'animal' avec l'id = ${req.body.animal_id} n'existe pas !`,
          });
        }
      } else {
        res.status(404).json({
          error: `L'utilisateur' avec l'id = ${req.body.user_id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Modifie une adoption
  async updateAdopt(req, res, next) {
    try {
      const adoptExist = await Adopt.checkExist(req.params.id);
      if (adoptExist) {
        const adopt = await Adopt.update(req.params.id, req.body);
        res.json({
          message: "l'adoption a bien été mis à jour",
          adopt: adopt,
        });
        adminLog.log("info", {
          // Log l'action de mise à jour d'une adoption
          url: req.url,
          method: req.method,
          user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
          role: req.user.name,
          message: `Mise à jour de l'adoption id : ${req.params.id}`,
        });
      } else {
        res.status(404).json({
          error: `L'adoption' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },

  // Supprime une adoption
  async deleteAdopt(req, res, next) {
    try {
      const adoptExist = await Adopt.checkExist(req.params.id);
      if (adoptExist) {
        const adopt = await Adopt.delete(req.params.id);
        res.json({
          message: "l'adoption a bien été supprimé'",
          adopt: adopt,
        });
        adminLog.log("info", {
          // Log l'action de suppression d'un animal
          url: req.url,
          method: req.method,
          user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
          role: req.user.name,
          message: `Suppression de l'adoption' id : ${req.params.id}`,
        });
      } else {
        res.status(404).json({
          error: `L'adoption' avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },
};

export default adoptsController;
