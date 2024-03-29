import React from "react";

const Inicio = React.lazy(() => import("./views/Inicio"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Forms = React.lazy(() => import("./views/Forms"));
const Reclutamiento = React.lazy(() => import("./views/Reclutamiento"));
const EntrevistaRH = React.lazy(() => import("./views/EntrevistaRH"));


var routes = [];

routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Forms", name: "Forms", component: Forms },
  { path: "/Reclutamiento", name: "Reclutamiento", component: Reclutamiento },
  { path: "/EntrevistaRH", name: "Entrevistas Pendientes", component: EntrevistaRH },

];

export default routes;
