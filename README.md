# Welcome to your GPT Engineer project

## Project info

**URL**: https://run.gptengineer.app/projects/1a2d1b37-30b8-4a2b-a423-1cd10e9b7a19/improve

## Project Structure

```
src/
├── assets/
│   └── images/
│       └── logo.png
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
│   │   └── [various UI components]
│   ├── Layout.jsx
│   └── MaintenanceNoteForm.jsx
├── lib/
│   └── utils.js
├── pages/
│   ├── Acquisitions.jsx
│   ├── Admin.jsx
│   ├── Costs.jsx
│   ├── Home.jsx
│   ├── Index.jsx
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

## How can I edit this code?

There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://gptengineer.app/projects/1a2d1b37-30b8-4a2b-a423-1cd10e9b7a19/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app.

Simply visit your project at [GPT Engineer](https://gptengineer.app/projects/1a2d1b37-30b8-4a2b-a423-1cd10e9b7a19/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.gptengineer.app/tips-tricks/custom-domain/)
