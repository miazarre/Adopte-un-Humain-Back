import { Tag } from "../models/index.js";
import { adminLog } from "../service/logger.js";
import debug from 'debug';
const log = debug('controller:tags');

const tagsController = {

  // Récupère tous les tags
    async getAll(_, res, next) {
        try {
            const tags = await Tag.findAll();
            res.json(tags);
        } catch(error) {
            res.status(500).json(error.message);
            log(error);
            next(error);
        }
  },

  // Récupère un tag
  async getTag(req, res, next) {
    try {
        const tagExist = await Tag.checkExist(req.params.id);               // Vérifie si le tag existe
        if (tagExist) {
            const getTag = await Tag.findByPk(req.params.id);
            res.json(getTag);
        } else {
            res.status(404).json({
                error: `Le tag avec l'id = ${req.params.id} n'existe pas !`,
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Ajoute un tag
  async addTag(req, res, next) {
    try {
        req.body.name = Tag.capitalizeFirstLetter(req.body.name);           // Transforme la première lettre en majuscule et le reste en minuscule
        const tagExist = await Tag.checkTag(req.body);                      // Controle si le nom du tag existe déjà
        if (!tagExist) {            
            const addTag = await Tag.create(req.body);
            res.json({
                message: "le tag a bien été crée",
                tag: addTag,
            });
            adminLog.log('info', {                                          // Log l'action de création d'un tag
                url: req.url,
                method: req.method,
                user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
                role: req.user.name,
                message: `Création du tag ${req.body.name}`
            });
        } else {
            res.status(409).json({
                error: "Le tag existe déjà !",
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Modifie un tag
  async updateTag(req, res, next) {
    try {
        const tagExist = await Tag.checkExist(req.params.id);                   // Controle si l'id du tag existe
        if (tagExist) {
            const getTag = await Tag.findByPk(req.params.id);                   // Récupère les infos du tag qui va être modifié
            if(req.body.name) {
                req.body.name = Tag.capitalizeFirstLetter(req.body.name); 
            }
            const tagNameExist = await Tag.checkTag(req.body);                  // Controle si le nom du tag existe
            if (!tagNameExist) {
                const tag = await Tag.update(req.params.id, req.body);
                res.json({
                    message: "le tag a bien été mise à jour",
                    tag: tag,
                });
                adminLog.log('info', {                                          // Log l'action de modification d'un tag
                    url: req.url,
                    method: req.method,
                    user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
                    role: req.user.name,
                    message: `modification tag  name : ${getTag.name} - id : ${getTag.id} - Priority : ${getTag.priority} par = name : ${req.body.name} - priority : ${req.body.priority}`
                });
            } else {
                res.status(409).json({
                    error: "Le nom du tag existe déjà",
                });
            }
        } else {
            res.status(404).json({
                error: "L'id du tag n'existe pas",
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },

  // Supprime un tag
  async deleteTag(req, res, next) {
    try {
        const tagExist = await Tag.checkExist(req.params.id);           // Controle si l'id du tag existe
        const getTag = await Tag.findByPk(req.params.id);               // Récupère les infos du tag  à supprimer
        if(tagExist) {
            const tag = await Tag.delete(req.params.id);
            res.json({
                message: "le tag a bien été supprimé",
                tag: tag,
            });
            adminLog.log('info', {                                      // Log l'action de suppression d'un tag
                url: req.url,
                method: req.method,
                user: `${req.userProfil[0].firstname} - ${req.userProfil[0].email}`,
                role: req.user.name,
                message: `Suppression du tag  name : ${getTag.name} - id : ${req.params.id} - Priority : ${getTag.priority}`
            });   
        } else {
            res.status(404).json({
                error: "L'id du tag n'existe pas",
            });
        }
    } catch(error) {
        res.status(500).json(error.message);
        log(error);
        next(error);
    }
  },
};

export default tagsController;
