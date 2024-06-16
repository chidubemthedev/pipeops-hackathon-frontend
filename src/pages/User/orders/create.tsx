import Form from "../../../components/orders/Form";
import Header from "../../../components/orders/Header";
import DashboardLayout from "../../../layouts/DashboardLayout";

const CreateOrder = () => {
  return (
    <DashboardLayout>
      <Header />
      <Form />
      <p>CreateOrder form here</p>
    </DashboardLayout>
  );
};

export default CreateOrder;
