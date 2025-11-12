import {
  HomePage,
  FeaturePage,
  DashboardPage,
  ContainerDemoPage,
  ProductsPage,
  ProductsDetailsPage,
  ProductsLayout,
  OrdersPage,
  PaymentsPage,
} from "../pages";

export interface IRoute {
  path?: string;
  Component: React.LazyExoticComponent<React.FC> | React.FC;
  children?: IRoute[];
  index?: boolean;
  requiresAuth?: boolean;
}

const AppRoutes: IRoute[] = [
  {
    path: "/",
    index: true,
    Component: HomePage,
    requiresAuth: true,
  },

  {
    path: "/feature",
    Component: FeaturePage,
    requiresAuth: true,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
    requiresAuth: true,
  },
  {
    path: "/container-demo",
    Component: ContainerDemoPage,
    requiresAuth: true,
  },
  {
    path: "/products",
    Component: ProductsLayout,
    requiresAuth: true,
    children: [
      {
        index: true,
        Component: ProductsPage,
        requiresAuth: true,
      },
      {
        path: ":productId",
        Component: ProductsDetailsPage,
        requiresAuth: true,
      },
    ],
  },
  {
    path: "/orders",
    Component: OrdersPage,
    requiresAuth: true,
  },
  {
    path: "/payments",
    Component: PaymentsPage,
    requiresAuth: true,
  },
];

export default AppRoutes;
