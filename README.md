# Task Management System

A full-stack task management application built with React.js, Node.js, and Express.js.

## Project Structure

```
Task Management/
├── backend/          # Express.js REST API server
│   ├── package.json
│   ├── server.js
│   └── .gitignore
├── frontend/         # React.js web application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .gitignore
└── README.md
```

## Features

### Dashboard
- Display all tasks with title, description, status, priority, and created date
- Show task statistics (total, to-do, in-progress, completed)
- Filter tasks by status
- Sort tasks by created date, priority, or due date
- Quick access to create, view, edit, and delete tasks

### Create Task
- Form with validation for title and description (required fields)
- Fields for status, priority, and due date (optional)
- Clear error messages for validation failures
- Cancel option to return to dashboard

### Edit Task
- Pre-populated form with existing task data
- Same validation and fields as create task
- Update and cancel options

### Task Details
- Complete task information display
- Formatted dates and status/priority badges
- Actions to edit or delete task
- Return to dashboard option

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for all screen sizes
- Touch-friendly buttons and interactions

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Package Manager:** npm
- **Data Storage:** In-memory (arrays/objects)
- **Port:** 5000 (default)

### Frontend
- **Library:** React.js v18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3 (Responsive Design)
- **Port:** 3000 (default with Create React App)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev    # Development mode with nodemon
   # or
   npm start      # Production mode
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## API Endpoints

### GET /api/tasks
Retrieve all tasks
- Response: Array of task objects

### GET /api/tasks/:id
Retrieve a single task by ID
- Parameters: `id` (task ID)
- Response: Single task object

### POST /api/tasks
Create a new task
- Body:
  ```json
  {
    "title": "string (required)",
    "description": "string (required)",
    "status": "todo|in-progress|completed",
    "priority": "low|medium|high",
    "dueDate": "ISO date string (optional)"
  }
  ```
- Response: Created task object with generated ID

### PUT /api/tasks/:id
Update an existing task
- Parameters: `id` (task ID)
- Body: Same as POST (all fields optional)
- Response: Updated task object

### DELETE /api/tasks/:id
Delete a task
- Parameters: `id` (task ID)
- Response: Deleted task object

## Task Object Structure

```javascript
{
  id: "uuid string",
  title: "Task Title",
  description: "Detailed description",
  status: "todo" | "in-progress" | "completed",
  priority: "low" | "medium" | "high",
  dueDate: "2026-12-31" | null,
  createdDate: "2026-10-01T10:00:00.000Z",
  updatedDate: "2026-10-01T10:00:00.000Z"
}
```

## Usage

1. **View Tasks:** Open the dashboard to see all your tasks
2. **Create Task:** Click "Add New Task" button and fill in the form
3. **View Details:** Click "View Details" on any task card
4. **Edit Task:** Click "Edit" on a task or from task details page
5. **Delete Task:** Click "Delete" to remove a task (confirmation required)
6. **Filter & Sort:** Use the filter and sort dropdowns to organize tasks

## Data Storage

All task data is stored in-memory in the backend. Data will be lost when the server restarts.

For persistent storage, you can:
- Integrate a database (MongoDB, PostgreSQL, etc.)
- Use localStorage for client-side persistence
- Implement file-based storage

## Development

### Run Both Servers (Simultaneously in different terminals)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Project Structure Details

**Backend Structure:**
- Server configuration and middleware setup
- REST API routes
- In-memory task storage
- Request validation
- Error handling

**Frontend Structure:**
- Pages: Dashboard, CreateTask, EditTask, TaskDetails
- Components: TaskForm, TaskList, TaskDetailsView
- Services: taskService (API integration)
- Styles: CSS files for each component
- Routing: React Router configuration

## Error Handling

- **Frontend:** Displays user-friendly error messages
- **Backend:** Returns structured error responses with HTTP status codes
- **Validation:** Form validation on frontend, server-side validation on backend
- **Network Errors:** Graceful handling of connection failures

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- Task categories and tags
- Task reminders and notifications
- Search functionality
- Task history/activity log
- Dark mode theme
- Export tasks to CSV/PDF
- Collaboration features (share tasks)
- Recurring tasks

## License

MIT License - feel free to use this project for learning and development purposes.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

Built with using React and Express.js
