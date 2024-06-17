import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import Header from "../../../components/dashboard/Header";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useEffect } from "react";
import Overview from "../../../components/dashboard/Overview";

const UserDashboard = () => {
  const authUser = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authUser.token);
    if (!authUser.token) {
      navigate("/login");
    }
  }, [authUser.token]);

  return (
    <DashboardLayout>
      <Header />
      <Overview />
    </DashboardLayout>
  );
};

export default UserDashboard;
