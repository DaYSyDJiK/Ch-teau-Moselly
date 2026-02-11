import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Domaine from "./pages/Domaine";
import Prestations from "./pages/Prestations";
import Galerie from "./pages/Galerie";
import Infos from "./pages/Infos";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/mentions-legales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "domaine", element: <Domaine /> },
      { path: "prestations", element: <Prestations /> },
      { path: "galerie", element: <Galerie /> },
      { path: "infos", element: <Infos /> },
      { path: "contact", element: <Contact /> },
      { path: "mentions-legales", element: <MentionsLegales /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
