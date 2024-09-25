import { HomeIcon, UsersIcon, FileTextIcon, DollarSignIcon, BriefcaseIcon, AwardIcon, CalendarIcon, AlertTriangleIcon, ShoppingCartIcon, GitMergeIcon, SettingsIcon, DatabaseIcon } from "lucide-react";
import Home from "./pages/Home.jsx";
import Stakeholders from "./pages/Stakeholders.jsx";
import Scope from "./pages/Scope.jsx";
import Costs from "./pages/Costs.jsx";
import Resources from "./pages/Resources.jsx";
import Quality from "./pages/Quality.jsx";
import Schedules from "./pages/Schedules.jsx";
import Risks from "./pages/Risks.jsx";
import Acquisitions from "./pages/Acquisitions.jsx";
import Integration from "./pages/Integration.jsx";
import Admin from "./pages/Admin.jsx";
import CadastroAuxiliar from "./pages/CadastroAuxiliar.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Home />,
  },
  {
    title: "Stakeholders",
    to: "/stakeholders",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <Stakeholders />,
  },
  {
    title: "Escopo",
    to: "/scope",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <Scope />,
  },
  {
    title: "Custos",
    to: "/costs",
    icon: <DollarSignIcon className="h-4 w-4" />,
    page: <Costs />,
  },
  {
    title: "Recursos",
    to: "/resources",
    icon: <BriefcaseIcon className="h-4 w-4" />,
    page: <Resources />,
  },
  {
    title: "Qualidade",
    to: "/quality",
    icon: <AwardIcon className="h-4 w-4" />,
    page: <Quality />,
  },
  {
    title: "Cronogramas",
    to: "/schedules",
    icon: <CalendarIcon className="h-4 w-4" />,
    page: <Schedules />,
  },
  {
    title: "Riscos",
    to: "/risks",
    icon: <AlertTriangleIcon className="h-4 w-4" />,
    page: <Risks />,
  },
  {
    title: "Aquisições",
    to: "/acquisitions",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    page: <Acquisitions />,
  },
  {
    title: "Integração",
    to: "/integration",
    icon: <GitMergeIcon className="h-4 w-4" />,
    page: <Integration />,
  },
  {
    title: "Cadastro Auxiliar",
    to: "/cadastro-auxiliar",
    icon: <DatabaseIcon className="h-4 w-4" />,
    page: <CadastroAuxiliar />,
  },
  {
    title: "Administração",
    to: "/admin",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Admin />,
  },
];
