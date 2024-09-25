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
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/  (Python Flask backend)
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

## Key Components

- **Frontend**: Built with React, using Vite as the build tool. Utilizes Tailwind CSS for styling and shadcn/ui for pre-built components.
- **Backend**: Python Flask application serving as the API, connecting to a SQL Server database.
- **State Management**: Uses Tanstack React Query for efficient data fetching and state management.
- **UI Components**: Leverages shadcn/ui for consistent and customizable UI elements.
- **Charting**: Recharts library is available for creating charts and graphs.
- **Icons**: Uses Lucide React for a comprehensive icon set.

## Getting Started

To set up the project locally:

1. Clone the repository
2. Navigate to the frontend directory and run `npm install`
3. Start the frontend with `npm run dev`
4. Navigate to the backend directory and install Python dependencies with `pip install -r requirements.txt`
5. Start the backend server with `python app.py`

Ensure you have Node.js, npm, and Python installed on your system.

## Usage Instructions

1. **Login**: Use your provided credentials to log in to the application.
2. **Dashboard**: After logging in, you'll be directed to the main dashboard where you can see an overview of your projects.
3. **Navigation**: Use the sidebar to navigate between different sections of the application (e.g., Stakeholders, Scope, Resources, etc.).
4. **Project Selection**: On the home page, use the project dropdown to select the project you want to work on. This selection will filter information across other screens.
5. **Data Management**: Each section (e.g., Scope, Resources) allows you to view, add, edit, and delete relevant data.
6. **Reports**: Use the various tabs in each section to access different reports and data views.

## Maintenance Guide

1. **Frontend Updates**:
   - To add new components, create a new file in the appropriate subdirectory of `src/components/`.
   - Update routing in `src/App.jsx` if adding new pages.
   - Run `npm run build` to build the project for production.

2. **Backend Updates**:
   - Add new API endpoints in `backend/app.py`.
   - Update database operations in `backend/database.py` as needed.
   - Always update `requirements.txt` if new Python packages are added.

3. **Database Maintenance**:
   - Regularly backup the SQL Server database.
   - Optimize queries and indexes for performance.

4. **Dependency Management**:
   - Regularly update npm packages with `npm update` in the frontend directory.
   - Update Python packages in the backend using `pip install --upgrade -r requirements.txt`.

5. **Testing**:
   - Write and maintain unit tests for both frontend and backend code.
   - Perform thorough testing after any significant updates.

6. **Deployment**:
   - Use a CI/CD pipeline for automated testing and deployment.
   - Ensure environment variables are properly set in production.

7. **Monitoring and Logging**:
   - Implement logging in both frontend and backend.
   - Set up monitoring tools to track application performance and errors.

8. **Security**:
   - Regularly update all dependencies to patch security vulnerabilities.
   - Perform security audits periodically.

## Contributing

We welcome contributions to the TimeCenter project. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your fork and submit a pull request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
