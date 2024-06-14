import { toast } from "react-hot-toast";

export const getSimplifiedError = (error: object | any) => {
  if (!error.response) {
    toast.error(
      "Something went wrong, check your internet and please try again"
    );
    return "Something went wrong, check your internet and please try again";
  }
  const errorObject = error?.response?.data;
  if (error.response?.status === 500) {
    toast.error("Sorry an unexpected error occurred.");
    return "Sorry an unexpected error occurred.";
  }
  if (error.response?.status === 400) {
    if (
      errorObject?.error &&
      errorObject.error.includes("Email Address already exist")
    ) {
      toast.error("Email already exists!");
    } else if (
      errorObject?.error &&
      errorObject.error.includes("Please Use Another phone Number")
    ) {
      toast.error("Phone Number already exists!");
    } else if (
      errorObject?.error &&
      errorObject.error.includes("Please Verify Your Email")
    ) {
      toast.error("Please Verify Your Email");
    }
  }
  if (error.response.status === 404) {
    toast.error(errorObject?.message ?? "Resource Not Found!");
    return errorObject?.message;
  } else if (error?.response?.status === 401) {
    toast.error(errorObject?.error);
    if (errorObject?.message === "Please authenticate") {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    }
    if (errorObject?.message === "Forbidden: Not Verified or Not Permitted") {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    }
    return "Token has expired, please log in";
  } else {
    //Check for possible phone number unique issues
    return "Something went wrong";
  }
};
