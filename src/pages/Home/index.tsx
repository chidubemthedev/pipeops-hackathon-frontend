import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { logoutUser } from "../../features/auth/authSlice";
import DashboardLayout from "../../layouts/DashboardLayout";

const Home = () => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = authUser?.token;

  useEffect(() => {
    if (!authUser.token.access) {
      navigate("/login");
    }
  }, [authUser.token]);

  const logOutUser = async () => {
    const currentUser = {
      refreshToken: token?.refresh?.token,
    };
    dispatch(logoutUser(currentUser));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="px-4 py-10 mx-auto mt-8">
          <div className="w-full px-4">
            <h4 className="font-mono">
              Welcome back,{" "}
              <span className="font-serif font-semibold underline text-indigo-600 capitalize">
                {authUser.userData.firstName}
              </span>
            </h4>
          </div>
          <div className="w-full py-16 px-8">
            <button
              aria-label="Logout"
              onClick={logOutUser}
              className="py-1 px-3 min-w-[4rem] bg-red-400 text-white text-2xl cursor-pointer hover:bg-red-600 rounded-md"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
