const asyncHandler = require('express-async-handler');

// @access private
// @route GET /api/goals
// @desc get goals
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get goals'})
})
// @access private
// @route POST /api/goals
// @desc set goals
const setGoals = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field to the request')
    }
    res.status(200).json({message: 'Set goals'})
})

// @access private
// @route PUT /api/goals/:id
// @desc update goals
const updateGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})


// @access private
// @route DELETE /api/goals/:id
// @desc delete goals
const deleteGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})

module.exports = { getGoals, setGoals, deleteGoals, updateGoals }