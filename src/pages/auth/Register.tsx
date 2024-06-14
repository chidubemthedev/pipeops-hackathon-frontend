import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button } from "../../components/Button";
import { InputField } from "../../components/Input";
import { registerUser } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";

export type AllInputs = {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  dateOfBirth: string;
  phone: string;
  password: string;
  confirmpassword: string;
  stateOfOrigin: string;
  localGovtOfOrigin: string;
  stateOfResidence: string;
  localGovtOfResidence: string;
};

export type handleFormChangerType = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;

const Signup = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [allInputs, setAllInputs] = useState<AllInputs>({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    dateOfBirth: "",
    phone: "",
    password: "",
    confirmpassword: "",
    stateOfOrigin: "",
    localGovtOfOrigin: "",
    stateOfResidence: "",
    localGovtOfResidence: "",
  });

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleFormChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllInputs({ ...allInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(allInputs));
  };

  const handlePasswordToggle = () => {
    setPasswordInputType(passwordInputType === "text" ? "password" : "text");
  };

  return (
    <div>
      <header className="px-4 py-6 border-b border-gray-200 sm:px-6 shadow-[0_12px_22px_0_rgba(0,0,0,0.05)]">
        <h1 className="text-3xl leading-6 font-bold text-[#16CEAA] font-opensans">
          Vinance Register
        </h1>
      </header>
      <AuthLayout>
        <div className="py-8 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-10">
          <div className="text-center">
            <h2 className="text-[38px] font-medium tracking-tight text-gray-900 sm:text-4xl font-gtwalsheimpro">
              Create Account
            </h2>
          </div>
          <div className="relative max-w-5xl mx-auto border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)]">
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
                      placeholder="e.g oyindamola@gmail.com"
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
                </div>

                <div className="mt-4">
                  <Button
                    loading={auth.loading}
                    className="shadow-buttonShadow"
                    name="Log in"
                    type="submit"
                    disabled={!allInputs.email || !allInputs.password}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Signup;
