const { agent } = require('../db/data-helpers');

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

  // it('get all workouts', () => {
    
  // });

  // it('can update a workout', () => {
    

  // });
  // it('can delete a workout', () => {
    
  // });

  
});
