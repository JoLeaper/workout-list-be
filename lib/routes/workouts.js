const Workout = require('../models/Workout');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Workout.create({
      name: req.body.name,
      muscles: req.body.muscles,
      description: req.body.description,
      reps: req.body.reps,
      weight: req.body.weight
    })
      .then(workout => res.send(workout))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Workout
      .find()
      .then(workouts => res.send(workouts))
      .catch(next);
  })
  .patch('/workouts/:id', (req, res, next) => {
    Workout
      .findByIdAndUpdate(req.params._id)
      .then(workout => res.send(workout))
      .catch(next);
  })
  .delete('/workouts/:id', (req, res, next) => {
    Workout
      .findByIdAndDelete(req.params._id)
      .then(workout => res.send(workout))
      .catch(next);
  });
  
