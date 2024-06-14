import React, { useEffect, useRef, useState } from "react";
import editUser from "../../../../assets/icons/user-edit.svg";
import DropDown from "../../../../assets/images/arrow-down.png";
import "../../../../index.css";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import Instagram from "../../../../assets/images/Instagram.png";
import ChevronRight from "../../../../assets/images/chevron-right.png";
import Facebook from "../../../../assets/images/facebook.svg";
import Linkedin from "../../../../assets/images/linkedin.png";
import CheckMark from "../../../../assets/images/successful-check.svg";
import Twitter from "../../../../assets/images/twitter.png";
import Close from "../../../../assets/images/x.svg";
import PickPath from "../../../../components/Leagues/create/PickPath";
import Modal from "../../../../components/Modal";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Button } from "../../../../components/Button";
import { InputField } from "../../../../components/Input";
import { createLeague } from "../../../../features/league/leagueSlice";
import { storage } from "../../../../firebase";
import MultiInput from "../../../../components/Utils/EmailTagsInput";
import EmailTagsInput from "../../../../components/Utils/EmailTagsInput";

type Inputs = {
  name: string;
  image: string;
  thumbnail: string;
  description: string;
  path: string;
  private: boolean;
  speciality: string;
  courses: string[];
  emails: string[];
};

