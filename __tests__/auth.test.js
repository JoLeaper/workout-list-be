const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');

describe('auth-list routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
  
  it('can create a new user', () => {
    const newUser = {
      email: 'test@test.com',
      password: 'password',
      profileImage: 'placeholder.com'
    };

    return request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: newUser.email,
          profileImage: newUser.profileImage
        });
      });
    
  });
});
