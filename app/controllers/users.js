const { User, Tag } = require("../models");
const bcrypt = require('bcrypt');


const usersController = {

    /**
     * Récupère la liste des utilisateurs
     * @returns Liste des utilisateurs
     */
    async getAll(_, res, next) {
        try {
            const users = await User.findAll();
            if(users) {
                res.json(users);
            } else {
                next(new Error("Problème de BDD"));
            }  
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        } 
    },

   // Récupère un utilisateur
    async getUser(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            if(user) {
                res.json(user);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Ajoute un utilisateur
    async addUser(req, res, next) {
        try {
            const email = new User(req.body);
            const emailExist = await email.checkEmail();           // Controle si le mail existe déjà
            if (!emailExist) {
                req.body.password = await bcrypt.hash(req.body.password, 10);     // Crypt password
                req.body.phone = req.body.phone.replace(/[-. ]/g, "");            // Supprime les espaces, tirets et points
                const user = await User.create(req.body);
                if(user) {
                    res.json(user);
                } else {
                    next(new Error("Problème de BDD"));
                }
            } else {
                // L'email existe déjà
                res.status(500).json({
                    error: "L'e-mail est déjà utilisé !"
                });
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Modifie un utilisateur
    async updateUser(req, res, next) {
        try {
            const userExist = new User(req.body);
            const emailExist = await userExist.checkEmail();           // Controle si le mail existe déjà
            if(!emailExist) {
                if(req.body.password) {
                    req.body.password = await bcrypt.hash(req.body.password, 10); 
                    const user = await User.update(req.params.id, req.body);
                    if(user) {
                        res.json(user);
                    } else {
                        next(new Error("Problème de BDD"));
                    }
                } else {
                    const user = await User.update(req.params.id, req.body);
                    if(user) {
                        res.json(user);
                    } else {
                        next(new Error("Problème de BDD"));
                    }
                }
            } else {
                // L'utilisateur existe déjà'
                res.status(500).json({
                    error: "L'e-mail est déjà utilisé !"
                });
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Supprime un utilisateur
    async deleteUser(req,res,next){
        try {
            const user = await User.delete(req.params.id);
            if (user) {
                res.json(user);
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
    
    async getUserTags(req, res) {
        const userId = req.params.id;
        try {
        const tags = await User.getUserTags(userId);
          res.json(tags);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error getting user tags - controller' });
        }
      },
      
    async addUserTag(req, res) {
        try {
        const tag = new Tag(req.body);
        const user = new User(req.params);
        const tagExist = await tag.checkTagId(req.body.tag_id);
        const userExist = await User.checkUser(req.params.id);
        if(tagExist){
            if(userExist){
                const userHasTag = await User.addUserTag(req.params.id, req.body.tag_id);
                res.json(userHasTag);
            } else {
                // L'utilisateur n'existe pas
                res.status(500).json({
                error: `L'utilisateur' avec l'id = ${req.params.id} n'existe pas !`
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
          res.status(500).json({ error: 'Error adding user tag' });
        }
      },

    async deleteUserTag(req, res) {
        try {
          await User.deleteUserTag(req.params.id, req.params.tagId);
          res.json({
            message: `L'association user id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée` 
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error deleting user tag' });
        }
      }
// END : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}

module.exports = usersController