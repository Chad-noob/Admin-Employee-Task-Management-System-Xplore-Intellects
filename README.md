# Xplore Intellects Task management sytem

Xplore Intellects Task management sytem is a role-based employee task management system built with MongoDB, Express, React, and Node.js.

## Development Note

This project was built in approximately 3 hours with limited time.
The current version focuses on core functionality, clean structure, and a usable UI within that timeline.

## Future Enhancements

- Better analytics and reporting widgets
- Email notifications for approval and task updates
- File attachments and task comments
- Improved test coverage (unit and integration tests)
- Deployment pipeline and production monitoring

## Features

- Admin login with predefined credentials
- Employee registration and approval flow
- JWT authentication and role-based access control
- Task assignment and status tracking
- Dashboard-first UX with cards, filters, and animations
- Responsive UI with Tailwind CSS and Framer Motion

## Demo Credentials

- Admin: `admin@taskflowpro.com`
- Password: `Admin@1234`

## Setup

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Create `backend/.env` with your MongoDB URI and JWT secret.

3. Start the app:

   ```bash
   npm run dev
   ```

If the concurrent setup fails, run frontend and backend separately in different terminals:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

The frontend runs on Vite (port 5173) and the backend runs on Express (port 5000).

**Port conflicts?** Kill existing processes with `Get-Process node | Stop-Process -Force` (Windows) or `pkill -f node` (Mac/Linux), then try again.
