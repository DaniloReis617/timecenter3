# TimeCenter - Streamlined Stakeholder Management

## Project Overview

TimeCenter is a comprehensive project management application designed to streamline stakeholder management and project oversight. It provides a centralized platform for managing various aspects of projects, including stakeholder communication, scope definition, resource allocation, cost tracking, and quality control.

## Project Structure

```
project_root/
│
├── frontend/  (React app)
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │       └── logo.png
│   │   │
│   │   ├── components/
│   │   │   ├── ui/  (shadcn/ui components)
│   │   │   ├── admin/  (Admin-specific components)
│   │   │   ├── scope/  (Scope-related components)
│   │   │   ├── schedules/  (Schedule-related components)
│   │   │   └── ... (Other component files)
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin.jsx  (Admin dashboard)
│   │   │   ├── CadastroAuxiliar.jsx  (Auxiliary registration)
│   │   │   ├── Home.jsx  (Home page)
│   │   │   ├── Login.jsx  (Login page)
│   │   │   ├── Scope.jsx  (Scope management)
│   │   │   ├── Schedules.jsx  (Schedules management)
│   │   │   └── ... (Other page components)
│   │   │
│   │   ├── utils/
│   │   │   └── api.js  (API utility functions)
│   │   │
│   │   ├── App.jsx  (Main app component)
│   │   ├── index.css  (Global styles)
│   │   └── main.jsx  (Entry point)
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/  (Python Flask backend)
│   ├── app.py  (Main Flask application)
│   ├── config.py  (Configuration settings)
│   ├── database.py  (Database operations)
│   └── requirements.txt  (Python dependencies)
│
└── README.md  (Project documentation)
```

## Key Components

- **Frontend**: Built with React, using Vite as the build tool. Utilizes Tailwind CSS for styling and shadcn/ui for pre-built components.
- **Backend**: Python Flask application serving as the API, connecting to a SQL Server database.
- **State Management**: Uses Tanstack React Query for efficient data fetching and state management.
- **UI Components**: Leverages shadcn/ui for consistent and customizable UI elements.
- **Charting**: Recharts library is available for creating charts and graphs.
- **Icons**: Uses Lucide React for a comprehensive icon set.

## Main Features

1. **User Authentication**: Secure login system with role-based access control.
2. **Project Management**: Create, view, and manage multiple projects.
3. **Stakeholder Management**: Track and manage project stakeholders.
4. **Scope Management**: Define and track project scope, including maintenance notes.
5. **Resource Allocation**: Manage and allocate resources across projects.
6. **Cost Tracking**: Monitor and analyze project costs.
7. **Schedule Management**: Create and manage project schedules and timelines.
8. **Quality Control**: Tools for ensuring project quality standards.
9. **Risk Management**: Identify and track project risks.
10. **Admin Dashboard**: Comprehensive admin tools for user and project management.

## Getting Started

(Include instructions for setting up the project, running the frontend and backend, and any necessary configuration steps.)

## Contributing

(Add guidelines for contributing to the project, if applicable.)

## License

(Specify the project's license information.)
