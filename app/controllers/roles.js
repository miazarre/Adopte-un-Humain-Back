const { Role } = require("../models");


const rolesController = {

    /**
     * Récupère la liste des roles
     * @returns Liste des roles
     */
    async getAll(_, res, next) {
        const roles = await Role.findAll();
        if(roles) {
            res.json(roles);
        } else {
            next(new Error("Problème de BDD"));
        }   
    },

   // Récupère un role
    async getRole(req, res, next) {
        const role = await Role.findByPk(req.params.id);
        if(role) {
            res.json(role);
        } else {
            next(new Error("Problème de BDD"));
        }
    },
    // Ajoute un role
    async addRole(req, res, next) {

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

    },
    // Modifie un role
    async updateRole(req, res, next) {
        const role = await Role.update(req.params.id, req.body);
        if(role) {
            res.json(role);
        } else {
            next(new Error("Problème de BDD"));
        }
    },

    // Supprime un role
    async deleteRole(req,res,next){
        const role = await Role.delete(req.params.id);
        if (role) {
            res.json(role);
        }
        else {
            next(new Error("Problème de BDD"));
        }
    },
}

module.exports = rolesController;