const CreateLeague = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displaySecondModal, setDisplaySecondModal] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [discoverable, setDiscoverable] = useState<HTMLDivElement | boolean>(
    false
  );

  const [isLeagueOpen, setIsLeagueOpen] = useState(true);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.league.loading);

  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoProgressComplete, setPhotoProgressComplete] = useState(false);

  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const [input, setInput] = useState<Inputs>({
    name: "",
    image: "",
    thumbnail: "",
    description: "",
    path: "all",
    private: false,
    speciality: "unspecialized",
    courses: [],
    emails: [],
  });

  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails);
    setInput({ ...input, emails: newEmails });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Create storage ref
    const storageRef = ref(storage, `leagueimage/${file.name}`);
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
        setInput({ ...input, image: downloadURL, thumbnail: downloadURL });
      }
    );
  };

  useEffect(() => {
    setInput((prev) => ({ ...prev, courses: selectedCourses }));
  }, [selectedCourses]);

  const [isLeagueTypeOpen, setIsLeagueTypeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  let league;

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsLeagueTypeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRadioChange = (type: string) => {
    setInput({
      ...input,
      speciality: type,
    });
  };

  const allFieldsFilled = (): boolean => {
    const { name, description, image, speciality } = input;
    const privateVar = input["private"];

    return Boolean(
      name &&
        description &&
        image &&
        privateVar !== undefined &&
        (privateVar === false || (privateVar === true && speciality))
    );
  };

  const submitLeague = async () => {
    league = {
      name: input.name,
      image: input.image,
      thumbnail: input.thumbnail,
      description: input.description,
      path: input.path,
      private: input["private"],
      emails: emails,
      speciality:
        input.speciality.charAt(0).toUpperCase() + input.speciality.slice(1),
      courses: selectedCourses,
    };

    console.log("input", league);
    // try {
    //   await dispatch(createLeague(league));
    //   setDisplayModal(true);
    // } catch (error) {
    //   toast.error("Failed to create league");
    // }
  };

  const validateAndProceed = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      submitLeague();
    }
  };

  return (
    <DashboardLayout>
      <div>
        <p
          onClick={() => navigate("/leagues/discover")}
          className="font-normal  text-[#5C5C5B] text-base flex items-center hover:cursor-pointer"
        >
          <img src={ChevronRight} alt="" className="mr-2" />
          Back
        </p>
        <h1 className="font-medium  text-generalBlack text-[26px] mb-4 mt-2">
          League Creation
        </h1>
      </div>
      <div className="max-w-7xl border rounded-xl bg-white">
        <div className="border-b pt-6 pb-[16px]">
          <h2 className="ml-6 font-medium text-base lg:text-lg text-[#0e0e0e] ">
            Create League
          </h2>
        </div>
        {step === 1 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6">
                <label
                  className="block text-base font-medium leading-6 text-generalBlack"
                  htmlFor="leagueType"
                >
                  Select a league type
                </label>

                <div className="mt-1 flex py-5 px-4 w-full">
                  <input
                    type="radio"
                    name="leagueType"
                    id="Public"
                    onChange={() => setInput({ ...input, private: false })}
                    required
                    className="h-6 w-5 mr-4 outline-none ring-0 focus:ring-0"
                  />
                  <div>
                    <label
                      htmlFor="Public"
                      className="text-sm font-medium text-[#0e0e0e] block mb-2"
                    >
                      Public
                    </label>
                    <p className="text-sm font-medium text-[#5e5e5e] opacity-50">
                      A description of what a public league goes in to help
                      users make an informed decision.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-6 pr-6 self-end">
                <div className="flex py-5 px-4 w-full">
                  <input
                    type="radio"
                    name="leagueType"
                    id="Private"
                    onChange={() => setInput({ ...input, private: true })}
                    required
                    className="h-6 w-5 mr-4 outline-none ring-0 focus:ring-0"
                  />
                  <div>
                    <label
                      htmlFor="Private"
                      className="text-sm font-medium text-[#0e0e0e] block mb-2"
                    >
                      Private
                    </label>
                    <p className="text-sm font-medium text-[#5e5e5e] opacity-50">
                      A description of what a private league goes in to help
                      users make an informed decision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {input.private === false && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 sm:gap-x-4 mb-6 mx-6">
                  <div className="">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-base font-medium leading-6 text-generalBlack"
                      >
                        League Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={input.name}
                          onChange={(e) =>
                            setInput({ ...input, name: e.target.value })
                          }
                          placeholder="Enter League Name"
                          required
                          className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                        />
                      </div>
                    </div>

                    <div className="mt-[24px]">
                      <label
                        htmlFor="description"
                        className="block text-base font-medium leading-6 text-generalBlack"
                      >
                        League Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          value={input.description}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              description: e.target.value,
                            })
                          }
                          placeholder="What's this league about"
                          required
                          className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B] h-[189px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="">
                      <p className="block text-base font-medium leading-6 text-generalBlack">
                        League image
                      </p>
                      <div className="text-center mt-1 border border-[#E3E3E2] border-dashed rounded-[12px] w-full h-fit py-[23px]">
                        <label className="cursor-pointer">
                          <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#F7F7F7] mx-auto flex items-center justify-center">
                            <div>
                              <img
                                src={input.image ? input.image : editUser}
                                alt="edit user"
                              />
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
                        <label
                          htmlFor="photo"
                          className="text-[#0E0E0E] text-[14px] font-[500] leading-[24px] cursor-pointer mt-2"
                        >
                          Click to replace
                        </label>{" "}
                        <br />
                        <label className="leading-[24px] text-[14px] font-[400] text-[#5C5C5B]">
                          SVG, PNG, JPG or JPEG (max 800 x 400ppx)
                        </label>
                        {photoProgress > 0 &&
                        photoProgressComplete === false ? (
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
                    </div>

                    <div className="mt-[24px]">
                      <EmailTagsInput onEmailsChange={handleEmailsChange} />
                    </div>
                  </div>
                </div>
              </>
            )}

            <form className="">
              {input.private === true && (
                <div className="border-t border-[#F7F7F7]">
                  <div className="mb-6 mx-6">
                    <h2 className="text-base font-medium mb-3 text-[#0e0e0e]">
                      Select type of private league
                    </h2>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mb-3">
                      <div className="flex py-5 px-4 w-full">
                        <input
                          type="radio"
                          name="speciality"
                          id="specialized"
                          onChange={() => handleRadioChange("specialized")}
                          required
                          className="h-6 w-5 mr-4 outline-none ring-0 focus:ring-0"
                        />
                        <div>
                          <label
                            htmlFor="specialized"
                            className="text-sm font-medium text-[#0e0e0e] block mb-2"
                          >
                            Specialized
                          </label>
                          <p className="text-sm font-medium text-[#5e5e5e] opacity-50">
                            A description of what a specialized private league
                            goes in to help users make an informed decision.
                          </p>
                        </div>
                      </div>
                      <div className="flex py-5 px-4 w-full">
                        <input
                          type="radio"
                          name="speciality"
                          id="unspecialized"
                          onChange={() => handleRadioChange("unspecialized")}
                          required
                          className="h-6 w-5 mr-4 outline-none ring-0 focus:ring-0"
                        />
                        <div>
                          <label
                            htmlFor="unspecialized"
                            className="text-sm font-medium text-[#0e0e0e] block mb-2"
                          >
                            Unspecialized
                          </label>
                          <p className="text-sm font-medium text-[#5e5e5e] opacity-50">
                            A description of what a specialized private league
                            goes in to help users make an informed decision.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
            <div>
              {input.private === true &&
                (input.speciality === "specialized" ||
                  input.speciality === "unspecialized") && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="grid grid-cols-1 gap-y-6 sm:gap-x-4 m-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-base font-medium leading-6 text-generalBlack"
                        >
                          League Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={input.name}
                            onChange={(e) =>
                              setInput({ ...input, name: e.target.value })
                            }
                            placeholder="Enter League Name"
                            required
                            className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-base font-medium leading-6 text-generalBlack"
                        >
                          League Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            value={input.description}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                description: e.target.value,
                              })
                            }
                            placeholder="What's this league about"
                            required
                            className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B] h-[189px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="m-6">
                        <p className="block text-base font-medium leading-6 text-generalBlack">
                          League image
                        </p>
                        <div className="text-center mt-1 border border-[#E3E3E2] border-dashed rounded-[12px] w-full h-fit py-[23px]">
                          <label className="cursor-pointer">
                            <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#F7F7F7] mx-auto flex items-center justify-center">
                              <div>
                                <img
                                  src={input.image ? input.image : editUser}
                                  alt="edit user"
                                />
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
                          <label
                            htmlFor="photo"
                            className="text-[#0E0E0E] text-[14px] font-[500] leading-[24px] cursor-pointer mt-2"
                          >
                            Click to replace
                          </label>{" "}
                          <br />
                          <label className="leading-[24px] text-[14px] font-[400] text-[#5C5C5B]">
                            SVG, PNG, JPG or JPEG (max 800 x 400ppx)
                          </label>
                          {photoProgress > 0 &&
                          photoProgressComplete === false ? (
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
                      </div>

                      <div className=" m-6 mt-[24px]">
                        <EmailTagsInput onEmailsChange={handleEmailsChange} />
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="mb-12 text-center">
              {input.private === true && input.speciality === "specialized" && (
                <button
                  className={`font-medium  py-2 px-4 w-[calc(35%_-_30px)] mt-40 text-white text-xl rounded-[30px] ${
                    allFieldsFilled() ? "bg-primary" : "bg-primary opacity-50"
                  }`}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              )}
              <div className="flex items-center justify-center">
                {input.speciality === "unspecialized" && (
                  <Button
                    name="Create League"
                    loading={loading}
                    className="mt-[100px] w-[calc(35%_-_30px)]"
                    onClick={submitLeague}
                    disabled={!allFieldsFilled()}
                  >
                    Create League
                  </Button>
                )}
              </div>
            </div>

            {displayModal && (
              <Modal
                showHeader={false}
                closeModal={() => {
                  setDisplayModal(false);
                  navigate("/leagues/discover");
                }}
                onConfirm={validateAndProceed}
                showfooter={false}
                showCloseIcon={true}
              >
                \
                <div key="body" className="my-6">
                  <div>
                    <img src={CheckMark} alt="" className="mx-auto" />
                  </div>
                  <div className="text-center mt-3">
                    <h3 className="font-medium text-[26px]  text-generalBlack">
                      League Created Successfully
                    </h3>
                    <p className="font-normal text-sm  text-[#868686] mx-0">
                      Your League has been successfully created
                    </p>
                  </div>
                </div>
              </Modal>
            )}

            {/* Second Modal */}

            {displaySecondModal && (
              <Modal
                showHeader={false}
                closeModal={() => setDisplayModal(false)}
                onConfirm={validateAndProceed}
                showfooter={false}
                showCloseIcon={false}
              >
                \
                <div key="body" className="my-6">
                  <div
                    onClick={() => navigate("/leagues/discover")}
                    className="cursor-pointer"
                  >
                    <img src={Close} alt="" className="ml-auto" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[calc(10px_+_10px)]  text-generalBlack">
                      Copy and Share League Link
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
                      <img src={Facebook} alt="" />
                    </div>
                    <div className="border p-2.5 border-generalBlack rounded-2xl mx-6">
                      <img src={Twitter} alt="" />
                    </div>
                    <div className="border p-2.5 border-generalBlack rounded-2xl">
                      <img src={Linkedin} alt="" />
                    </div>
                    <div className="border p-2.5 border-generalBlack rounded-2xl ml-6">
                      <img src={Instagram} alt="" />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/leagues/discover")}
                    className="w-full mt-12 bg-primary  text-white py-3 rounded-[50px] text-base cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            {input.speciality === "specialized" && (
              <PickPath
                input={input}
                league={league}
                setInput={setInput}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
                handleBack={() => setStep((prevStep) => prevStep - 1)}
              />
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateLeague;
