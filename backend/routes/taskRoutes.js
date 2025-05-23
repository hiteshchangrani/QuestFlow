const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { getTasks, getTaskById, getDashboardData, getUserDashboardData, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require('../controllers/taskController');


const router = express.Router();

router.get('/', protect, getTasks);
router.get('/:id', protect, getTaskById);
router.get('dashboard', protect, getDashboardData);
router.get('/user-dashboard-data', protect, getUserDashboardData);
router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;
