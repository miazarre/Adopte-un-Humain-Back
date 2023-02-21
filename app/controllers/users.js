const { userModel } = require("../model/index")

const usersController = {
    async getAll(_, res, next) {
        const users = await userModel.findAllUsers();
        if(users) {
            res.json(users);
        } else {  
            const error = new Error("Problème interne");         
            next(error);
        }
    }
}

module.exports = usersController