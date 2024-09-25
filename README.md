# TimeCenter - Streamlined Stakeholder Management

## Project Overview

TimeCenter is a comprehensive project management application designed to streamline stakeholder management and project oversight. It provides a centralized platform for managing various aspects of projects, including stakeholder communication, scope definition, resource allocation, cost tracking, and quality control.

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── ProjectConfigForm.jsx    # Form for project configuration
│   │   ├── ProjectForm.jsx          # Form for creating/editing projects
│   │   ├── ProjectManagement.jsx    # Project management dashboard
│   │   ├── ProjectsPerUser.jsx      # User-project association management
│   │   └── UserDashboard.jsx        # User management dashboard
│   ├── schedules/
│   │   ├── ActivityExecutionForm.jsx # Form for activity execution
│   │   ├── ActivityForm.jsx         # Form for creating/editing activities
│   │   └── PaintingServiceForm.jsx  # Form for painting service details
│   ├── scope/
│   │   ├── MaintenanceNoteTable.jsx # Table for maintenance notes
│   │   ├── ScopeFilters.jsx         # Filters for scope management
│   │   └── ScopeSummary.jsx         # Summary of project scope
│   ├── ui/                          # Reusable UI components
│   ├── Layout.jsx                   # Main layout component
│   └── MaintenanceNoteForm.jsx      # Form for maintenance notes
├── pages/
│   ├── Acquisitions.jsx             # Acquisitions management page
│   ├── Admin.jsx                    # Admin dashboard page
│   ├── CadastroAuxiliar.jsx         # Auxiliary registration page
│   ├── Costs.jsx                    # Cost management page
│   ├── Home.jsx                     # Home page
│   ├── Integration.jsx              # Integration management page
│   ├── Login.jsx                    # Login page
│   ├── Quality.jsx                  # Quality management page
│   ├── Resources.jsx                # Resource management page
│   ├── Risks.jsx                    # Risk management page
│   ├── Schedules.jsx                # Schedules management page
│   ├── Scope.jsx                    # Scope management page
│   ├── Stakeholders.jsx             # Stakeholder management page
│   └── UserSettings.jsx             # User settings page
├── utils/
│   └── api.js                       # API utility functions
├── App.jsx                          # Main application component
├── index.css                        # Global styles
└── main.jsx                         # Application entry point

```

## Application Logic and Functionality

TimeCenter is built using React and follows a component-based architecture. Here's a summary of its functionality and logic:

1. Authentication: Users log in through the Login page, which sets up the user context for the entire application.

2. Navigation: The Layout component provides a consistent structure across all pages, including the main navigation menu.

3. Project Management: 
   - The Home page allows users to select a project, which is then stored in local storage for use across the application.
   - The Admin page provides interfaces for managing users, projects, and user-project associations.

4. Project Modules:
   - Scope: Manages project scope, including maintenance notes and scope changes.
   - Costs: Handles budget tracking and cost management.
   - Resources: Manages resource allocation and utilization.
   - Schedules: Deals with project timelines and activity scheduling.
   - Quality: Manages quality control measures and inspections.
   - Risks: Handles risk assessment and mitigation strategies.
   - Acquisitions: Manages procurement and contract management.
   - Integration: Provides overall project integration and dashboard views.

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

Remember to follow React best practices, keep components small and focused, and maintain consistent coding styles throughout the project.
