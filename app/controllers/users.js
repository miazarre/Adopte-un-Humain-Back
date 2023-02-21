const { userModel } = require("../model/index")

const usersController = {
    async getAll(_, res, next) {
        const users = await userModel.findAllUsers();
        if(users) {
            res.json(users);
        } else {  
            const error = new Error("Problème de BDD");         
            next(error);
        }
    },

    async addUser(req, res, next) {
        const user = await userModel.insert(req.body);
        if(user) {
            res.json(user);
        } else {
            const error = new Error("Problème de BDD");
            next(error)
        }
    }

}

module.exports = usersController