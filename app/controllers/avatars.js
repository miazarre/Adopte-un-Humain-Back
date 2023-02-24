const { Avatar } = require("../models");
const multer = require('multer');

const avatarsController = {

    /**
     * Récupère la liste des avatarx
     * @returns Liste des avatarx
     */
    async getAll(_, res, next) {
        const avatars = await Avatar.findAll();
        if(avatars) {
            res.json(avatars);
        } else {
            next(new Error("Problème de BDD"));
        }   
    },

   // Récupère un avatar
    async getAvatar(req, res, next) {
        const avatar = await Avatar.findByPk(req.params.id);
        if(avatar) {
            res.json(avatar);
        } else {
            next(new Error("Problème de BDD"));
        }
    },
    // Ajoute un avatar
    async addAvatar(req, res, next) {

        console.log(req.body);
        console.log(req.files);
        
        // Pour chaque images récupérer je les mets dans mon req.body
        if (req.files && req.files.length > 0) {
            const data = { 
              name: req.body.name, 
              filename: req.files[0].filename 
            };

            const addAvatar = await Avatar.create(data);
            res.json(addAvatar);
          } else {
            next(new Error("Problème de BDD"));
          }
        }       
    },

    // Modifie un avatar
    async updateAvatar(req, res, next) {
        const avatar = await Avatar.update(req.params.id, req.body);
        if(avatar) {
            res.json(avatar);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

    // Supprime un avatar
    async deleteAvatar(req,res,next){
        const avatar = await Avatar.delete(req.params.id);
        if (avatar) {
            res.json(avatar);
        }
        else {
            next(new Error("Problème de BDD"));
        }
    },
}

module.exports = avatarsController;