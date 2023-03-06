import { User } from "../models/index.js";
import jwt from 'jsonwebtoken';

const authController = {
    /**
     * Vérification de l'authentification
     * @param {*} obj - req.body
     * @returns Le token
     */
    async checkLogin(req,res){
        try {        
            // Génération d'une instance de User à partir de req.body qui contient l'email et password
            const user = new User(req.body);
            if(await user.checkEmailLogin()){
                // Génération du token
                const token = jwt.sign({email:user.email}, process.env.SESSION_SECRET, { expiresIn: '24h'});
                // const token = jwt.sign({email:user.email}, process.env.SESSION_SECRET);
                console.log("TOKEN : ",token);
                const userAuth = await User.findAll({ $where: {email:user.email} });  
                // on envoie le token généré au client
                res.json({
                    token,
                    id: userAuth[0].id,
                    firstname: userAuth[0].firstname,
                    lastname: userAuth[0].lastname,
                    email: userAuth[0].email,
                    phone: userAuth[0].phone,
                    address: userAuth[0].address,
                    postal_code: userAuth[0].postal_code,
                    city: userAuth[0].city,
                    country: userAuth[0].country,
                    role_id: userAuth[0].role_id
                });
                
            } else {
                // erreur dans le couple email/password
                res.status(400).json({
                    error:"L'email ou le mot de passe ne correspond pas !"
                });
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    }
};

export default authController;