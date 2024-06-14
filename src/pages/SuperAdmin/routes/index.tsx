import ProtectedRoute from "../../../ProtectedRoute";
import ManageUsers from "../ManageUsers";
import UserDetails from "../ManageUsers/UserDetails";
import AdminHome from "../overview";
import AdminSettings from "../settings";

const SuperAdminRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdminHome />
      </ProtectedRoute>
    ),
    title: "Home",
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <AdminSettings />
      </ProtectedRoute>
    ),
    title: "Settings",
  },
  {
    path: "/manage-users",
    element: (
      <ProtectedRoute>
        <ManageUsers />
      </ProtectedRoute>
    ),
    title: "Users",
  },
  {
    path: "/manage-users/:id",
    element: (
      <ProtectedRoute>
        <UserDetails />
      </ProtectedRoute>
    ),
    title: "Users",
  },
];

export default SuperAdminRoutes;
