import { Adopt } from "../models/index.js";

const adoptsController = {

    //Récupère toutes les adoptions
    async getAll(_, res, next) {
        try {
            const adopts = await Adopt.findAll();
            if(adopts) {
                res.json(adopts);
            } else {
                next(new Error("Problème de BDD"));
            }  
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        } 
    },
   // Récupère une adoption
    async getAdopt(req, res, next) {
        try {      
            const adopt = await Adopt.findByPk(req.params.id);
            if(req.userProfil[0].id == adopt.user_id) {
                if(adopt) {
                    res.json(adopt);
                } else {
                    next(new Error("Problème de BDD"));
                }
            } else {
                res.status(500).json({
                error: "Ce n'est pas votre fiche, l'id ne correspond pas !"
                });
            }
            
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Récupère une adoption par un admin ou un membre du staff
    async adminGetAdopt(req, res, next) {
        try {      
            const adopt = await Adopt.findByPk(req.params.id);
            
            if(adopt) {
                res.json(adopt);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Ajoute une adoption
    async addAdopt(req, res, next) {
        try{
          const addAdopt = await Adopt.create(req.body);
          if (addAdopt) {
            res.json(addAdopt);
          } else {
            next(new Error("Problème de BDD"));
          }  
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }      
    },
    // Modifie une adoption
    async updateAdopt(req, res, next) {
        try {
            const adopt = await Adopt.update(req.params.id, req.body);
            if(adopt) {
                res.json(adopt);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Supprime une adoption
    async deleteAdopt(req,res,next){
        try {
            const adopt = await Adopt.delete(req.params.id);
            if (adopt) {
                res.json(adopt);
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

export default adoptsController;