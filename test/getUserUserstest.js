require('@babel/register')({
    presets: ['@babel/preset-env']
  });

import usersController from '../app/controllers/users.js';
import User from '../app/models/user.js';

describe('getUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



  
});