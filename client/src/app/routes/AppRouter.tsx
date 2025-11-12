import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages";
import AppRoutes, { type IRoute } from "./routes";
import { ProtectedRoute } from "./ProtectedRoute";
import React, { Suspense } from "react";

// Asumiendo que tienes un componente Loading, si no, crea uno
const Loading = () => <div>Loading...</div>;

const renderRoutes = (routes: IRoute[]) => {
  return routes.map((route) => {
    const element = route.requiresAuth ? (
      <ProtectedRoute>
        <route.Component />
      </ProtectedRoute>
    ) : (
      <route.Component />
    );

    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return (
      <Route
        key={route.path || "index"}
        index={route.index}
        path={route.path}
        element={element}
      />
    );
  });
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        {renderRoutes(AppRoutes)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
