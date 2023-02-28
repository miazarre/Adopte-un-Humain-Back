const fs = require('fs');
require("dotenv").config();
const path = require('path');
const { Pool } = require('pg');
const pool = new Pool();

// Script qui supprime les images qui ne sont pas stocké dans la BDD

const cleanPhotos = {

  async deleteAnimalsFiles() {
      // Récupération des noms de fichiers présents dans le répertoire des images animals
    const imageDirectory = path.join(__dirname, '../../public/images/animals');
    const imageFiles = fs.readdirSync(imageDirectory);

    // Récupération des noms de fichiers possibles depuis la base de données
    pool.query('SELECT photo1, photo2, photo3, photo4 FROM animal', (err, res) => {
      if (err) throw err;

      const possibleFiles = [];

      for (const animal of res.rows) {
        const animalPhotos = Object.values(animal).filter(value => value !== null);
        animalPhotos.forEach(filename => {
          possibleFiles.push(filename);
        });
      }

      // Suppression des fichiers manquants
      const missingFiles = imageFiles.filter(filename => !possibleFiles.includes(filename));
      if (missingFiles.length > 0) {
        missingFiles.forEach(filename => {
          const filePath = path.join(imageDirectory, filename);
          fs.unlinkSync(filePath);
          console.log(`Le fichier "${filename}" a été supprimé.`);
        });
      }
      // pool.end();

    });
  },

  async deleteAvatarsFiles() {
      // Récupération des noms de fichiers présents dans le répertoire des images animals
    const imageDirectory = path.join(__dirname, '../../public/images/avatars');
    const imageFiles = fs.readdirSync(imageDirectory);

    // Récupération des noms de fichiers possibles depuis la base de données
    pool.query('SELECT picture FROM avatar', (err, res) => {
      if (err) throw err;

      const possibleFiles = [];

      for (const animal of res.rows) {
        const animalPhotos = Object.values(animal).filter(value => value !== null);
        animalPhotos.forEach(filename => {
          possibleFiles.push(filename);
        });
      }

      // Suppression des fichiers manquants
      const missingFiles = imageFiles.filter(filename => !possibleFiles.includes(filename));
      if (missingFiles.length > 0) {
        missingFiles.forEach(filename => {
          const filePath = path.join(imageDirectory, filename);
          fs.unlinkSync(filePath);
          console.log(`Le fichier "${filename}" a été supprimé.`);
        });
      }
      // pool.end();

    });
  }

}

module.exports = cleanPhotos;