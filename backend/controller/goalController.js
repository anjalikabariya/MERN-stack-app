const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @access private
// @route GET /api/goals
// @desc get goals
const getGoal = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals)
})
// @access private
// @route POST /api/goals
// @desc set goals
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field to the request')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @access private
// @route PUT /api/goals/:id
// @desc update goals
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})


// @access private
// @route DELETE /api/goals/:id
// @desc delete goals
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        throw new Error('User not authorized')
    }
    await Goal.findByIdAndRemove(req.params.id)

    res.status(200).json({id: req.params.id})
})

module.exports = { getGoal, setGoal, deleteGoal, updateGoal }