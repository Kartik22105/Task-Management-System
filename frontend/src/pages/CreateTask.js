import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import './CreateTask.css';

function CreateTask() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await taskService.createTask(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create task');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-task">
      <div className="create-task-container">
        <h2>Create New Task</h2>
        {error && <div className="alert alert-error">⚠️ {error}</div>}
        <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
      </div>
    </div>
  );
}

export default CreateTask;
