const asyncHandler = require('express-async-handler')

const Meal = require('../models/mealModel')
const User = require('../models/userModel')

// @desc    Get meals
// @route   GET /api/meals
// @access  Private
const getMeals = asyncHandler(async (req, res) => {
  const meal = await meal.find({ user: req.user.id })

  res.status(200).json(meal)
})

// @desc    Set meal
// @route   POST /api/meals
// @access  Private
const setMeal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const meal = await meal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(meal)
})

// @desc    Update meal
// @route   PUT /api/meals/:id
// @access  Private
const updateMeal = asyncHandler(async (req, res) => {
  const meal = await meal.findById(req.params.id)

  if (!meal) {
    res.status(400)
    throw new Error('Meal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the meal user
  if (meal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedMeal = await meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedMeal)
})

// @desc    Delete meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await meal.findById(req.params.id)

  if (!meal) {
    res.status(400)
    throw new Error('Meal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the meal user
  if (meal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await meal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMeals,
  setMeal,
  updateMeal,
  deleteMeal,
}
