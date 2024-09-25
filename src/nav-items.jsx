import { HomeIcon, UsersIcon, FileTextIcon, DollarSignIcon, BriefcaseIcon, AwardIcon, CalendarIcon, AlertTriangleIcon, ShoppingCartIcon, GitMergeIcon, SettingsIcon, ListIcon } from "lucide-react";

export const getNavItems = (userProfile) => {
  const baseItems = [
    { title: "🏠 Home", to: "/", icon: <HomeIcon className="h-4 w-4" /> },
    { title: "👥 Stakeholders", to: "/stakeholders", icon: <UsersIcon className="h-4 w-4" /> },
  ];

  const gestorItems = [
    { title: "📋 Escopo", to: "/scope", icon: <FileTextIcon className="h-4 w-4" /> },
    { title: "💰 Custos", to: "/costs", icon: <DollarSignIcon className="h-4 w-4" /> },
    { title: "🔧 Recursos", to: "/resources", icon: <BriefcaseIcon className="h-4 w-4" /> },
    { title: "📅 Cronogramas", to: "/schedules", icon: <CalendarIcon className="h-4 w-4" /> },
  ];

  const adminItems = [
    { title: "✅ Qualidade", to: "/quality", icon: <AwardIcon className="h-4 w-4" /> },
    { title: "⚠️ Riscos", to: "/risks", icon: <AlertTriangleIcon className="h-4 w-4" /> },
    { title: "🛒 Aquisições", to: "/acquisitions", icon: <ShoppingCartIcon className="h-4 w-4" /> },
    { title: "🔗 Integração", to: "/integration", icon: <GitMergeIcon className="h-4 w-4" /> },
    { title: "📇 Cadastro Auxiliar", to: "/cadastro-auxiliar", icon: <ListIcon className="h-4 w-4" /> },
    { title: "🗂️ Administração", to: "/admin", icon: <SettingsIcon className="h-4 w-4" /> },
  ];

  if (["Super Usuário", "Administrador"].includes(userProfile)) {
    return [...baseItems, ...gestorItems, ...adminItems];
  } else if (userProfile === "Gestor") {
    return [...baseItems, ...gestorItems];
  } else {
    return baseItems;
  }
};
