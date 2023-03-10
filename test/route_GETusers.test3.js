require('@babel/register')({
  presets: ['@babel/preset-env']
});

import request from 'supertest';
import express from 'express';
import User from '../app/models/user.js';

// Création de l'application Express
const app = express();

// Définition de la route pour le endpoint /users 
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Définit un groupe de tests pour la méthode `findAll` du Model user
describe('findAll', () => {

  // Réinitialise les mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste si la méthode `findAll` renvoie tous les utilisateurs existants de la base de données, si elle est exécutée correctement
  it('devrait retourner tous les users', async () => {
    // Crée un objet `mockUsers` qui simule deux utilisateurs de la base de données
    const mockUsers = [
      { id: 1, firstname: 'Matt', lastname: 'Skrzypczak', email: 'matt@example.com', phone: '123456789', password: 'password1', address: '1 rue des Impasses', city: 'Miramas', country: 'France', role_id: 2 },
      { id: 2, firstname: 'Cy', lastname: 'De Graeve', email: 'cy@example.com', phone: '987654321', password: 'password2', address: '2 impasse de la Rue', city: 'Paris', country: 'France', role_id: 1 }
    ];

    // Espionne la méthode `findAll` du modèle d'utilisateur et la configure pour qu'elle renvoie la liste `mockUsers`
    jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);

    // Test de la requête HTTP GET '/users'
    const res = await request(app).get('/users');

    // Vérifie que le code de statut de la réponse est 200
    expect(res.status).toBe(200);

    // Vérifie que le corps de la réponse est égal à la liste `mockUsers`
    expect(res.body).toEqual(mockUsers);

    // Nettoie le mock
    User.findAll.mockRestore();
  });

  // Teste si la méthode `findAll` affiche une erreur quand il y a un problème avec la base de données
  it('devrait afficher une erreur quand il y a un problème avec la BDD', async () => {
    // Espionne la méthode `findAll` du modèle d'utilisateur et la configure pour qu'elle renvoie une erreur
    jest.spyOn(User, 'findAll').mockRejectedValue(new Error('Erreur BDD'));

    // Test de la requête HTTP GET '/users'
    const res = await request(app).get('/users');

    // Vérifie que le code de statut de la réponse est 500
    expect(res.status).toBe(500);

    // Nettoie le mock
    User.findAll.mockRestore();
  });
});