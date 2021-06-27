const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    complete: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
)

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo