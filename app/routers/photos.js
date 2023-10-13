import express from "express";
import controller from "../controllers/index.js";

const router = express.Router();

// Route pour récupérer les images d'animaux
router.get(
  "/images/animal/:filename",
  controller.photosController.getPhotoAnimal
);

export default router;

// doc swagger : /api-docs

/**
 * GET /api/images/animal/{filename}
 * @summary Récupère et affiche une photo d'un animal
 * @param {string} filename.path.required - Image filename
 * @tags IMAGES
 * @return {string} 200 - photo animal
 * @return {object} 500 - Unexpected error
 * @produces image/png
 */
