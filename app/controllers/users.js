const { User } = require("../model");
const bcrypt = require('bcrypt');


const usersController = {

    async getAll(_, res, next) {
        const users = await User.findAll();
        if(users) {
            res.json(users);
        } else {
            next(new Error("Problème de BDD"));
        }   
    },

    async getUser(req, res, next) {
        const user = await User.findByPk(req.params.id);
        if(user) {
            res.json(user);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

    async addUser(req, res, next) {
        req.body.password = await bcrypt.hash(req.body.password, 10);     // Crypt password
        req.body.phone = req.body.phone.replace(/[-. ]/g, "");  // Supprime les espaces, tirets et points
        const user = await User.create(req.body);
        if(user) {
            res.json(user);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

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

       async deleteUser(req,res,next){
        const user = await User.delete(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            next(new Error("Problème de BDD"));
        }
    },

    async checkLogin(req,res, next){
        console.log("test")
        // on génère une instance de User à partir de req.body qui contient username et password
        const user = new User(req.body);
        
        // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
        // la méthode renvoie true ou false suivant si les informations username/password sont correctes
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

module.exports = usersController