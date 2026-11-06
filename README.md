# MERN University Starter

A reusable MERN Stack starter template for university projects. It provides a clean foundation for teams to start building their own applications without spending time on repetitive project setup.

The starter includes the basic frontend/backend structure, environment configuration, database connection, API routing, and centralized error handling. **It intentionally does not include application-specific features** such as authentication, CRUD modules, dashboards, form validation, or file uploads. Each team is expected to design and implement the features required by its own project.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Health Check](#api-health-check)
- [How the Application Is Connected](#how-the-application-is-connected)
- [Development Workflow](#development-workflow)
- [GitHub Team Workflow](#github-team-workflow)
- [What Is Not Included](#what-is-not-included)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Vanilla CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS
- Helmet
- Morgan
- Nodemon (development dependency)

The project uses JavaScript ES Modules.

## Project Structure

```text
mern-university-starter/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── health.controller.js
│   │   ├── middlewares/
│   │   │   ├── notFound.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── routes/
│   │   │   └── health.routes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

Some directories are intentionally empty placeholders for future project code.

## Prerequisites

Install the following before starting:

- **Node.js:** `20.19+` or `22.12+` (or a compatible newer release).
- **npm:** Installed with Node.js.
- **MongoDB:** A local MongoDB Community Server instance, or a MongoDB Atlas cluster.
- **Git:** To clone or fork the repository and collaborate with your team.

Check your installed versions:

```bash
node -v
npm -v
git --version
```

Vite's current compatibility requirement is Node.js `20.19+` or `22.12+`. If Vite reports an unsupported Node.js version, upgrade Node.js before installing dependencies.

## Getting Started

### 1. Get the repository

You can either fork this repository on GitHub and clone your fork, or clone it directly if you only need a local copy.

```bash
git clone https://github.com/YOUR-USERNAME/mern-university-starter.git
cd mern-university-starter
```

Replace `YOUR-USERNAME` with the GitHub username that owns your fork.

### 2. Configure the backend

Open a terminal in the project root:

```bash
cd server
npm install
```

Create your local environment file by copying the example:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Open `server/.env` and configure the values. For a local MongoDB installation, the example values can be used if MongoDB is running locally.

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/mern_university_starter
```

If you use MongoDB Atlas, replace `MONGODB_URI` with your own Atlas connection string. Do not commit your real `.env` file or share database credentials.

Start the backend:

```bash
npm run dev
```

The server connects to MongoDB before it starts listening. A successful startup should display messages indicating that MongoDB is connected and the server is listening on port `5000`.

Keep this terminal running.

### 3. Configure the frontend

Open a **second terminal** from the project root:

```bash
cd client
npm install
```

Create the frontend environment file:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

The default value is:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Keep both frontend and backend terminals running while developing.

## Environment Variables

### `server/.env`

| Variable | Purpose | Example |
|---|---|---|
| `PORT` | Port used by the Express server | `5000` |
| `NODE_ENV` | Runtime environment | `development` |
| `CLIENT_URL` | Exact frontend origin allowed by CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/mern_university_starter` |

### `client/.env`

| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL used by the shared Axios instance | `http://localhost:5000/api` |

Vite exposes variables prefixed with `VITE_` to frontend code. Never put secrets, passwords, or private API keys in frontend environment variables.

If Vite starts on a port other than `5173`, update `CLIENT_URL` in `server/.env` to match the exact frontend origin, then restart the backend. The allowed origin must include the protocol and port, for example `http://localhost:5174`.

## Available Scripts

Run these commands from their respective directories.

### Client (`client/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Server (`server/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the backend with Nodemon |
| `npm start` | Start the backend with Node.js |

## API Health Check

The starter provides one basic endpoint to verify that the Express API is reachable:

```http
GET http://localhost:5000/api/health
```

A successful response looks similar to:

```json
{
  "success": true,
  "message": "Server is running",
  "data": {
    "environment": "development",
    "timestamp": "2026-01-01T12:00:00.000Z"
  }
}
```

The timestamp will be generated at request time.

A request to an unknown route should return a JSON 404 response through the centralized error handler.

## How the Application Is Connected

- `client/src/services/api.js` exports a configured Axios instance.
- Its `baseURL` comes from `VITE_API_BASE_URL`.
- Frontend code can import this instance and call API endpoints relative to that base URL.
- `server/src/app.js` configures Express middleware and mounts API routes.
- `server/src/server.js` connects to MongoDB and starts the HTTP server.
- `CLIENT_URL` controls which frontend origin is allowed by the CORS configuration.

For example, if the base URL is `http://localhost:5000/api`, then:

```js
api.get("/health");
```

sends a request to:

```text
http://localhost:5000/api/health
```

## Development Workflow

1. Create a feature branch before working on a task.
2. Make focused changes related to that task.
3. Run the relevant checks before committing.
4. Commit with a clear message.
5. Push your branch to your fork.
6. Open a Pull Request if your team uses a shared integration branch.
7. Review and test changes before merging.

Suggested commit message examples:

```text
feat: add student listing page
fix: handle invalid student input
style: improve navigation layout
docs: update project setup instructions
```

## GitHub Team Workflow

For a university team project, a recommended workflow is:

1. The Team Leader forks this starter repository.
2. The Team Leader adds team members as collaborators to the fork.
3. Every member clones the team's fork.
4. Each member creates a separate branch for their assigned task.
5. Members commit and push their changes to their branches.
6. Members open Pull Requests to the team's integration branch.
7. The team reviews, tests, and merges approved changes.

A fork is an independent copy. Future changes to the original starter repository are not automatically added to existing forks. Teams can optionally use GitHub's **Sync fork** feature or configure the original repository as an `upstream` remote if they want to bring in later starter updates.

## What Is Not Included

This repository is intentionally a foundation, not a completed application. It does not implement:

- Authentication or authorization
- Application-specific CRUD operations
- Dashboards or business workflows
- Form validation
- Pagination, sorting, or filtering
- File uploads
- Notifications
- Application-specific database models

Each team should research, design, and implement the features required by its own project.

## Troubleshooting

### MongoDB connection fails

- Make sure your local MongoDB service is running.
- Check that `MONGODB_URI` in `server/.env` is correct.
- If using Atlas, verify the connection string and the cluster's network access configuration.

### The frontend cannot reach the backend

- Make sure the backend is running.
- Check `VITE_API_BASE_URL` in `client/.env`.
- Check that `CLIENT_URL` in `server/.env` exactly matches the frontend origin shown in the browser.
- Restart the relevant development server after changing an environment file.

### Vite uses a different port

If port `5173` is already occupied, Vite may select another available port. Update `CLIENT_URL` in `server/.env` to that exact origin and restart the backend.

### Dependencies or scripts are missing

Run `npm install` inside the relevant directory (`client` or `server`). This repository has separate package manifests and does not use a root-level npm workspace.

## Contributing

This starter is intended to be forked and extended by university project teams. Keep the foundation simple, add only what your application needs, and document any important setup decisions for your teammates.
