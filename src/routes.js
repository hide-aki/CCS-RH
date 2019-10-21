import React from "react";

const Inicio = React.lazy(() => import("./views/Inicio"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));

var routes = [];

// eslint-disable-next-line no-self-compare
if (1 == 1) {
  routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/Inicio", name: "Inicio", component: Inicio },
    { path: "/Dashboard", name: "Dashboard", component: Dashboard }
  ];
} else{
  routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/Inicio", name: "Inicio", component: Inicio },
    { path: "/Dashboard", name: "Dashboard", component: Dashboard }
  ];
}

export default routes;
