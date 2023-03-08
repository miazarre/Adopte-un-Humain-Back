import { Adopt } from "../models/index.js";

const adoptsController = {
    //Récupère toutes les adoptions
    async getAll(_, res, next) {
        const adopts = await Adopt.findAll();
        if (adopts) {
        res.json(adopts);
        } else {
        next(new Error("Problème de BDD"));
        }
  },
  // Récupère une adoption
  async getAdopt(req, res, next) {
    const adopt = await Adopt.findByPk(req.params.id);
    if (req.userProfil[0].id == adopt.user_id) {
      if (adopt) {
        res.json(adopt);
      } else {
        next(new Error("Problème de BDD"));
      }
    } else {
      res.status(500).json({
        error: "Ce n'est pas votre fiche, l'id ne correspond pas !",
      });
    }
  },
  // Récupère une adoption par un admin ou un membre du staff
  async adminGetAdopt(req, res, next) {
    const adopt = await Adopt.findByPk(req.params.id);

    if (adopt) {
      res.json(adopt);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Ajoute une adoption
  async addAdopt(req, res, next) {
    const addAdopt = await Adopt.create(req.body);
    if (addAdopt) {
      res.json(addAdopt);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Modifie une adoption
  async updateAdopt(req, res, next) {
    const adopt = await Adopt.update(req.params.id, req.body);
    if (adopt) {
      res.json(adopt);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Supprime une adoption
  async deleteAdopt(req, res, next) {
    const adopt = await Adopt.delete(req.params.id);
    if (adopt) {
      res.json(adopt);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
};

export default adoptsController;
