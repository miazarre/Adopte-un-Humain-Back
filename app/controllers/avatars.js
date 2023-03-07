import { Avatar, Tag } from "../models/index.js";
import clean from "../script/cleanPhoto.js";

const avatarsController = {
  // Récupère tous les avatars
  async getAll(_, res, next) {
    const avatars = await Avatar.findAll();
    if (avatars) {
      res.json(avatars);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Récupère un avatar
  async getAvatar(req, res, next) {
    const avatar = await Avatar.findByPk(req.params.id);
    if (avatar) {
      res.json(avatar);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Ajoute un avatar
  async addAvatar(req, res, next) {
    // Pour chaque images récupérer je les mets dans mon req.body
    if (req.files && req.files.length > 0) {
      const data = {
        name: req.body.name,
        picture: req.files[0].filename,
      };

      const addAvatar = await Avatar.create(data);
      clean.deleteAvatarsFiles();
      res.json(addAvatar);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Modifie un avatar
  async updateAvatar(req, res, next) {
    const data = {};
    // Vérifie si une nouvelle image est envoyée
    if (req.files && req.files.length > 0) {
      data.picture = req.files[0].filename;
    }
    // Vérifie si un nouveau nom est envoyé
    if (req.body.name) {
      data.name = req.body.name;
    }
    // Met à jour l'avatar en BDD
    const updatedAvatar = await Avatar.update(req.params.id, data);
    // Retourne l'avatar modifié
    if (updatedAvatar) {
      clean.deleteAvatarsFiles();
      res.json(updatedAvatar);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Supprime un avatar
  async deleteAvatar(req, res, next) {
    const avatar = await Avatar.delete(req.params.id);
    if (avatar) {
      clean.deleteAvatarsFiles();
      res.json(avatar);
    } else {
      next(new Error("Problème de BDD"));
    }
  },

  // Récupère tous les tags de l'avatar
  async getAvatarTags(req, res) {
    const avatarId = req.params.id;

    const tags = await Avatar.getAvatarTags(avatarId);
    if (tags) {
      res.json(tags);
    } else {
      next(new Error("Problème de BDD"));
    }
  },
  // Ajoute un tag à l'avatar
  async addAvatarTag(req, res) {
    const tag = new Tag(req.body);
    const tagExist = await tag.checkTagId(req.body.tag_id);
    const avatarExist = await Avatar.checkAvatar(req.params.id);
    if (tagExist) {
      if (avatarExist) {
        const avatarHasTag = await Avatar.addAvatarTag(
          req.params.id,
          req.body.tag_id
        );
        res.json(avatarHasTag);
      } else {
        // L'avatar n'existe pas
        res.status(500).json({
          error: `L'avatar avec l'id = ${req.params.id} n'existe pas !`,
        });
      }
    } else {
      // Le tag n'existe pas
      res.status(500).json({
        error: `Le tag avec l'id = ${req.body.tag_id} n'existe pas !`,
      });
    }
  },
  // Supprime un tag à l'avatar
  async deleteAvatarTag(req, res) {
    await Avatar.deleteAvatarTag(req.params.id, req.params.tagId);
    res.json({
      message: `L'association avatar id = ${req.params.id} et tag id = ${req.params.tagId} a bien été supprimée`,
    });
  },
};

export default avatarsController;
