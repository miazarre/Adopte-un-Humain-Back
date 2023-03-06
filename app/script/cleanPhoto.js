import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import client from 'pg';
const { Pool } = client;

dotenv.config();

const pool = new Pool();

// Script qui supprime les images qui ne sont pas stockées dans la BDD

const cleanPhotos = {

  async deleteAnimalsFiles() {
      // Récupération des noms de fichiers présents dans le répertoire des images animals
    const imageDirectory = path.join(__dirname, '../../public/images/animals');
    const imageFiles = fs.readdirSync(imageDirectory);

    // Récupération des noms de fichiers possibles depuis la bdd
    pool.query('SELECT photo1, photo2, photo3, photo4 FROM animal', (err, res) => {
      if (err) throw err;

      const possibleFiles = [];
      // Pour chacune données récupéré dans la requête sql,  récupère les valeurs non null et les push dans le tableau possibleFiles
      for (const animal of res.rows) {
        const animalPhotos = Object.values(animal).filter(value => value !== null);
        animalPhotos.forEach(filename => {
          possibleFiles.push(filename);
        });
      }

      // Suppression des fichiers manquants
      const missingFiles = imageFiles.filter(filename => !possibleFiles.includes(filename)); // Créer un tableau des fichiers présents dans le dossier images
      if (missingFiles.length > 0) {                                                         // Si des fichiers sont manquants dans la bdd (donc non répertoriés)
        missingFiles.forEach(filename => {                                                   // Parcours chaque nom de fichier et le supprime
          const filePath = path.join(imageDirectory, filename);
          fs.unlinkSync(filePath);
          console.log(`Le fichier "${filename}" a été supprimé.`);
        });
      }
    });
  },

  async deleteAvatarsFiles() {
      // Récupération des noms de fichiers présents dans le répertoire des images avatars
    const imageDirectory = path.join(__dirname, '../../public/images/avatars');
    const imageFiles = fs.readdirSync(imageDirectory);

    // Récupération des noms de fichiers possibles depuis la bdd
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
    });
  }

};

export default cleanPhotos;
