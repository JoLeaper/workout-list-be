const Workout = require('../lib/models/Workout');
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
  
  it('can create a new workout', () => {
    const newUser = {
      email: 'test@test.com',
      password: 'password',
      profileImage: 'placeholder.com'
    };

    return request(app)
      .post('/signup')
      .send(newUser)
      .then(res => {
        expect(res.body).toEqual({
          email: newUser.email,
          profileImage: newUser.profileImage
        });
      });
    
  });
});
