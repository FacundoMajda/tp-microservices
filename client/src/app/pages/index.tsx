import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const FeaturePage = lazy(() => import("./FeaturePage"));
const DashboardPage = lazy(() => import("./DashboardPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const ContainerDemoPage = lazy(() => import("./ContainerDemoPage"));
const ProductsPage = lazy(() => import("./ProductsPage"));
const ProductsDetailsPage = lazy(() => import("./ProductsDetailsPage"));
const ProductsLayout = lazy(() => import("./layouts/Products.Layout"));
const OrdersPage = lazy(() => import("./OrdersPage"));
const PaymentsPage = lazy(() => import("./PaymentsPage"));

export {
  HomePage,
  FeaturePage,
  DashboardPage,
  ContainerDemoPage,
  AuthPage,
  ProductsPage,
  ProductsDetailsPage,
  ProductsLayout,
  OrdersPage,
  PaymentsPage,
};
