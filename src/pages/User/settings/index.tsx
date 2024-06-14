import { SetStateAction, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Profile from "./profile";
import GeneralSettings from "./GeneralSettings";
import Help from "./help";

const UserSettings = () => {

  const [currentTab, setCurrentTab] = useState("My Profile");

  const tabs = [
    { name: "My Profile", current: currentTab === 'My Profile' },
    { name: "General Settings", current: currentTab === 'General Settings' },
    { name: "Help", current: currentTab === 'Help' },

  ];

  const handleTabClick = (name: SetStateAction<string>) => {
    setCurrentTab(name);
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-medium font-gtwalsheimpro text-generalBlack text-[26px]">Profile</h1>
        <p className="font-medium font-gtwalsheimpro text-[#5C5C5B] text-base mt-1 mb-8">Update your profile and settings here</p>
      </div>

      <div className='flex items-center flex-wrap md:flex-nowrap gap-10 md:gap-56 border-b border-b-[#E8E8E8] mb-8'>

        {tabs.map((item) => (
          <div key={item.name}>
            <h4 onClick={() => handleTabClick(item.name)} className={`cursor-pointer text-sm text-center w-[10rem] font-medium pb-1 ${item.current ? 'border-b-2 border-primary text-primary' : 'text-[#8C8B8B]'}`}>{item.name}</h4>
          </div>
        ))}


      </div>

      <div>
        {currentTab === "My Profile" && (
          <Profile />
        )}
        {currentTab === "General Settings" && (
          <GeneralSettings />
        )}
        {currentTab === "Help" && (
          <Help />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;
