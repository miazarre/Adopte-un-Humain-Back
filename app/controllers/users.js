const { User } = require("../model");
const bcrypt = require('bcrypt');


const usersController = {

    /**
     * Récupère la liste des utilisateurs
     * @returns Liste des utilisateurs
     */
    async getAll(_, res, next) {
        const users = await User.findAll();
        if(users) {
            res.json(users);
        } else {
            next(new Error("Problème de BDD"));
        }   
    },

   // Récupère un utilisateur
    async getUser(req, res, next) {
        const user = await User.findByPk(req.params.id);
        if(user) {
            res.json(user);
        } else {
            next(new Error("Problème de BDD"));
        }
    },
    // Ajoute un utilisateur
    async addUser(req, res, next) {
        req.body.password = await bcrypt.hash(req.body.password, 10);     // Crypt password
        req.body.phone = req.body.phone.replace(/[-. ]/g, "");            // Supprime les espaces, tirets et points
        const user = await User.create(req.body);
        if(user) {
            res.json(user);
        } else {
            next(new Error("Problème de BDD"));
        }
    },
    // Modifie un utilisateur
    async updateUser(req, res, next) {
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
    },
    // Supprime un utilisateur
    async deleteUser(req,res,next){
        const user = await User.delete(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            next(new Error("Problème de BDD"));
        }
    },
}

module.exports = usersController