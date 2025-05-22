const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   text: {
      type: String,
      required: true,
   },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
       
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    status:{
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    dueDate: {
        type: Date,
        default: null,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    attachments: [{
        type: String,
    }],
    createdBy: {    
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    todoChecklist: [todoSchema],
    progress: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });



module.exports = mongoose.model('Task', taskSchema);