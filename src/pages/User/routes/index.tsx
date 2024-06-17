import ProtectedRoute from "../../../ProtectedRoute";
import UserDashboard from "../dashboard";
import CreateOrder from "../orders/create";
import UserSettings from "../settings";

const UserRoutes = [
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
    path: "/orders/create",
    element: (
      <ProtectedRoute>
        <CreateOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <UserSettings />
      </ProtectedRoute>
    ),
    title: "Users",
  },
];

export default UserRoutes;
