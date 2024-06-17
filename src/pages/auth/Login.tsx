import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { Button } from "../../components/Button";
import { InputField } from "../../components/Input";
import { loginUser, restoreDefault } from "../../features/auth/authSlice";
import ResetPassword from "./ResetPassword";
import UpdatePassword from "./UpdatePassword";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const loading = authUser.loading;

  const [allInputs, setAllInputs] = useState({
    email: "",
    password: "",
  });

  const [passwordInputType, setPasswordInputType] = useState("password");

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (authUser.activeUser) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  }, [authUser.activeUser, navigate, authUser.token]);

  useEffect(() => {
    dispatch(restoreDefault());
  }, []);

  const handleFormChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllInputs({ ...allInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(allInputs));
  };

  const handlePasswordToggle = () => {
    setPasswordInputType(passwordInputType === "text" ? "password" : "text");
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="bg-loginBottomBackground bg-bottom bg-no-repeat bg-cover">
      <div className="bg-white shadow-loginHeaderShadow fixed w-[100%]">
        <h1 className="py-[20px] px-[45px] text-primary text-center text-[30px] font-[700]">
          VINANCE
        </h1>
      </div>

      <div className="bg-loginBackground bg-center bg-no-repeat bg-cover bg-opacity-[0] h-[100vh] flex md:items-center justify-center">
        <div className="flex flex-col bg-white mt-[100px] shadow-loginShadow rounded-[10px] px-[20px] py-[30px] w-[532px] h-fit">
          <div className="">
            <div className="mb-[42px]">
              <h2 className="ml-[20px] text-[30px] font-[500] tracking-[0.5px] text-generalBlack">
                Login to your account
              </h2>
              <div className="bg-[#E8EAED] h-[1px] w-full mt-[16px]" />
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="space-y-[20px]">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g example@gmail.com"
                      classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
                      onChange={handleFormChanger}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
                    >
                      Enter Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <InputField
                      onChange={handleFormChanger}
                      onPasswordToggle={handlePasswordToggle}
                      id="password"
                      name="password"
                      type={passwordInputType}
                      togglePassword={true}
                      placeholder="Password"
                      classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
                      required
                    />
                  </div>
                  <div className="text-sm mt-[20px]">
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="font-semibold text-primary hover:text-priamaryHover w-fit"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    loading={loading}
                    className="shadow-buttonShadow"
                    name="Log in"
                    type="submit"
                    disabled={!allInputs.email || !allInputs.password}
                  />
                </div>
              </div>
            </form>

            <p className="mt-10 text-center text-[16px] text-[#454545]">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="font-[500] leading-6 text-primary hover:text-primaryHover"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showModal && <ResetPassword showModal closeModal={onCloseModal} />}

      {token && (
        <UpdatePassword showModal token={token} closeModal={onCloseModal} />
      )}
    </section>
  );
};

export default Login;
