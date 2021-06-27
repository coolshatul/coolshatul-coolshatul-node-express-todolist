const express = require('express');
const router = express.Router();

const { createTask, updateTask, deleteTask, getSingleTask, getAllTasks, filterTask, orderTask } = require('../controllers/todoController');

router.route('/').post(createTask);
router.route('/:id').put(updateTask);
router.route('/:id').delete(deleteTask);
router.route('/:id').get(getSingleTask);
router.route('/').get(getAllTasks);
router.route('/filterTask').post(filterTask);
router.route('/orderTask').post(orderTask);


module.exports = router