const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: "workout list",
    data: workouts,
  });
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "no such workout",
    });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({
      success: false,
      message: "no such workout",
    });
  }
  res.status(200).json({
    success: true,
    message: "workout detail",
    data: workout,
  });
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const user_id = req.user._id;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
      emptyFields,
    });
  }

  try {
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(201).json({
      success: true,
      message: "workout is created",
      data: workout,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
      emptyFields,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "no such workout",
    });
  }

  const workout = await Workout.findByIdAndUpdate(id, { title, load, reps });
  if (!workout) {
    return res.status(404).json({
      success: false,
      message: "no such workout",
    });
  }
  res.status(200).json({
    success: true,
    message: "workout is updated",
    data: workout,
  });
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "no such workout",
    });
  }

  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({
      success: false,
      message: "no such workout",
    });
  }
  res.status(200).json({
    success: true,
    message: "workout is deleted",
    data: workout,
  });
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
