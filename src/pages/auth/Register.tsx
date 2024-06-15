import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button } from "../../components/Button";
import { InputField } from "../../components/Input";
import { registerUser } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export type handleFormChangerType = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;

const Signup = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const authUser = useAppSelector((state) => state.auth);

  const loading = authUser.loading;

  const [allInputs, setAllInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllInputs({ ...allInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(allInputs);
    dispatch(registerUser(allInputs)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Account created successfully");
        navigate("/login");
      }
    });
  };

  const handlePasswordToggle = () => {
    setPasswordInputType(passwordInputType === "text" ? "password" : "text");
  };

  return (
    <div>
      <div className="bg-white shadow-loginHeaderShadow fixed w-[100%]">
        <h1 className="py-[20px] px-[45px] text-primary text-center text-[30px] font-[700]">
          VINANCE
        </h1>
      </div>

      <AuthLayout>
        <div className="flex flex-col bg-white mt-[100px] shadow-loginShadow rounded-[10px] px-[20px] py-[30px] h-fit">
          <div className="mb-[42px]">
            <h2 className="ml-[20px] text-[30px] font-[500] tracking-[0.5px] text-generalBlack">
              Create your account
            </h2>
            <div className="bg-[#E8EAED] h-[1px] w-full mt-[16px]" />
          </div>
          <div className="w-full p-6 relative max-w-5xl mx-auto border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)]">
            <form onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="firstname"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
                      onChange={handleFormChanger}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 tracking-[0.28px] text-neutral"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="lastname"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      classes="h-[56px] rounded-[12px] px-[16px] border border-[#E8EAED]"
                      onChange={handleFormChanger}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
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
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <Button
                  loading={loading}
                  className="shadow-buttonShadow max-w-[400px]"
                  name="Create Account"
                  type="submit"
                  disabled={
                    !allInputs.email ||
                    !allInputs.password ||
                    !allInputs.firstName ||
                    !allInputs.lastName
                  }
                />
              </div>
            </form>

            <p className="mt-10 text-center text-[16px] text-[#454545]">
              Have an account?{" "}
              <Link
                to={"/login"}
                className="font-[500] leading-6 text-primary hover:text-primaryHover"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Signup;
