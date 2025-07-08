import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./router/router.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
