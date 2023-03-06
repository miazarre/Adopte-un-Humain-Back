import { Tag } from "../models/index.js";


const tagsController = {

    // Récupère tous les tags
    async getAll(_, res, next) {
        try {
            const tags = await Tag.findAll();
            if(tags) {
                res.json(tags);
            } else {
                next(new Error("Problème de BDD"));
            }  
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        } 
    },

   // Récupère un tag
    async getTag(req, res, next) {
        try {
            const tag = await Tag.findByPk(req.params.id);
            if(tag) {
                res.json(tag);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Ajoute un tag
    async addTag(req, res, next) {
        try {
            const tag = new Tag(req.body);
            const tagExist = await tag.checkTag();           // Controle si le tag existe déjà
            if (!tagExist) {
            const addTag = await Tag.create(req.body);
            
            if (addTag) {
                res.json(addTag);
            } else {
                next(new Error("Problème de BDD"));
            }
            } else {
            // Le tag existe déjà
            res.status(500).json({
                error: "Le tag existe déjà !"
            });
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Modifie un tag
    async updateTag(req, res, next) {
        try {
            const idExist = await Tag.checkExist(req.params.id);           // Controle si l'id existe
            if(idExist) {
                const tagCheck = new Tag(req.body);
                const tagExist = await tagCheck.checkTag();           // Controle si le tag existe déjà
                if (!tagExist) {
                    const tag = await Tag.update(req.params.id, req.body);
                    if(tag) {
                        res.json(tag);
                    } else {
                        next(new Error("Problème de BDD"));
                    }
                } else {
                // Le tag existe déjà
                res.status(500).json({
                    error: "Le tag existe déjà"
                });
                }
            } else {
                // L'id n'existe pas
                res.status(500).json({
                    error: "L'id n'existe pas"
                });
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

    // Supprime un tag
    async deleteTag(req,res,next){
        try {
            const tag = await Tag.delete(req.params.id);
            if (tag) {
                res.json(tag);
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

export default tagsController;