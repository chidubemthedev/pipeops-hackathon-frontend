/** this would wrap all the api endpoints and base urls */
export const baseUrl =
  import.meta.env.VITE_APP_BASE_URL ??
  "https://dope-platform.uc.r.appspot.com/v1";
// export const baseUrl = import.meta.env.VITE_BASE_URL;

export const url = {
  login: "/authentication/login",
  register: "/authentication/register",
  socialRegister: "/auth/social-register",
  socialLogin: "/auth/social-login",
  logout: "/auth/logout",
  verifyUserEmail: "authentication/verify/email",
  resendOtp: "/authentication/verify/send",
  checkUsername: "/authentication/check-username",
  forgotPassword: "authentication/forgot/request",
  validateResetPasswordOtp: "/authentication/forgot/validate",
  resetPassword: "/authentication/forgot/new/password",
  updatePassword: (query: string) => `/auth/reset-password?token=${query}`,
};
