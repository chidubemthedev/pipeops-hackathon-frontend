import Header from "../../../components/Leagues/Request/Header";
import RequestUser from "../../../components/Leagues/Request/RequestUser";
import DashboardLayout from "../../../layouts/DashboardLayout";

const AllRequests = () => {
  return (
    <DashboardLayout>
      <div>
        <Header />
        <div className="rounded-[20px] bg-white mt-[40px]">
          <div className="flex items-center h-[70px] px-[20px]">
            <p className="font-[500] text-[16px] leading-[24px] text-[#0E0E0E]">
              All Requests
            </p>
          </div>
          <RequestUser />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllRequests;
