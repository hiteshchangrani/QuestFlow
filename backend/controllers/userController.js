const task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({role:'member'}).select('-password');

        const usersWithTasksCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await task.countDocuments({assignedTo: user._id, status: 'Pending' });
            const inProgressTasks = await task.countDocuments({assignedTo: user._id, status: 'In Progress' });      
            const completedTasks = await task.countDocuments({assignedTo: user._id, status: 'Completed' });

            return {
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks
            };


        }));

        res.json(usersWithTasksCounts);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
} 

// const deleteUser = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
        
//     }
// }   

module.exports = {
    getUsers,
    getUserById,
    // deleteUser     
}