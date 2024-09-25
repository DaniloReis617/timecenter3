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
│   │   │       └── logo.png  # Logo da aplicação
│   │   │
│   │   ├── components/
│   │   │   ├── ui/  (shadcn/ui components)
│   │   │   ├── admin/  (Admin-specific components)
│   │   │   │   ├── ProjectConfigForm.jsx  # Formulário de configuração de projetos
│   │   │   │   ├── ProjectForm.jsx  # Formulário para criar/editar projetos
│   │   │   │   ├── ProjectManagement.jsx  # Gerenciamento geral de projetos
│   │   │   │   ├── ProjectsPerUser.jsx  # Associação de projetos a usuários
│   │   │   │   └── UserDashboard.jsx  # Dashboard de gerenciamento de usuários
│   │   │   ├── scope/  (Scope-related components)
│   │   │   │   ├── MaintenanceNoteTable.jsx  # Tabela de notas de manutenção
│   │   │   │   ├── ScopeFilters.jsx  # Filtros para o escopo do projeto
│   │   │   │   └── ScopeSummary.jsx  # Resumo do escopo do projeto
│   │   │   ├── schedules/  (Schedule-related components)
│   │   │   │   ├── ActivityExecutionForm.jsx  # Formulário de execução de atividades
│   │   │   │   ├── ActivityForm.jsx  # Formulário para detalhes de atividades
│   │   │   │   └── PaintingServiceForm.jsx  # Formulário para serviços de pintura
│   │   │   ├── ApoioForm.jsx  # Formulário para cadastro de apoio
│   │   │   ├── ApoioTable.jsx  # Tabela de apoios cadastrados
│   │   │   ├── AreaForm.jsx  # Formulário para cadastro de áreas
│   │   │   ├── AreaTable.jsx  # Tabela de áreas cadastradas
│   │   │   ├── EscopoOrigemForm.jsx  # Formulário para origem do escopo
│   │   │   ├── EscopoOrigemTable.jsx  # Tabela de origens do escopo
│   │   │   ├── EscopoTipoForm.jsx  # Formulário para tipos de escopo
│   │   │   ├── EspecialidadeForm.jsx  # Formulário para especialidades
│   │   │   ├── EspecialidadeTable.jsx  # Tabela de especialidades
│   │   │   ├── ExecutanteForm.jsx  # Formulário para cadastro de executantes
│   │   │   ├── ExecutanteTable.jsx  # Tabela de executantes
│   │   │   ├── FamiliaEquipamentosForm.jsx  # Formulário para famílias de equipamentos
│   │   │   ├── FamiliaEquipamentosTable.jsx  # Tabela de famílias de equipamentos
│   │   │   ├── GenericForm.jsx  # Formulário genérico reutilizável
│   │   │   ├── GenericTable.jsx  # Tabela genérica reutilizável
│   │   │   ├── Layout.jsx  # Componente de layout principal
│   │   │   ├── MaintenanceNoteForm.jsx  # Formulário para notas de manutenção
│   │   │   ├── PlantaForm.jsx  # Formulário para cadastro de plantas
│   │   │   ├── PlantaTable.jsx  # Tabela de plantas cadastradas
│   │   │   ├── RecursoForm.jsx  # Formulário para cadastro de recursos
│   │   │   └── RecursoTable.jsx  # Tabela de recursos cadastrados
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin.jsx  # Página de administração
│   │   │   ├── CadastroAuxiliar.jsx  # Página de cadastros auxiliares
│   │   │   ├── Home.jsx  # Página inicial
│   │   │   ├── Login.jsx  # Página de login
│   │   │   ├── Scope.jsx  # Página de gerenciamento de escopo
│   │   │   ├── Schedules.jsx  # Página de cronogramas
│   │   │   ├── Stakeholders.jsx  # Página de gerenciamento de stakeholders
│   │   │   ├── Resources.jsx  # Página de recursos
│   │   │   ├── Costs.jsx  # Página de custos
│   │   │   ├── Quality.jsx  # Página de qualidade
│   │   │   ├── Risks.jsx  # Página de riscos
│   │   │   ├── Acquisitions.jsx  # Página de aquisições
│   │   │   ├── Integration.jsx  # Página de integração
│   │   │   └── UserSettings.jsx  # Página de configurações do usuário
│   │   │
│   │   ├── utils/
│   │   │   └── api.js  # Funções de utilidade para chamadas à API
│   │   │
│   │   ├── App.jsx  # Componente principal da aplicação
│   │   ├── index.css  # Estilos globais
│   │   └── main.jsx  # Ponto de entrada da aplicação React
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/  (Python Flask backend)
│   ├── app.py  # Aplicação principal Flask
│   ├── config.py  # Configurações do backend
│   ├── database.py  # Operações de banco de dados
│   └── requirements.txt  # Dependências Python
│
└── README.md  # Documentação do projeto

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

To set up the project locally:

1. Clone the repository
2. Navigate to the frontend directory and run `npm install`
3. Start the frontend with `npm run dev`
4. Navigate to the backend directory and install Python dependencies with `pip install -r requirements.txt`
5. Start the backend server with `python app.py`

Ensure you have Node.js, npm, and Python installed on your system.

## Contributing

We welcome contributions to the TimeCenter project. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your fork and submit a pull request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
