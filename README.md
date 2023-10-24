# J'adopte un humain Back

Ce répertoire contient le code source du back-end pour le site web fictif J'adopte un Humain. Ce back-end a été développé en utilisant Node.js, Express.js, PostgreSQL pour la base de données, et d'autres bibliothèques telles que Multer, JOI, et Dotenv. Il gère les fonctionnalités telles que la recherche d'animaux, l'enregistrement d'utilisateurs, et la gestion des correspondances entre humains et animaux.

## Installation

1. Clonez ce dépôt sur votre machine locale.

   `git clone https://github.com/votre-utilisateur/refuge-animal-matching-backend.git`

2. Accédez au répertoire du projet.

   `cd Adopte-un-Humain-Back`

3. Installez les dépendances.

   `npm install`

## Configuration

Avant de démarrer le serveur, assurez-vous de configurer les variables d'environnement. Créez un fichier .env à la racine du projet et configurez les variables suivantes :

`PORT=
SESSION_SECRET=
PGHOST=
PGPORT=
PGDATABASE=
PGUSER=
PGPASSWORD=`

Assurez-vous de remplacer les valeurs par les configurations spécifiques à votre environnement.

## Base de Données

Assurez-vous d'avoir PostgreSQL installé localement et de créer une base de données conformément à la configuration définie dans `.env`.

## Utilisation

Démarrez le serveur

`npm start`

Le serveur devrait maintenant être accessible à l'adresse http://localhost:3000.

## Fonctionnalités

- API pour la recherche d'animaux en fonction de critères.
- API pour l'enregistrement d'utilisateurs.
- Gestion des correspondances entre humains et animaux.
- Upload d'images d'animaux grâce à Multer.
- Validation des entrées avec JOI.

## Structure du Projet

- `/app` : Contient le code source du serveur Node.js.
- `/app/routers`: Définition des routes et contrôleurs Express.
- `/src/models` : Modèles de données pour la base de données PostgreSQL.
- `/src/script` : Configuration de la base de données et d'autres paramètres.

### Auteur

Ce projet a été développé par [miazarre](https://github.com/miazarre).
