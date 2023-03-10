import { Role } from "../models/index.js";
import { adminLog } from "../service/logger.js";
import debug from 'debug';
const log = debug('controller:roles');

const rolesController = {
  // Récupère tous les rôles
  async getAll(_, res, next) {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Récupère un rôle
  async getRole(req, res, next) {
    try {
        const roleExist = await Role.checkExist(req.params.id);            // Controle si le role existe
        if(roleExist) {
            const role = await Role.findByPk(req.params.id);
            res.json(role);
        } else {
            res.status(404).json({
                error: `Le role avec l'id = ${req.params.id} n'existe pas !`,
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Ajoute un role
  async addRole(req, res, next) {
    try {
        req.body.name = (req.body.name).toLowerCase(); 
        const roleExist = await Role.checkRole(req.body);                   // Controle si le role existe
        if (!roleExist) {
            const addRole = await Role.create(req.body);
            res.json({
                message: "le role a bien été crée",
                tag: addRole,
            });
            adminLog.log('info', {                                          // Log l'action de création d'un role
                url: req.url,
                method: req.method,
                user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
                role: req.user.name,
                message: `Création du role ${req.body.name}`
            });
        } else {
            res.status(409).json({
                error: "Le nom du rôle existe déjà !",
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Modifie un role
  async updateRole(req, res, next) {
    try {
        const roleExist = await Role.checkExist(req.params.id);                   // Controle si l'id du role existe
        if(roleExist) {
            const getRole = await Role.findByPk(req.params.id);                   // Récupère les infos du role qui va être modifié
            req.body.name = (req.body.name).toLowerCase();
            const roleNameExist = await Role.checkRole(req.body);                 // Controle si le nom du role existe
            if(!roleNameExist) {
                const role = await Role.update(req.params.id, req.body);
                res.json({
                    message: "le role a bien été mise à jour",
                    role: role,
                });
                adminLog.log('info', {                                            // Log l'action de modification d'un role
                    url: req.url,
                    method: req.method,
                    user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
                    role: req.user.name,
                    message: `modification role  name : ${getRole.name} - id : ${getRole.id} par = name : ${req.body.name}`
                });
            } else {
                res.status(409).json({
                    error: "Le nom du role existe déjà",
                });
            }
        } else {
            res.status(404).json({
                error: "L'id du role n'existe pas",
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Supprime un role
  async deleteRole(req, res, next) {
    try {
        const roleExist = await Role.checkExist(req.params.id);         // Controle si l'id du role existe
        const getRole = await Role.findByPk(req.params.id);             // Récupère les infos du role  à supprimer
        if(roleExist) {
            const role = await Role.delete(req.params.id);
            res.json({
                message: "le tag a bien été supprimé",
                role: role,
            });
            adminLog.log('info', {                                      // Log l'action de suppression d'un role
                url: req.url,
                method: req.method,
                user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
                role: req.user.name,
                message: `Suppression du role  name : ${getRole.name} - id : ${req.params.id}`
            }); 
        } else {
            res.status(404).json({
                error: "L'id du role n'existe pas",
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },
};

export default rolesController;
