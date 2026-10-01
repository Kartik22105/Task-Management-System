import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import './EditTask.css';

function EditTask() {
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

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await taskService.updateTask(id, formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to update task');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading && !task) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading task...</p>
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="error-state">
        <h2>Error Loading Task</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="edit-task">
      <div className="edit-task-container">
        <h2>Edit Task</h2>
        {error && <div className="alert alert-error">⚠️ {error}</div>}
        {task && (
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            isEdit={true}
          />
        )}
      </div>
    </div>
  );
}

export default EditTask;
