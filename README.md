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
  - Python
  - Flask for API
  - pyodbc for SQL Server connection
  - pandas for data manipulation

- Database:
  - SQL Server

## Project Structure

```
project_root/
│
├── frontend/  (React app)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/  (Python Flask backend)
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

## Setting Up the Project

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Start the Flask server:
   ```
   python app.py
   ```

## Connecting to SQL Server Database

The backend is configured to connect to a SQL Server database. Ensure that you have the correct database credentials set up in your Streamlit secrets or environment variables.

## Making Modifications

To modify the application:

- Frontend changes: Edit files in the `frontend/src` directory.
- Backend changes: Modify files in the `backend` directory.
- Database changes: Update queries in `backend/database.py`.

Remember to test thoroughly after making any changes.
