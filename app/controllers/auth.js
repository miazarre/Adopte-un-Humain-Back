import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import debug from "debug";
const log = debug("controller:auth");

const authController = {
  // Vérification de l'adresse mail et du password et génération du token
  async checkLogin(req, res, next) {
    try {
      const user = new User(req.body);
      if (await user.checkEmailLogin()) {
        // Génération du token
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.SESSION_SECRET,
          {
            expiresIn: "24h",
          }
        );
        const userAuth = await User.findAll({ $where: { email: user.email } });
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
          role_id: userAuth[0].role_id,
        });
      } else {
        res.status(400).json({
          error: "L'email ou le mot de passe ne correspond pas !",
        });
      }
    } catch (error) {
      res.status(500).json(error.message);
      log(error);
      next(error);
    }
  },
};

export default authController;
