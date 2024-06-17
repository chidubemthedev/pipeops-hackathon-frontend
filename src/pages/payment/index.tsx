import { useParams } from "react-router-dom";
import Header from "../../components/payments/Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkPaymenCode } from "../../features/orders/orderSlice";
import { LoadingSpinner } from "../../components/Utils/LoadingSpinner";

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.order.loading);

  console.log(id);

  // useEffect(() => {
  //   dispatch(checkPaymenCode(id));
  // });

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        {loading ? (
          <LoadingSpinner width="88" height="96" />
        ) : (
          <div className="flex justify-center items-center gap-2">
            <h1>Automaticaly redirecting to secure payment page...</h1>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
