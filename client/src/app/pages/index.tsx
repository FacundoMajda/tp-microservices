import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const FeaturePage = lazy(() => import("./FeaturePage"));
const DashboardPage = lazy(() => import("./DashboardPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const ContainerDemoPage = lazy(() => import("./ContainerDemoPage"));
const ProductsPage = lazy(() => import("./ProductsPage"));

export { HomePage, FeaturePage, DashboardPage, ContainerDemoPage, AuthPage, ProductsPage };
