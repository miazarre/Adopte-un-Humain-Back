require('@babel/register')({
    presets: ['@babel/preset-env']
  });

import usersController from '../app/controllers/users.js';
import User from '../app/models/user.js';

describe('getAll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait retourner tous les users', async () => {
    const mockUsers = [
      { id: 1, firstname: 'Matt', lastname: 'Skrzypczak', email: 'matt@example.com', phone: '123456789', password: 'password1', address: '1 rue des Impasses', city: 'Miramas', country: 'France', role_id: 2 },
      { id: 2, firstname: 'Cy', lastname: 'De Graeve', email: 'cy@example.com', phone: '987654321', password: 'password2', address: '2 impasse de la Rue', city: 'Paris', country: 'France', role_id: 1 }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);
    const req = {};
    const res = { json: jest.fn() };
    const next = jest.fn();

    await usersController.getAll(req, res, next);

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
    expect(next).not.toHaveBeenCalled();
  });

  it('devrait appeler next avec une erreur quand il y a un problème avec la BDD', async () => {

    jest.spyOn(User, 'findAll').mockRejectedValue(new Error('Erreur BDD'));
    const req = {};
    const res = { json: jest.fn() };
    const next = jest.fn();

    await usersController.getAll(req, res, next);

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    
    // Nettoie le mock
    User.findAll.mockRestore();
  });
});