import React from 'react';
import { Link } from 'react-router-dom';
import './TaskDetailsView.css';

function TaskDetailsView({ task, onDelete, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    const icons = {
      'todo': '📝',
      'in-progress': '⏳',
      'completed': '✅',
    };
    return icons[status] || '📋';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': '#4caf50',
      'medium': '#ff9800',
      'high': '#f44336',
    };
    return colors[priority] || '#666';
  };

  return (
    <div className="task-details-view">
      <div className="details-container">
        <div className="details-header">
          <div className="details-title-section">
            <span className="status-icon">{getStatusIcon(task.status)}</span>
            <h1 className="details-title">{task.title}</h1>
          </div>
          <button className="btn btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="details-content">
          <section className="details-section">
            <h3>Description</h3>
            <p className="description-text">{task.description}</p>
          </section>

          <div className="details-grid">
            <section className="details-section">
              <h3>Status</h3>
              <div className="status-display">
                {task.status === 'todo' && <span className="status-badge todo">To Do</span>}
                {task.status === 'in-progress' && <span className="status-badge in-progress">In Progress</span>}
                {task.status === 'completed' && <span className="status-badge completed">Completed</span>}
              </div>
            </section>

            <section className="details-section">
              <h3>Priority</h3>
              <div
                className="priority-display"
                style={{ borderLeftColor: getPriorityColor(task.priority) }}
              >
                {task.priority === 'low' && '🟢 Low Priority'}
                {task.priority === 'medium' && '🟡 Medium Priority'}
                {task.priority === 'high' && '🔴 High Priority'}
              </div>
            </section>

            <section className="details-section">
              <h3>Created Date</h3>
              <p className="date-text">{formatDateTime(task.createdDate)}</p>
            </section>

            <section className="details-section">
              <h3>Due Date</h3>
              <p className="date-text">
                {task.dueDate ? formatDate(task.dueDate) : 'No due date set'}
              </p>
            </section>

            <section className="details-section">
              <h3>Last Updated</h3>
              <p className="date-text">{formatDateTime(task.updatedDate)}</p>
            </section>

            <section className="details-section">
              <h3>Task ID</h3>
              <p className="id-text">{task.id}</p>
            </section>
          </div>
        </div>

        <div className="details-actions">
          <Link to={`/edit/${task.id}`} className="btn btn-primary">
            ✎ Edit Task
          </Link>
          <button className="btn btn-danger" onClick={onDelete}>
            🗑️ Delete Task
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsView;
