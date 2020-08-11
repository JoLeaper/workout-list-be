const chance = require('chance').Chance();
const Workout = require('../lib/models/Workout');

module.exports = async({ workouts = 10  } = {}) => {
  const workoutArray = await Promise.all([...Array(workouts)].map(async() => {
    return Workout.create({
      name: chance.word(),
      muscles: chance.word(),
      description: chance.paragraph({  sentences: 1 }),
      reps: chance.natural({  min: 1, max: 10 }),
      weight: chance.natural({ min: 1, max: 400 })
    });
  }));