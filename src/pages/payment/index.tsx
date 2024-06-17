import { useParams } from "react-router-dom";
import Header from "../../components/payments/Header";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkPaymenCode } from "../../features/orders/orderSlice";
import { LoadingSpinner } from "../../components/Utils/LoadingSpinner";
import Modal from "../../components/Modal";
import SuccessGif from "../../assets/images/success.gif";
import Footer from "../../components/payments/Footer";

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.order.loading);
  const [detailsModal, setDetailsModal] = useState(true);
  const [responseMessage, setResponseMessage] = useState(
    "Your payment was successful!"
  );

  console.log(id);

  // useEffect(() => {
  //   dispatch(checkPaymenCode({ code: id }));
  // });

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        {loading ? (
          <LoadingSpinner width="88" height="96" />
        ) : (
          <div className="flex justify-center items-center gap-2">
            <h1>Automatically redirecting to secure payment page...</h1>
            <LoadingSpinner />
          </div>
        )}
      </div>

      {detailsModal && (
        <Modal
          showHeader={false}
          closeModal={() => setDetailsModal(false)}
          onConfirm={() => setDetailsModal(false)}
          showfooter={false}
          showCloseIcon={true}
          showCloseButton={true}
          closeButtonLabel="Close"
        >
          <div
            key="body"
            className="my-6 flex flex-col justify-center items-center"
          >
            <img src={SuccessGif} alt="" width={200} height={200} />
            <p>{responseMessage}</p>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default PaymentPage;
