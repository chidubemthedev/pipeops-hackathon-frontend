import ProtectedRoute from "../../../ProtectedRoute";
import UserDashboard from "../dashboard";
import UserSettings from "../settings";

const UserRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
    title: "Home",
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
