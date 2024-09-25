# TimeCenter - Streamlined Stakeholder Management

## Project Overview

TimeCenter is a comprehensive project management application designed to streamline stakeholder management and project oversight. It provides a centralized platform for managing various aspects of projects, including stakeholder communication, scope definition, resource allocation, cost tracking, and quality control.

## Technologies and Programming Languages

TimeCenter is built using the following technologies and programming languages:

- Frontend:
  - React.js
  - Tailwind CSS for styling
  - shadcn/ui for pre-built components
  - Tanstack React Query for data fetching and state management
  - Recharts for charts and graphs
  - Lucide React for icons

- Backend:
  - Node.js (simulated in the current version)
  - Express.js (for future API implementation)

- Database:
  - SQL Server (planned for future integration)

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── ProjectConfigForm.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── ProjectManagement.jsx
│   │   ├── ProjectsPerUser.jsx
│   │   └── UserDashboard.jsx
│   ├── schedules/
│   │   ├── ActivityExecutionForm.jsx
│   │   ├── ActivityForm.jsx
│   │   └── PaintingServiceForm.jsx
│   ├── scope/
│   │   ├── MaintenanceNoteTable.jsx
│   │   ├── ScopeFilters.jsx
│   │   └── ScopeSummary.jsx
│   ├── ui/
│   ├── Layout.jsx
│   └── MaintenanceNoteForm.jsx
├── pages/
│   ├── Acquisitions.jsx
│   ├── Admin.jsx
│   ├── CadastroAuxiliar.jsx
│   ├── Costs.jsx
│   ├── Home.jsx
│   ├── Integration.jsx
│   ├── Login.jsx
│   ├── Quality.jsx
│   ├── Resources.jsx
│   ├── Risks.jsx
│   ├── Schedules.jsx
│   ├── Scope.jsx
│   ├── Stakeholders.jsx
│   └── UserSettings.jsx
├── utils/
│   └── api.js
├── App.jsx
├── index.css
└── main.jsx
```

## Application Logic and Functionality

TimeCenter follows a component-based architecture using React. Here's a summary of its functionality and logic:

1. Authentication: Users log in through the Login page, which sets up the user context for the entire application.
2. Navigation: The Layout component provides a consistent structure across all pages, including the main navigation menu.
3. Project Management: The Home page allows users to select a project, which is then stored in local storage for use across the application. The Admin page provides interfaces for managing users, projects, and user-project associations.
4. Project Modules: The application includes various modules for managing different aspects of projects, such as Scope, Costs, Resources, Schedules, Quality, Risks, Acquisitions, and Integration.
5. Data Management: The application uses React Query for data fetching and state management, with API calls simulated in the api.js file.
6. Auxiliary Data: The CadastroAuxiliar page allows management of various auxiliary data used throughout the project.

## Making Modifications

To modify the application:

1. Component Updates: To change the behavior or appearance of a specific feature, locate the relevant component in the `src/components` directory and modify it directly.
2. Adding New Features: Create new components in the appropriate subdirectory of `src/components`. If adding a new page, create it in the `src/pages` directory and update the routing in `App.jsx`.
3. API Changes: To modify data fetching or update mock data, edit the `src/utils/api.js` file.
4. Styling: The application uses Tailwind CSS. Modify styles by changing Tailwind classes in the components.
5. Dependencies: The project uses various libraries like React Query and shadcn/ui. To add or update dependencies, use the package manager (npm or yarn) and update imports as necessary.
6. Testing: Ensure to test any modifications thoroughly across different parts of the application to maintain overall functionality.

## Connecting to SQL Server Database

To connect the application to a SQL Server database using the provided Python functions, you would need to:

1. Set up a backend server (e.g., using Node.js and Express.js) that can interact with the SQL Server database.
2. Install necessary packages on the backend:
   - `mssql` for Node.js to connect to SQL Server
   - `express` for creating the API server
3. Port the Python functions to JavaScript/Node.js. For example:

```javascript
const sql = require('mssql');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

async function getDbConnection() {
    try {
        await sql.connect(config);
        return sql;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

async function executeReadQuery(query, params = []) {
    try {
        const pool = await getDbConnection();
        const result = await pool.request()
            .query(query);
        return result.recordset;
    } catch (err) {
        console.error('Query execution failed:', err);
        throw err;
    }
}

// Implement other functions similarly...
```

4. Create API endpoints in your Express server that use these functions to interact with the database.
5. Update the frontend `api.js` file to make real API calls to your backend server instead of using mock data.
6. Ensure proper error handling and security measures (like input sanitization and authentication) are implemented.

Remember to follow React best practices, keep components small and focused, and maintain consistent coding styles throughout the project.
