import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '../services/taskService';
import TaskList from '../components/TaskList';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdDate');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (filter !== 'all') {
      filtered = filtered.filter(task => task.status === filter);
    }

    // Sort tasks
    return filtered.sort((a, b) => {
      if (sortBy === 'createdDate') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  };

  const filteredTasks = getFilteredTasks();
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h2>My Tasks</h2>
          <p>{stats.total} tasks total</p>
        </div>
        <Link to="/create" className="btn btn-primary">
          + Add New Task
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>⚠️ {error}</span>
          <button onClick={fetchTasks} className="btn btn-sm">Retry</button>
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card todo">
          <div className="stat-number">{stats.todo}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="filter">Filter by Status:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="createdDate">Created Date (Newest)</option>
            <option value="priority">Priority (High to Low)</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No tasks found</h3>
          <p>
            {filter === 'all'
              ? 'Create your first task to get started!'
              : `No tasks with status "${filter}"`}
          </p>
          <Link to="/create" className="btn btn-primary">
            Create a Task
          </Link>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
      )}
    </div>
  );
}

export default Dashboard;
