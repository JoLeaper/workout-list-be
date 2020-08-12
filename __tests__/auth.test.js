require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');



describe('auth routes', () => {
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

  it('can log a user in', async() => {
    await User.create({
      email: 'test@test.com',
      password: 'password',
      profileImage: 'placeholder.com'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'test@test.com', 
        password: 'password' 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          profileImage: 'placeholder.com'
        });
      });
    
  });

  it('verifies a user', () => {
    const agent = request.agent(app);
    return agent
      .post('/api/v1/auth/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .then(() => agent.get('/api/v1/auth/verify'))
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com'
        });
      });
  });
});
