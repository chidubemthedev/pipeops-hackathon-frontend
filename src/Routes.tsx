import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Register";

// import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "./app/hooks";
import NotFound from "./pages/Error/NotFound";
import SuperAdminRoutes from "./pages/SuperAdmin/routes";
import UserRoutes from "./pages/User/routes";
import PaymentPage from "./pages/payment";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "./pages/User/dashboard";
import Success from "./pages/payment/Success";

const baseRoutes = [
  {
    path: "/login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "/signup",
    element: <Signup />,
    title: "Signup",
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
    title: "Home",
  },
  {
    path: "/order/:id",
    element: <PaymentPage />,
  },
  {
    path: "/payment/success",
    element: <Success />,
  },
  {
    path: "*",
    element: <NotFound />,
    title: "not-found",
  },
  // {
  //   path: "/leagues/my-leagues",
  //   element: (
  //     <ProtectedRoute>
  //       <Leagues />
  //     </ProtectedRoute>
  //   ),
  //   title: "My Leagues",
  // },
];

const getRoutesByRole = (role: string) => {
  if (role === "super") {
    return baseRoutes.concat(SuperAdminRoutes);
  } else if (role === "admin") {
    // return baseRoutes.concat(AdminRoutes); using superadminroutes because admin routes are not yet created
    return baseRoutes.concat(SuperAdminRoutes);
  } else if (role === "user") {
    return baseRoutes.concat(UserRoutes);
  } else {
    return baseRoutes;
  }
};

const AppRoutes = () => {
  const authUser = useAppSelector((state) => state.auth);

  const { userData } = authUser;
  const role = userData?.role;

  const pageRoutes = getRoutesByRole(role).map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <BrowserRouter>
      <Routes>{pageRoutes}</Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
