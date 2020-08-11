const { agent } = require('../db/data-helpers');
const Workout = require('../lib/models/Workout');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

describe('workout-list routes', () => {
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
    const newWorkout = {
      name: 'Bench Press',
      muscles: 'Chest, Triceps',
      description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
      reps: 25,
      weight: 135
    };

    return agent
      .post('/api/v1/workouts')
      .send(newWorkout)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: newWorkout.name,
          muscles: newWorkout.muscles,
          description: newWorkout.description,
          reps: newWorkout.reps,
          weight: newWorkout.weight,
          __v: 0
        });
      });
    
  });

  it('get all workouts', async() => {
    await Workout.create({
      name: 'Bench Press',
      muscles: 'Chest, Triceps',
      description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
      reps: 25,
      weight: 135
    });

    await Workout.create({
      name: 'Back Squat',
      muscles: 'Core, Glutes, Quads',
      description: 'Lift the bar onto your traps and walk out. When you are stable, lower yourself in a controlled motion while sticking your glutes out. Lower yourself until your hips dip beneath your knees, then rise up.',
      reps: 25,
      weight: 225
    });
  
    return agent
      .get('/api/v1/workouts')
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
      
  });

  it('updates a workout', async() => {
    const workout1 = await Workout.create({
      name: 'Bench Press',
      muscles: 'Chest, Triceps',
      description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
      reps: 25,
      weight: 135
    });

    const updatedworkout1 = {
      name: 'Bench Press',
      muscles: 'Chest, Triceps',
      description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
      reps: 25,
      weight: 155
    };

    return agent
      .patch(`/api/v1/workouts/${workout1._id}`)
      .send(updatedworkout1)
      .then(res => {
        expect(res.body).toEqual({
          _id: workout1.id,
          name: 'Bench Press',
          muscles: 'Chest, Triceps',
          description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
          reps: 25,
          weight: 155,
          __v: 0
        });
      });
      
  });

  it('can delete a workout', async() => {
    const workout = await Workout.create({
      name: 'Bench Press',
      muscles: 'Chest, Triceps',
      description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
      reps: 25,
      weight: 135
    });
  
    return agent
      .delete(`/api/v1/workouts/${workout._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: workout.id,
          name: 'Bench Press',
          muscles: 'Chest, Triceps',
          description: 'Raise the bar up, and lower it in a controlled motion onto your chest. Once it touches, push (with an emphasis on using your chest and triceps). For an added challenge: pause when the bar touches your chest.',
          reps: 25,
          weight: 135,
          __v: 0
        });
      });
  });
});
