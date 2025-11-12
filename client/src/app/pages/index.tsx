import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const FeaturePage = lazy(() => import("./FeaturePage"));
const DashboardPage = lazy(() => import("./DashboardPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const ContainerDemoPage = lazy(() => import("./ContainerDemoPage"));
const ProductsPage = lazy(() => import("./ProductsPage"));
const ProductsDetailsPage = lazy(() => import("./ProductsDetailsPage"));
const ProductsLayout = lazy(() => import("./layouts/Products.Layout"));

export {
  HomePage,
  FeaturePage,
  DashboardPage,
  ContainerDemoPage,
  AuthPage,
  ProductsPage,
  ProductsDetailsPage,
  ProductsLayout,
};
