const router = require("express").Router();
const Workout = require("../models/workout.js");

// grace:
// always handle (promise) errors w/ .catch()

// grace:
// create a Workout using our Workout model created via Mongoose
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// grace:
// update a Workout using our Workout model created via Mongoose
// by its id that is passed into the url in the http req
// and read using the req.params.id prop
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// grace:
// get all Workouts using our Workout model
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// grace:
// get Workouts using our Workout model
// w/ a hardcoded max count of 7 DB entries
// could be useful to pass in limit from FE
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .then(dbWorkouts => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// grace:
// remove a specific workout by finding it by id and deleting it
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
