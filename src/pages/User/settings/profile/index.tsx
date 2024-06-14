import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import editUser from "../../../../assets/icons/user-edit.svg";
import DropDown from "../../../../assets/images/arrow-down.png";
import { InputField } from "../../../../components/Input";
import { storage } from "../../../../firebase";

import toast from "react-hot-toast";
import CheckMark from "../../../../assets/images/successful-check.svg";
import { Button } from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import Lga from "../../../../components/data/lga.json";
import States from "../../../../components/data/states.json";

export type AllInputs = {
  firstName: string;
  lastName: string;
  image: string;
  thumbnail: string;
  dateOfBirth: string;
  phone: string;
  stateOfOrigin: string;
  localGovtOfOrigin: string;
  stateOfResidence: string;
  localGovtOfResidence: string;
};

const Profile = () => {
  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoProgressComplete, setPhotoProgressComplete] = useState(false);
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isLocalGovOpen, setIsLocalGovOpen] = useState(false);
  const [isResidenceOpen, setIsResidenceOpen] = useState(false);
  const [isResidenceLocalGovOpen, setIsResidenceLocalGovOpen] = useState(false);
  const [lgasForResidence, setLgasForResidence] = useState<string[]>([]);
  const [lgasForOrigin, setLgasForOrigin] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [hasEmptyFields, setHasEmptyFields] = useState(false);
  const [fieldChanged, setFieldChanged] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const dispatch = useAppDispatch();
  const [allInputs, setAllInputs] = useState<AllInputs>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    image: "",
    thumbnail: "",
    stateOfOrigin: "",
    localGovtOfOrigin: "",
    stateOfResidence: "",
    localGovtOfResidence: "",
  });

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Outside click
      setIsOriginOpen(false);
      setIsLocalGovOpen(false);
      setIsResidenceOpen(false);
      setIsResidenceLocalGovOpen(false);
    }
  };

  const updateField = (name: string, value: string) => {
    const event = {
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(event);
  };

  const handleOriginClick = (value: string) => {
    updateField("stateOfOrigin", value);

    // Sets the appropriate local governments
    const stateData = Lga.find((state) => state.state === value);
    if (stateData) {
      setLgasForOrigin(stateData.lgas);
    } else {
      setLgasForOrigin([]);
    }

    setIsOriginOpen(false);
  };

  const handleLocalGovClick = (value: string) => {
    updateField("localGovtOfOrigin", value);
    setIsLocalGovOpen(false);
  };

  const handleResidenceClick = (value: string) => {
    updateField("stateOfResidence", value);
    const stateData = Lga.find((state) => state.state === value);
    if (stateData) {
      setLgasForResidence(stateData.lgas);
    } else {
      setLgasForResidence([]);
    }
    setIsResidenceOpen(false);
  };

  const handleResidenceLocalGovClick = (value: string) => {
    updateField("localGovtOfResidence", value);
    setIsResidenceLocalGovOpen(false);
  };

  const checkForEmptyFields = (inputs: AllInputs) => {
    let isEmptyPresent = false;

    Object.keys(inputs).forEach((key) => {
      const value = inputs[key as keyof AllInputs];
      if (value.trim().length <= 0) {
        isEmptyPresent = true;
      }
    });

    return isEmptyPresent;
  };

  const handleSubmit = () => {
    const hasEmptyFields = checkForEmptyFields(allInputs);

    if (hasEmptyFields) {
      toast.error("Please fill in all empty fields.");
      return;
    }

    // dispatch(updateLearningPath(allInputs)).then((res) => {
    //   if (res.meta.requestStatus === "fulfilled") {
    //     dispatch(getProfile());
    //     setSuccessModal(true);
    //   }
    // });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }

    const updatedInputs = { ...allInputs, [name]: updatedValue };
    setAllInputs(updatedInputs);
    setHasEmptyFields(checkForEmptyFields(updatedInputs));
    setFieldChanged(true);
  };

  const resetForm = () => {
    // setAllInputs({ ...(profile as AllInputs) });
    setFieldChanged(false);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Create storage ref
    const storageRef = ref(storage, `profileimage/${file.name}`);
    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPhotoProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        console.log("Upload complete");
        setPhotoProgressComplete(true);
        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File available at", downloadURL);
        setAllInputs({
          ...allInputs,
          image: downloadURL,
          thumbnail: downloadURL,
        });
        setFieldChanged(true);
      }
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [dispatch]);

  const formatDateForInput = (dob: any) => {
    return dob.split("T")[0];
  };

  return (
    <div className="relative max-w-full border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)]">
      <div className="border-b py-6 ">
        <h2 className="mx-6 font-medium text-base lg:text-lg text-[#0e0e0e] font-gtwalsheimpro">
          My Profile
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-[#363636]"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleInputChange}
                value={allInputs?.firstName}
                required
                className="border w-full outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]  capitalize"
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-[#363636]"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  onChange={handleInputChange}
                  value={allInputs?.lastName}
                  className="w-full border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8] capitalize"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-1 border border-[#E3E3E2] border-dashed rounded-[12px] w-full h-fit py-[23px] flex items-center gap-4 self-end flex-wrap">
            <label className="cursor-pointer ml-12">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#F7F7F7] mx-auto flex items-center justify-center">
                <div>
                  <img src={allInputs.image || editUser} alt="edit user" />
                </div>
                <InputField
                  required
                  id="photo"
                  onChange={handleFileUpload}
                  type="file"
                  classes="hidden"
                  accept="image/*"
                />
              </div>
            </label>
            {photoProgress > 0 && photoProgressComplete === false ? (
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${photoProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium leading-6 text-[#363636]"
            >
              Date of Birth
            </label>
            <div className="mt-1">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                onChange={handleInputChange}
                value={formatDateForInput(allInputs?.dateOfBirth)}
                className="w-full border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-[#363636]"
            >
              Phone Number
            </label>
            <div className="mt-1 flex">
              <input
                id="code"
                name="code"
                type="text"
                defaultValue="+234"
                readOnly
                required={false}
                className="border pl-4 w-16 mr-2 border-[#eaeaed] rounded-[10px] shadow-none focus:ring-0 ring-0 outline-none"
              />
              <input
                id="phone"
                name="phone"
                type="text"
                maxLength={10}
                onChange={handleInputChange}
                required={false}
                value={allInputs?.phone}
                className="border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8] w-full"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-[#363636]"
              htmlFor="residencestate"
            >
              State of Residence
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="residencestate"
                name="residencestate"
                value={allInputs?.stateOfResidence}
                readOnly
                onClick={() => setIsResidenceOpen(!isResidenceOpen)}
                className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 capitalize"
              />
              <img
                src={DropDown}
                alt=""
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setIsResidenceOpen((prevOpen) => !prevOpen)}
              />
              {isResidenceOpen && (
                <div
                  className="absolute z-10 overflow-auto top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3 max-h-56"
                  ref={dropdownRef}
                >
                  {States.map((state) => (
                    <div
                      key={state}
                      onClick={() => handleResidenceClick(state)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] capitalize"
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-[#363636]"
              htmlFor="residencelocalgov"
            >
              Local Government
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="residencelocalgov"
                name="residencelocalgov"
                value={allInputs?.localGovtOfResidence}
                readOnly
                onClick={() =>
                  setIsResidenceLocalGovOpen(!isResidenceLocalGovOpen)
                }
                className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 capitalize"
              />
              <img
                src={DropDown}
                alt=""
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setIsResidenceLocalGovOpen((prevOpen) => !prevOpen)
                }
              />
              {isResidenceLocalGovOpen && (
                <div
                  className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg max-h-56 overflow-auto border border-[#eaeaed] py-3"
                  ref={dropdownRef}
                >
                  {lgasForResidence.map((lga) => (
                    <div
                      key={lga}
                      onClick={() => handleResidenceLocalGovClick(lga)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] capitalize"
                    >
                      {lga}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-[#363636]"
              htmlFor="stateOfOrigin"
            >
              State of Origin
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="stateOfOrigin"
                name="stateOfOrigin"
                value={allInputs?.stateOfOrigin}
                readOnly
                onClick={() => setIsOriginOpen((prevOpen) => !prevOpen)}
                className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 capitalize"
              />
              <img
                src={DropDown}
                alt=""
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setIsOriginOpen((prevOpen) => !prevOpen)}
              />
              {isOriginOpen && (
                <div
                  className="absolute z-10 top-full w-full bg-white rounded-xl shadow-lg py-3 border border-[#eaeaed] max-h-56 overflow-auto"
                  ref={dropdownRef}
                >
                  {States.map((state) => (
                    <div
                      key={state}
                      onClick={() => handleOriginClick(state)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] capitalize"
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-[#363636]"
              htmlFor="localgov"
            >
              Local Government
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="localgov"
                name="localgov"
                value={allInputs?.localGovtOfOrigin}
                onClick={() => setIsLocalGovOpen(!isLocalGovOpen)}
                readOnly
                className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 capitalize"
              />
              <img
                src={DropDown}
                alt=""
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setIsLocalGovOpen((prevOpen) => !prevOpen)}
              />
              {isLocalGovOpen && (
                <div
                  className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3 max-h-56 overflow-auto"
                  ref={dropdownRef}
                >
                  {lgasForOrigin.map((lga) => (
                    <div
                      key={lga}
                      onClick={() => handleLocalGovClick(lga)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] capitalize"
                    >
                      {lga}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-[#363636]"
            >
              DOPE Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required={false}
                onChange={() => console.log("h")}
                // value={profile?.username}
                readOnly
                className="outline-none border py-3 px-4 block w-full shadow-none focus:ring-1 focus:ring-[#eaeaed] active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8] cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b pb-4 pt-2 font-gtwalsheimpro">
        <h2 className="mx-6 text-base font-normal text-[#5c5c5c]">
          Learning Path
        </h2>
      </div>
      <div></div>
      <div className="flex items-center my-8 justify-center gap-3 flex-wrap">
        <div className="mr-6 ">
          <button
            type="button"
            className="px-16 py-2.5 border border-[#16ceaa] rounded-3xl text-base font-medium text-[#16ceaa]"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>
        <div className="">
          <Button
            name="Update"
            onClick={handleSubmit}
            // loading={loading}
            className={`px-16 py-2.5 rounded-3xl text-base font-medium text-white focus:outline-none bg-[#16ceaa] shadow-[0_26px_46px_0_rgba(22,206,170,0.35) h-[45px] ${
              !fieldChanged ? "opacity-40" : ""
            }`}
          />
        </div>
      </div>
      {successModal && (
        <Modal
          showHeader={false}
          closeModal={() => setSuccessModal(false)}
          onConfirm={handleSubmit}
          showfooter={false}
          showCloseIcon={true}
        >
          <div key="body" className="my-6">
            <div>
              <img src={CheckMark} alt="" className="mx-auto" />
            </div>
            <div className="text-center mt-3">
              <h3 className="font-medium text-[26px]  text-generalBlack">
                Profile updated Successfully
              </h3>
              <p className="font-normal text-sm  text-[#868686] mx-0">
                Your profile has been successfully updated
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
