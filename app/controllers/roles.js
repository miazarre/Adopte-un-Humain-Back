import { Role } from "../models/index.js";


const rolesController = {

    // Récupère tous les rôles
    async getAll(_, res, next) {
        try {
            const roles = await Role.findAll();
            if(roles) {
                res.json(roles);
            } else {
                next(new Error("Problème de BDD"));
            }   
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

   // Récupère un rôle
    async getRole(req, res, next) {
        try {
            const role = await Role.findByPk(req.params.id);
            if(role) {
                res.json(role);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
    // Ajoute un role
    async addRole(req, res, next) {
        try {
            const role = new Role(req.body);
            const roleExist = await role.checkRole();           // Controle si le role existe déjà
            if (!roleExist) {
            const addRole = await Role.create(req.body);
            if (addRole) {
                res.json(addRole);
            } else {
                next(new Error("Problème de BDD"));
            }
            } else {
            // Le rôle existe déjà
            res.status(500).json({
                error: "Le rôle existe déjà !"
            });
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }

    },
    // Modifie un role
    async updateRole(req, res, next) {
        try {
            const role = await Role.update(req.params.id, req.body);
            if(role) {
                res.json(role);
            } else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },

    // Supprime un role
    async deleteRole(req,res,next){
        try {
            const role = await Role.delete(req.params.id);
            if (role) {
                res.json(role);
            }
            else {
                next(new Error("Problème de BDD"));
            }
        } catch(error) {
            res.status(500).json({
                error: "erreur !"
            });
        }
    },
}

export default rolesController;