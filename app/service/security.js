import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index.js';

const securityService = {

    authMiddleware(roles) {

        return async function(req, res, next) {
                
          try {
            // Récupérer le token JWT depuis l'en-tête Authorization
            const token = req.headers.authorization.split(" ")[1];
             // Vérifier si le token est valide

            const userToken = jwt.verify(token, process.env.SESSION_SECRET);
            // console.log("token validé !", userToken);

            // Récupère le role lié à l'utilisateur
            const userEmail = userToken.email;
            const user = await User.findAll({ $where: {email:userEmail} });
            const userRole = await Role.findAll({ $where: {id:user[0].role_id} });
                  
            req.userProfil = user;    // je stocke le profil utilisateur
            req.user = userRole[0];   // je stocke le profil role utilisateur

            console.log("token validé !", userToken, "Role : ", req.user.name);
            
          } catch(err) {
            return res.status(401).json({ message: 'Token invalide' });
          }
      
          // Vérifier si l'utilisateur a le rôle requis pour accéder à la route
          if (roles.indexOf(req.user.name) === -1) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé" });
          }
      
          // L'utilisateur est authentifié et autorisé, passer au middleware suivant
        //   console.log("role : ", req.user.name);
          next();
        }
      }
};

export default securityService;
