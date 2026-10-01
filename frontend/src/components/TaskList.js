import React from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';

function TaskList({ tasks, onDelete }) {
  const getStatusBadge = (status) => {
    const badges = {
      'todo': { label: 'To Do', class: 'badge-todo' },
      'in-progress': { label: 'In Progress', class: 'badge-in-progress' },
      'completed': { label: 'Completed', class: 'badge-completed' },
    };
    return badges[status] || { label: status, class: '' };
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'low': { label: '🟢 Low', class: 'priority-low' },
      'medium': { label: '🟡 Medium', class: 'priority-medium' },
      'high': { label: '🔴 High', class: 'priority-high' },
    };
    return badges[priority] || { label: priority, class: '' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-badges">
              <span className={`badge status-badge ${getStatusBadge(task.status).class}`}>
                {getStatusBadge(task.status).label}
              </span>
              <span className={`badge priority-badge ${getPriorityBadge(task.priority).class}`}>
                {getPriorityBadge(task.priority).label}
              </span>
            </div>
          </div>

          <p className="task-description">{task.description}</p>

          <div className="task-meta">
            <div className="meta-item">
              <span className="meta-label">Created:</span>
              <span className="meta-value">{formatDate(task.createdDate)}</span>
            </div>
            {task.dueDate && (
              <div className="meta-item">
                <span className="meta-label">Due:</span>
                <span className="meta-value">{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          <div className="task-actions">
            <Link to={`/view/${task.id}`} className="btn btn-sm btn-info">
              View Details
            </Link>
            <Link to={`/edit/${task.id}`} className="btn btn-sm btn-warning">
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
