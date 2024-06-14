import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { Button } from "../../components/Button";
import { InputField } from "../../components/Input";
import {
  forgotPassword,
  updatePassword,
  setupdatePasswordStatus,
  validateResetPasswordOtp,
  resetPassword,
} from "../../features/auth/authSlice";
import Modal from "../../components/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

interface resetPasswordProps {
  showModal?: boolean;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
  token: string;
}

const UpdatePassword = ({
  showModal,
  closeModal,
  token,
}: resetPasswordProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const loading = authUser.loading;
  const updatePasswordStatus = authUser.updatePasswordStatus;

  const [password, setPassword] = useState("");
  const [buttonDisabled, isButtonDisabled] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");

  const [searchParams, setSearchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  console.log(tokenParam, emailParam);

  useEffect(() => {
    dispatch(
      validateResetPasswordOtp({ token: tokenParam, email: emailParam })
    );
  }, [dispatch, tokenParam, emailParam]);

  const handlePasswordToggle = () => {
    setPasswordInputType(passwordInputType === "text" ? "password" : "text");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(resetPassword({ password: password })).then(() => {
      toast.success("Password Updated Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    });
  };

  const onCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate("/login");
    dispatch(setupdatePasswordStatus(false));
    return closeModal(e);
  };

  return (
    <>
      {showModal && (
        <Modal
          showHeader={updatePasswordStatus ? false : true}
          showCloseIcon={updatePasswordStatus ? false : true}
          showfooter={updatePasswordStatus ? true : false}
          closeModal={onCloseModal}
          onConfirm={() => null}
          showCloseButton={true}
          closeButtonLabel={"Proceed to Login"}
          closeButtonClassName="bg-primary-600 text-neutral-800 rounded-[30px] hover:opacity-90"
        >
          <Fragment key="header">
            <h3 className="font-bold mb-2 text-lg">Update Password </h3>
            <p className="text-sm font-[400] me-5">
              Create a new password to log in to your account
            </p>
          </Fragment>

          <Fragment key="body">
            {updatePasswordStatus ? (
              <div className="text-center">
                <img
                  src="/images/success.gif"
                  alt=""
                  className="h-40 mx-auto"
                />
                <h3 className="font-bold my-5 text-lg">Password Updated </h3>
                <p className="text-sm font-[400] mx-10 text-secondary-300">
                  You’ve successfully updated your password
                </p>
              </div>
            ) : (
              <form className="" onSubmit={handleFormSubmit}>
                <div>
                  <label
                    htmlFor="update_password"
                    className="block font-medium leading-6 text-label-active text-inputlabel"
                  >
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <InputField
                      onChange={(e) => setPassword(e.target.value)}
                      onPasswordToggle={handlePasswordToggle}
                      id="update_password"
                      name="update_password"
                      type={passwordInputType}
                      placeholder="********"
                      required
                      classes={"focus:border-[#FF9814] focus:bg-[#fff1cf80]"}
                      //   onFocus={() => isButtonDisabled(true)}
                      //   onBlur={() => isButtonDisabled(false)}
                      togglePassword={true}
                    />
                  </div>
                </div>

                <div className="mt-[65px] mb-[40px]">
                  <Button
                    loading={false}
                    name="Update"
                    type="submit"
                    disabled={loading || !password.length}
                    className="bg-primary-600 text-neutral-800 rounded-[30px] hover:opacity-90 disabled:opacity-40"
                  />
                </div>
              </form>
            )}
          </Fragment>

          <Fragment key="footer"></Fragment>
        </Modal>
      )}
    </>
  );
};

export default UpdatePassword;
