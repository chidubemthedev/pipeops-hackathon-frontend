import Form from "../../../components/orders/Form";
import Header from "../../../components/orders/Header";
import DashboardLayout from "../../../layouts/DashboardLayout";

const CreateOrder = () => {
  return (
    <DashboardLayout>
      <Header />
      <h1 className="mt-10 mb-4">Create an order</h1>
      <Form />
    </DashboardLayout>
  );
};

export default CreateOrder;
