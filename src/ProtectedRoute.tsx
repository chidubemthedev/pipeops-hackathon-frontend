import { Navigate } from "react-router-dom";
import { store } from "./app/store";

const ProtectedRoute = ({ children }: { children: any }) => {
  const authenticated = store.getState().auth?.activeUser;

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
