import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import TaskDetailsView from '../components/TaskDetailsView';
import './TaskDetails.css';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTask = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getTaskById(id);
      setTask(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        navigate('/');
      } catch (err) {
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="error-state">
        <h2>Error Loading Task</h2>
        <p>{error || 'Task not found'}</p>
        <button onClick={handleClose} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="task-details">
      <TaskDetailsView task={task} onDelete={handleDelete} onClose={handleClose} />
    </div>
  );
}

export default TaskDetails;
