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

The frontend runs on Vite and the backend runs on Express.

## Troubleshooting

### Issue: `npm run dev` crashes or fails

If `npm run dev` doesn't work, try these alternative solutions:

#### Solution 1: Run Frontend and Backend Separately (Recommended)

**Terminal 1 - Run Backend:**
```bash
cd backend
npm install
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Run Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173` (or next available port)

#### Solution 2: Clear Cache and Reinstall

```bash
# Remove node_modules and lock files
rm -r node_modules
rm package-lock.json
rm backend/node_modules
rm frontend/node_modules

# Reinstall everything
npm install
npm run dev
```


