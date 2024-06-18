import React from "react";
import Header from "../../components/payments/Header";
import Footer from "../../components/payments/Footer";
import SuccessGif from "../../assets/images/success.gif";

const Success = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <img src={SuccessGif} alt="" width={200} height={200} />
        <h1>Payment Successful!!!</h1>
        <p>You can close this page.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
