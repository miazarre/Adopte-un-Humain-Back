const { User } = require("../models");
const jwt = require('jsonwebtoken');

const authController = {
    /**
     * Vérification de l'authentification
     * @param {*} obj - req.body
     * @returns Le token
     */
    async checkLogin(req,res){
        console.log(req.body)
        // Génération d'une instance de User à partir de req.body qui contient l'email et password
        const user = new User(req.body);
        
        // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
        if(await user.checkPassword()){
            // Génération du token
            const token = jwt.sign({email:user.email}, process.env.SESSION_SECRET);
            console.log("TOKEN : ",token);

            // on enregistre le user courant dans la session
            req.session.user = user;
            // on envoie le token généré au client
            res.json({
                token
            });
        }
        else{
            // erreur dans le couple email/password
            res.status(500).json({
                error:"L'email ou le mot de passe ne correspond pas !"
            });
        }
    }
};

module.exports = authController;