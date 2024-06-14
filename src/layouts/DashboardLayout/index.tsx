import { useEffect, useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { getProfile } from "../../features/profile/profileSlice";

const DashboardLayout = ({ children }: any) => {
  // const userData = useAppSelector((state) => state.profile.profile);
  const userData = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SideNav setIsOpen={setIsOpen} isOpen={isOpen} />

      <main className=" mt-[80px] p-5 lg:p-[40px] lg:pt-[50px] bg-[#F7F7F7] min-h-screen w-full lg:w-[82%] ml-auto lg:rounded-s-[10px] z-50 pb-[100px] lg:pb-[100px] font-walsheim">
        <Header setIsOpen={setIsOpen} isOpen={isOpen} userData={userData} />
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
