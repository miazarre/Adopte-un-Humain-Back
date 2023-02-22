const jwt = require('jsonwebtoken');

const securityService = {
    /**
     * Vérification pour voir si l'utilisateur est connecté
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    // isConnected(req, res, next) {
    //     if (req.session.user) {
    //         // user est présent, je continue mon chemin
    //         next();
    //     }
    //     else {
    //         // user est absent, je redirige vers la homepage
    //         res.redirect("/");
    //     }
    // },
    checkToken(req, res, next) {
        try {
            //console.log(req.headers.authorization.split(" ")[1]);
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SESSION_SECRET);
            console.log("token validé !", user);
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
};

module.exports = securityService;