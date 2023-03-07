// import 'jest-extended';
// import 'jest';
// import {jest} from '@jest/globals';
// jest.useFakeTimers();

import controller from '../app/controllers/index.js';



test('Test de la méthode getAll', async () => {
  
    const data = await controller.usersController.getAll();
    expect(data).toBe('peanuts');
  });