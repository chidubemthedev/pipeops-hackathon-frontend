import { useState } from "react";
import ClosedEye from "../../../../assets/images/closed-eye.svg";
import { InputField } from "../../../../components/Input";

const GeneralSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleToggleNewPassword = () => {
    setNewPassword((prevShow) => !prevShow);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShow) => !prevShow);
  };

  return (
    <div>
      <div className="relative max-w-full border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)] mt-8">
        <div className="border-b py-6 ">
          <h2 className="mx-6 font-medium text-base lg:text-lg text-[#0e0e0e] font-gtwalsheimpro">
            Update Password
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 p-6">
          <div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-[#363636]"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <InputField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={() => console.log("he")}
                  required
                  classes="border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <img src={ClosedEye} alt="Closed Eye" />
                  ) : (
                    <img src={ClosedEye} alt="Closed Eye" />
                  )}
                </span>
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-[#363636]"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <InputField
                  id="newpassword"
                  name="newpassword"
                  type={newPassword ? "text" : "password"}
                  onChange={() => console.log("he")}
                  required
                  classes="border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleToggleNewPassword}
                >
                  {newPassword ? (
                    <img src={ClosedEye} alt="Closed Eye" />
                  ) : (
                    <img src={ClosedEye} alt="Closed Eye" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-[#363636]"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <InputField
                  id="confirmpassword"
                  name="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={() => console.log("he")}
                  required
                  classes="border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleToggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <img src={ClosedEye} alt="Closed Eye" />
                  ) : (
                    <img src={ClosedEye} alt="Closed Eye" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-10 mt-24 justify-center flex-wrap">
          <div className="mr-6 mb-3">
            <button
              type="button"
              className="px-16 py-2.5 border border-[#16ceaa] rounded-3xl text-base font-medium text-[#16ceaa]"
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              type="button"
              className={`px-16 py-2.5 rounded-3xl text-base font-medium text-white focus:outline-none bg-[#16ceaa] shadow-[0_26px_46px_0_rgba(22,206,170,0.35)] opacity-40`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
