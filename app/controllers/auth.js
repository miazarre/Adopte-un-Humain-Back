

const authController = {
    async login(req,res) {
        // on génère une instance de User à partir de req.body qui contient email et password
        const user = new User(req.body);
        
        // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
        // la méthode renvoie true ou false suivant si les informations email/password sont correctes
        if(await user.checkPassword()){
            console.log(user);
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
            // erreur dans le couple username/password, on renvoie false au client
            res.status(500).json({
                error:"ceci n'est pas correct!"
            });
        }
        
    }

}

module.exports = authController;