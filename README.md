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

#### Solution 3: Kill Port Conflicts

If ports 5000 or 5173 are already in use:

**Windows (PowerShell):**
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue).OwningProcess | Stop-Process -Force

# Kill all node processes
Get-Process node | Stop-Process -Force

# Try npm run dev again
npm run dev
```

**Mac/Linux:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Try npm run dev again
npm run dev
```

#### Solution 4: Run with Different Ports

Edit `backend/src/server.js` and `frontend/vite.config.js` to use different ports if 5000 or 5173 are occupied.

**For Backend (backend/src/server.js):**
```javascript
const PORT = process.env.PORT || 3000; // Change from 5000 to 3000
```

**For Frontend (frontend/vite.config.js):**
```javascript
export default {
  server: {
    port: 3173 // Change from 5173 to 3173
  }
}
```

### Common Errors

**Error: "listen EADDRINUSE"**
- Port is already in use. See Solution 3 above.

**Error: "MongoDB connection failed"**
- Ensure MongoDB is running and `.env` file has correct `MONGODB_URI`

**Error: "Cannot find module"**
- Run `npm install` in both root, `backend/`, and `frontend/` directories

**Vite showing "Address already in use"**
- Multiple frontend ports are tried. Wait for it to settle on available port, or manually kill Node processes.
