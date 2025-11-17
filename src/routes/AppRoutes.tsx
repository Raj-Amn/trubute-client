// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateTributePage } from "../pages/CreateTrubutePage";
import App from "../App";
import NotFound from "../pages/NotFound";
import MemorialPage from "../pages/MemorialPage";
import ViewMemorialPage from "../pages/ViewMemorialPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

// --- Import your pages ---

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Tribute creation flow */}
        {/* <Route path="/create-memorial" element={<CreateMemorialFor />} /> */}
        <Route path="/create-trubute" element={<CreateTributePage />} />
        <Route path="/memorial/:website" element={<MemorialPage />} />
        {/* Memorial Route */}
        <Route path="/memorials/:idOrWebsite" element={<ViewMemorialPage />} />
        {/* <Route path="/plan" element={<ChoosePlan />} />
        <Route path="/privacy" element={<PrivacyOptions />} /> */}

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
