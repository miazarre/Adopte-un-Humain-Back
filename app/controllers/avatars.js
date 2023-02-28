const { Avatar, Tag } = require("../models");
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
          const data = {};
          // Vérifie si une nouvelle image est envoyée
          if (req.files && req.files.length > 0) {
            data.picture = req.files[0].filename;
          }
          // Vérifie si un nouveau nom est envoyé
          if (req.body.name) {
            data.name = req.body.name;
          }
      console.log("test", data);
          // Met à jour l'avatar en BDD
          const updatedAvatar = await Avatar.update(req.params.id, data);
          // Retourne l'avatar modifié
          if(updatedAvatar) {
            res.json(updatedAvatar);
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

    // START : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    async getAvatarTags(req, res) {
        const avatarId = req.params.id;
      
        try {
        const tags = await Avatar.getAvatarTags(avatarId);
          res.json(tags);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error getting avatar tags - controller' });
        }
      },
      
    async addAvatarTag(req, res) {
        try {
        const tag = new Tag(req.body);
        const avatar = new Avatar(req.params);
        const tagExist = await tag.checkTagId(req.body.tag_id);
        const avatarExist = await Avatar.checkAvatar(req.params.id);
        if(tagExist){
            if(avatarExist){
                const avatarHasTag = await Avatar.addAvatarTag(req.params.id, req.body.tag_id);
                res.json(avatarHasTag);
            } else {
                // L'avatar n'existe pas
                res.status(500).json({
                error: `L'avatar avec l'id = ${req.params.id} n'existe pas !`
                });
            }
        } else {
            // Le tag n'existe pas
            res.status(500).json({
                error: `Le tag avec l'id = ${req.body.tag_id} n'existe pas !`
            });
        }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error adding avatar tag' });
        }
      },

    async deleteAvatarTag(req, res) {
        try {
          await Avatar.deleteAvatarTag(req.params.id, req.params.tagId);
          res.json({
            message: `L'association avatar id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée` 
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error deleting avatar tag' });
        }
      }
// END : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}

module.exports = avatarsController;