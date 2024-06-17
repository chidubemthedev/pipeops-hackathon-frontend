import { useState } from "react";
import Modal from "../../../components/Modal";
import Form from "../../../components/orders/Form";
import Header from "../../../components/orders/Header";
import DashboardLayout from "../../../layouts/DashboardLayout";

const CreateOrder = () => {
  const [linkModal, setLinkModal] = useState(false);

  return (
    <DashboardLayout>
      <Header />
      <h1 className="mt-10 mb-4">Create an order</h1>
      <Form />
      {linkModal && (
        <Modal
          showHeader={false}
          closeModal={() => setLinkModal(false)}
          onConfirm={() => setLinkModal(false)}
          showfooter={false}
          showCloseIcon={false}
        >
          \
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
                  required
                  className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[16px] pl-4 placeholder:font-normal text-generalBlack"
                />
                <button className="absolute top-[10%] right-2.5 bg-primary font-gtwaalsheimpro rounded-xl text-white text-sm font-medium p-2.5 w-[auto]">
                  Copy
                </button>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="border p-2.5 border-generalBlack rounded-2xl">
                F{/* <img src={Facebook} alt="" /> */}
              </div>
              <div className="border p-2.5 border-generalBlack rounded-2xl mx-6">
                T{/* <img src={Twitter} alt="" /> */}
              </div>
              <div className="border p-2.5 border-generalBlack rounded-2xl">
                L{/* <img src={Linkedin} alt="" /> */}
              </div>
              <div className="border p-2.5 border-generalBlack rounded-2xl ml-6">
                I{/* <img src={Instagram} alt="" /> */}
              </div>
            </div>
            <button
              // onClick={() => navigate("/leagues/discover")}
              className="w-full mt-12 bg-primary  text-white py-3 rounded-[50px] text-base cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default CreateOrder;
