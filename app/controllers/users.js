const { User } = require("../models");
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
}

module.exports = usersController