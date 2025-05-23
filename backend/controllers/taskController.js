const Task = require('../models/Task');
const { create } = require('../models/User');

const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter =  {};

        if (status) {
            filter.status = status;
        }

        let tasks;

        if(req.user.role === 'admin') {
            tasks = await Task.find(filter).populate('assignedTo', 'name email profileImageUrl');
        }
        else {
            tasks = await Task.find({ assignedTo: req.user._id, ...filter }).populate('assignedTo', 'name email profileImageUrl');
        }

        tasks = await Promise.all(tasks.map(async (task) => {
            const completedCount = task.todoChecklist.filter(item => item.completed).length;
            return {
                ...task._doc,
                completedTodoCount: completedCount,
            };
        }
        ));

        const allTasks = await Task.countDocuments(
            req.user.role === 'admin' ? {} : { assignedTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: 'Pending',
            ...(req.user.role !== 'admin' && { assignedTo: req.user._id }),
        });

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: 'In Progress',
            ...(req.user.role !== 'admin' && { assignedTo: req.user._id }),
        });

        const completedTasks = await Task.countDocuments({
            ...filter,
            status: 'Completed',
            ...(req.user.role !== 'admin' && { assignedTo: req.user._id }),
        });

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
        "assignedTo",
        "name email profileImageUrl"
        );

        if (!task) {
        return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, assignedTo, attachments, todoChecklist } = req.body;
        
        if(!Array.isArray(assignedTo)) {
            return res.status(400).json({message: 'assignedTo must be an array of userIds'});
        }

        newTask = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            attachments,
            todoChecklist,
        });

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;    
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        if(req.body.assignedTo) {
            if(!Array.isArray(req.body.assignedTo)) {
                return res.status(400).json({message: 'assignedTo must be an array of userIds'});
            }
            task.assignedTo = req.body.assignedTo;
        }

        const newUpdatedTask = await task.save();
        res.status(200).json({
            message: 'Task updated successfully',
            task: newUpdatedTask,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateTaskChecklist = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getDashboardData = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getUserDashboardData = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData,
};

