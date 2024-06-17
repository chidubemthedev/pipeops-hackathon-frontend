import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Instagram from "../../../assets/images/Instagram.png";
import Facebook from "../../../assets/images/facebook.svg";
import Linkedin from "../../../assets/images/linkedin.png";
import Twitter from "../../../assets/images/twitter.png";
import Modal from "../../../components/Modal";
import Form from "../../../components/orders/Form";
import Header from "../../../components/orders/Header";
import { clearState } from "../../../features/orders/orderSlice";
import DashboardLayout from "../../../layouts/DashboardLayout";

const CreateOrder = () => {
  const responseUrl = useAppSelector((state) => state.order.responseUrl);
  const dispatch = useAppDispatch();

  const restoreDefault = () => {
    dispatch(clearState());
  };

  return (
    <DashboardLayout>
      <Header />
      <h1 className="mt-10 mb-4">Create an order</h1>
      <Form />
      {responseUrl && responseUrl?.length > 0 && (
        <Modal
          showHeader={false}
          closeModal={restoreDefault}
          onConfirm={restoreDefault}
          showfooter={false}
          showCloseIcon={true}
        >
          <div key="body" className="my-6">
            <div>
              <h3 className="font-medium text-[calc(10px_+_10px)]  text-generalBlack">
                Copy and Share Payment Link
              </h3>
              <div className="mt-4 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={responseUrl}
                  required
                  className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[16px] pl-4 placeholder:font-normal text-generalBlack"
                />
                <button className="absolute top-[10%] right-2.5 bg-primary font-gtwaalsheimpro rounded-xl text-white text-sm font-medium p-2.5 w-[auto] hover:cursor-pointer">
                  Copy
                </button>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="border p-2.5 border-generalBlack rounded-2xl hover:cursor-pointer">
                <img src={Facebook} alt="" />
              </div>
              <div className="border p-2.5 border-generalBlack rounded-2xl mx-6 hover:cursor-pointer">
                <img src={Twitter} alt="" />
              </div>
              <div className="border p-2.5 border-generalBlack rounded-2xl hover:cursor-pointer">
                <img src={Linkedin} alt="" />
              </div>
              <div className="border p-2.5 border-generalBlack rounded-2xl ml-6 hover:cursor-pointer">
                <img src={Instagram} alt="" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default CreateOrder;
