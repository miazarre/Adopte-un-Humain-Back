const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const securityService = {

    checkToken(req, res, next) {
        try {
            console.log(req.headers.authorization.split(" ")[1]);
            const token = req.headers.authorization.split(" ")[1];
            const userToken = jwt.verify(token, process.env.SESSION_SECRET);
            console.log("token validé !", userToken);

            next();
        } 
        catch (error) {
            console.log(error);
            next(error);
        }
    },

    // async authAdmin(req, res, next) {
    //     try {
    //         console.log(req.headers.authorization.split(" ")[1]);
    //         const token = req.headers.authorization.split(" ")[1];
    //         const userToken = jwt.verify(token, process.env.SESSION_SECRET);
    //         console.log("token validé !", userToken);
    //         const userEmail = userToken.email;

    //         const user = await User.findAll({ $where: {email:userEmail} });
    //         const userRole = await Role.findAll({ $where: {id:user[0].role_id} });
    //         if(!user) {
    //             return res.status(401).json({
    //                 error: "Vous n'êtes pas autorisés"
    //             });
    //         }
    //         req.user = userRole;
    //         next();
    //     } 
    //     catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // }

};

module.exports = securityService;