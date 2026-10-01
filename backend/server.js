const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let tasks = [];

// Helper function to validate task
const validateTask = (task) => {
  const errors = [];
  
  if (!task.title || task.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!task.description || task.description.trim() === '') {
    errors.push('Description is required');
  }
  
  if (task.status && !['todo', 'in-progress', 'completed'].includes(task.status)) {
    errors.push('Invalid status');
  }
  
  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.push('Invalid priority');
  }
  
  return errors;
};

// GET all tasks
app.get('/api/tasks', (req, res) => {
  try {
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
});

// GET single task by ID
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    // Validate required fields
    const errors = validateTask({ title, description, status, priority });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status: status && status.trim() ? status : 'todo',
      priority: priority && priority.trim() ? priority : 'medium',
      dueDate: dueDate || null,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    };
    
    tasks.push(newTask);
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Validate required fields
    const errors = validateTask({ 
      title: title || tasks[taskIndex].title, 
      description: description || tasks[taskIndex].description, 
      status: status || tasks[taskIndex].status, 
      priority: priority || tasks[taskIndex].priority 
    });
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      title: title ? title.trim() : tasks[taskIndex].title,
      description: description ? description.trim() : tasks[taskIndex].description,
      status: status || tasks[taskIndex].status,
      priority: priority || tasks[taskIndex].priority,
      dueDate: dueDate !== undefined ? dueDate : tasks[taskIndex].dueDate,
      updatedDate: new Date().toISOString()
    };
    
    tasks[taskIndex] = updatedTask;
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1);
    
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/tasks`);
});
