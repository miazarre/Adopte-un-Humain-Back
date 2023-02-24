const jwt = require('jsonwebtoken');

const securityService = {

    checkToken(req, res, next) {
        try {
            console.log(req.headers.authorization.split(" ")[1]);
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