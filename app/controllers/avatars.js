const { Avatar } = require("../models");
const multer = require('multer');

const avatarsController = {

    /**
     * Récupère la liste des avatarx
     * @returns Liste des avatarx
     */
    async getAll(_, res, next) {
        try {
            const avatars = await Avatar.findAll();
            if(avatars) {
                res.json(avatars);
            } else {
                next(new Error("Problème de BDD"));
            }   
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

   // Récupère un avatar
    async getAvatar(req, res, next) {
        try {
            const avatar = await Avatar.findByPk(req.params.id);
            if(avatar) {
                res.json(avatar);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Ajoute un avatar
    async addAvatar(req, res, next) {
        try {
            // Pour chaque images récupérer je les mets dans mon req.body
            if (req.files && req.files.length > 0) {
                const data = { 
                name: req.body.name, 
                picture: req.files[0].filename 
                };

                const addAvatar = await Avatar.create(data);
                res.json(addAvatar);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

    // Modifie un avatar
    async updateAvatar(req, res, next) {
        try {
            const avatar = await Avatar.update(req.params.id, req.body);
            if(avatar) {
                res.json(avatar);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

    // Supprime un avatar
    async deleteAvatar(req,res,next){
        try {
            const avatar = await Avatar.delete(req.params.id);
            if (avatar) {
                res.json(avatar);
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

module.exports = avatarsController;