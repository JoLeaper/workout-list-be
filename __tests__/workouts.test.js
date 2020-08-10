const { agent } = require('../db/data-helpers');
const Workout = require('../lib/models/Workout');

describe('workout-list routes', () => {
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

  it('get all workouts', async() => {
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
});

// it('can update a workout', () => {
    

// });
// it('can delete a workout', () => {
    
// });
