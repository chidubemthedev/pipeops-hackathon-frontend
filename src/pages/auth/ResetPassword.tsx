import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { Button } from "../../components/Button";
import { InputField } from "../../components/Input";
import { forgotPassword } from "../../features/auth/authSlice";
import Modal from "../../components/Modal";

interface resetPasswordProps {
  showModal?: boolean;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
}

const ResetPassword = ({ showModal, closeModal }: resetPasswordProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useAppSelector((state) => state.auth);

  const loading = authUser.loading;
  const forgotPasswordStatus = authUser.forgotPasswordStatus;

  const [resetEmail, setResetEmail] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(forgotPassword({ email: resetEmail }));
  };

  const onCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    return closeModal(e);
  };

  return (
    <>
      {showModal && (
        <Modal
          showHeader={forgotPasswordStatus ? false : true}
          showCloseIcon={forgotPasswordStatus ? false : true}
          showfooter={forgotPasswordStatus ? true : false}
          closeModal={onCloseModal}
          onConfirm={() => null}
          showCloseButton={true}
          closeButtonLabel={"Close"}
          closeButtonClassName="bg-primary-600 text-neutral-800 rounded-[30px] hover:opacity-90"
        >
          <Fragment key="header">
            <h3 className="font-bold mb-2 text-lg">Reset Password </h3>
            <p className="text-sm font-[400] me-5">
              Please enter your registered email address to receive the reset
              link
            </p>
          </Fragment>

          <Fragment key="body">
            {forgotPasswordStatus ? (
              <div className="text-center">
                <img
                  src="/icons/forgot-password-success.svg"
                  alt=""
                  className="mx-auto"
                />
                <h3 className="font-bold my-5 text-lg">Check Your Email </h3>
                <p className="text-sm font-[400] mx-10 text-secondary-300">
                  A reset link has been sent to your email to reset your
                  password
                </p>
              </div>
            ) : (
              <form className="" onSubmit={handleFormSubmit}>
                <div>
                  <label
                    htmlFor="reset_email"
                    className="block font-medium leading-6 text-label-active text-inputlabel"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <InputField
                      classes="is-transparent"
                      id="reset_email"
                      name="reset_email"
                      type="email"
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="mt-[65px] mb-[40px]">
                  <Button
                    loading={loading}
                    // loadingText={"Sending Link..."}
                    name="Send Reset Link"
                    type="submit"
                    disabled={loading}
                    className="bg-primary-600 text-neutral-800 rounded-[30px] hover:opacity-90"
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

export default ResetPassword;
