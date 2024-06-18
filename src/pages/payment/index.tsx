import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/payments/Header";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkPaymenCode } from "../../features/orders/orderSlice";
import { LoadingSpinner } from "../../components/Utils/LoadingSpinner";
import Modal from "../../components/Modal";
import failure from "../../assets/images/failure.svg";
import Footer from "../../components/payments/Footer";

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.order.loading);
  const [detailsModal, setDetailsModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState(
    "Your payment was successful!"
  );

  useEffect(() => {
    if (id) {
      dispatch(checkPaymenCode({ code: id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res);
          setResponseMessage(res.payload.message);
          setTimeout(() => {
            window.location.href = res.payload.data;
          }, 2000);
        } else if (res.meta.requestStatus === "rejected") {
          setResponseMessage(
            "This payment code is invalid. Please contact your seller for a new payment link."
          );
          setDetailsModal(true);
        }
      });
    }
  }, [id, dispatch, navigate]);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen px-4">
        {loading ? (
          <LoadingSpinner width="88" height="96" />
        ) : (
          <div className="flex justify-center items-center gap-2">
            <h1>Redirecting to secure payment page...</h1>
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
            <img src={failure} alt="" width={200} height={200} />
            <p className="text-center mt-2">{responseMessage}</p>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default PaymentPage;
