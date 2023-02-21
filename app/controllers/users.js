const coreDatamapper = require("../model/coreDatamapper");
const bcrypt = require('bcrypt');
const tableName = "user";

const usersController = {

    async getAll(_, res, next) {
        let params;
        const users = await coreDatamapper.findAll(params, tableName);
        if(users) {
            res.json(users);
        } else {
            const error = new Error("Problème de BDD");
            next(error);
        }
    },

    async getUser(req, res, next) {
         const user = await coreDatamapper.findByPk(req.params.id, tableName);
        if (user) {
            res.json(user);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

    async addUser(req, res, next) {
        req.body.password = await bcrypt.hash(req.body.password, 10);     // Crypt password
        const user = await coreDatamapper.create(req.body, tableName);
        if(user) {
            res.json(user);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

    async updateUser(req, res, next) {
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10); 
            const user = await coreDatamapper.update(req.params.id, req.body, tableName);
            if(user) {
                res.json(user);
            } else {
                next(new Error("Problème de BDD"));
            }
        } else {
            const user = await coreDatamapper.update(req.params.id, req.body, tableName);
            if(user) {
                res.json(user);
            } else {
                next(new Error("Problème de BDD"));
            }
        }
    },

    async deleteUser(req,res,next){
        const user = await coreDatamapper.delete(req.params.id, tableName);
        if (user) {
            res.json(user);
        }
        else {
            next(new Error("Problème de BDD"));
        }
    },


}

module.exports = usersController