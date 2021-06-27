const Todo = require('../models/todoModel');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res) => {
    const { task, complete } = req.body
    const todo = await Todo.create({ task, complete });
    res.status(httpStatus.CREATED).json({
        success: true,
        data: todo,
        message: 'Task is created successfully'
    });
})

exports.updateTask = catchAsync(async (req, res) => {
    const { task, complete, archive } = req.body
    const existTask = await Todo.findOne({ _id: req.params.id })
    if (existTask) {
        existTask.task = task;
        existTask.complete = complete
        existTask.archive = archive
        const updatedTask = await existTask.save();
        res.status(httpStatus.OK).json({
            success: true,
            data: updatedTask,
            message: 'Task is updated successfully'
        })
    } else {
        res.status(httpStatus.OK).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }

})

exports.deleteTask = catchAsync(async (req, res) => {
    const existTask = await Todo.findOne({ _id: req.params.id })
    if (existTask) {
        await existTask.remove();
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Task is deleted successfully'
        })
    } else {
        res.status(httpStatus.OK).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }

})

exports.getSingleTask = catchAsync(async (req, res) => {
    const existTask = await Todo.findOne({ _id: req.params.id })
    if (existTask) {
        res.status(httpStatus.OK).json({
            success: true,
            data: existTask,
            message: 'Task is fetched successfully'
        })
    } else {
        res.status(httpStatus.OK).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }

})

exports.getAllTasks = catchAsync(async (req, res) => {
    const allTasks = await Todo.find({})
    if (allTasks) {
        res.status(httpStatus.OK).json({
            success: true,
            data: allTasks,
            message: 'Tasks Found'
        })
    } else {
        res.status(httpStatus.OK).json({
            success: false,
            data: null,
            message: 'Tasks are Not Found'
        })
    }

})

exports.filterTask = catchAsync(async (req, res) => {
    const { complete, archive } = req.body
    const allTasks = await Todo.find().and([{ complete }, { archive }])
    if (allTasks) {
        res.status(httpStatus.OK).json({
            success: true,
            data: allTasks,
            message: 'Tasks Found'
        })
    } else {
        res.status(httpStatus.OK).json({
            success: false,
            data: null,
            message: 'Tasks are Not Found'
        })
    }

})

exports.orderTask = catchAsync(async (req, res) => {
    const { orderedListOfIds } = req.body // console.log(x.data.map((d)=>d._id))
    for (var i = 0; i < orderedListOfIds.length; i++) {
        await Todo.findByIdAndUpdate(orderedListOfIds[i], { order: i })
    }
    const allTasks = await Todo.find({}).sort({ order: 1 })
    if (allTasks) {
        res.status(httpStatus.OK).json({
            success: true,
            data: allTasks,
            message: 'Tasks Found'
        })
    } else {
        res.status(httpStatus.OK).json({
            success: false,
            data: null,
            message: 'Tasks are Not Found'
        })
    }

})