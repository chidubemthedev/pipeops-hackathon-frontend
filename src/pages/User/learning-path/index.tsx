import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import CourseList from "../../../components/CoursesData";
import Pagination from "../../../components/Utils/Pagination";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loading from "../../../assets/images/loading-spinner.gif";
import Successful from "../../../assets/images/successful-check.svg";
import Modal from "../../../components/Modal";
import { CloseIcon } from "../../../assets/icons";
import DropDown from "../../../assets/images/arrow-down.png";
import ChoosePath from "./change-path";
import { technicalOptions1Array, salesPath } from "../../../util/topics";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getProfile,
  updateLearningPath,
} from "../../../features/profile/profileSlice";
import SalesPath from "./change-path/salespath";
import { AllTopics } from "../../../util/types";
import { getTopics } from "../../../features/topic/topicSlice";
import toast from "react-hot-toast";
import { verifyOtpStatus, resendOtp } from "../../../features/auth/authSlice";
import VerificationBanner from "../../../components/EmailVerificationBanner";

export type ChosenTrack = {
  officerType: string;
  officerData: {
    language: string;
    complementSkill: string;
    technicalCapability: string;
  };
  learningPath: string[];
};

const LearningPath = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const allTopics = useAppSelector((state) => state.topic.topics);
  const [step, setStep] = useState(1);
  const totalPages = Math.ceil(
    (allTopics ? allTopics.length : 0) / itemsPerPage
  );
  const topOfComponentRef = useRef<HTMLDivElement | null>(null);
  const [learningTrackModal, setLearningTrackModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState("");
  const [languageSelected, setLanguageSelected] = useState("");
  const [capabilitySelected, setCapabilitySelected] = useState("");
  const [selectedTechnicalPath, setSelectedTechnicalPath] = useState([]);

  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  //const learningPaths = useAppSelector((state) => state.profile.updatePath);
  const PathName = useAppSelector(
    (state) => state.profile.profile?.officerType
  );

  const verifyOtp = useAppSelector((state) => state.profile.profile?._email);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const [chosenTrack, setChosenTrack] = useState<ChosenTrack>({
    officerType: PathName || "",
    officerData: {
      complementSkill: selected,
      technicalCapability: capabilitySelected,
      language: languageSelected,
    },
    learningPath: [],
  });

  const data = useMemo(
    () => ({
      officerType: chosenTrack.officerType,
      officerData: {
        complementSkill: chosenTrack.officerData.complementSkill,
        technicalCapability: chosenTrack.officerData.technicalCapability,
        language: chosenTrack.officerData.language,
      },
      learningPath: chosenTrack.learningPath,
    }),
    [
      chosenTrack.learningPath,
      chosenTrack.officerData.complementSkill,
      chosenTrack.officerData.language,
      chosenTrack.officerData.technicalCapability,
      chosenTrack.officerType,
    ]
  );

  useEffect(() => {
    setChosenTrack((prevState) => ({
      ...prevState,
      officerType: chosenTrack.officerType,
      officerData: {
        complementSkill: selected,
        technicalCapability: capabilitySelected,
        language: languageSelected,
      },
      learningPath: selectedTechnicalPath,
    }));
  }, [
    selected,
    languageSelected,
    capabilitySelected,
    selectedTechnicalPath,
    chosenTrack.officerType,
  ]);

  const handleSubmit = () => {
    const selectedSalesPaths = selectedTechnicalPath.filter((path: string) =>
      salesPath.includes(path)
    ).length;
    const selectedTechnicalPaths = selectedTechnicalPath.filter(
      (path: string) => technicalOptions1Array.includes(path)
    ).length;

    if (
      (chosenTrack.officerType === "sales" &&
        selectedSalesPaths >= 1 &&
        selectedTechnicalPaths >= 1) ||
      (chosenTrack.officerType === "technical" &&
        selectedTechnicalPaths >= 3 &&
        selectedSalesPaths >= 1)
    ) {
      setLoading(true);
      dispatch(updateLearningPath(data));
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleChangePath = () => {
    setLearningTrackModal(true);
  };

  const handleRadioChange = (type: string) => {
    setChosenTrack({
      ...chosenTrack,
      officerType: type,
    });
  };

  const handleOptionClick = (fieldName: string, optionValue: string) => {
    setChosenTrack({
      ...chosenTrack,
      officerData: {
        ...chosenTrack.officerData,
        [fieldName]: optionValue,
      },
    });
  };

  const handleNext = () => {
    if (
      chosenTrack.officerType ||
      (chosenTrack.officerType === "sales" &&
        (chosenTrack.officerData.complementSkill ||
          chosenTrack.officerData.language)) ||
      (chosenTrack.officerType === "technical" &&
        (chosenTrack.officerData.complementSkill ||
          chosenTrack.officerData.technicalCapability ||
          chosenTrack.officerData.language))
    ) {
      if (chosenTrack.officerType === "sales") {
        setStep(2);
      } else if (chosenTrack.officerType === "technical") {
        setStep(2);
      }
    }
  };

  const isNextEnabled =
    chosenTrack.officerType &&
    ((chosenTrack.officerType === "sales" &&
      chosenTrack.officerData.complementSkill &&
      chosenTrack.officerData.language) ||
      (chosenTrack.officerType === "technical" &&
        chosenTrack.officerData.complementSkill &&
        chosenTrack.officerData.technicalCapability &&
        chosenTrack.officerData.language));

  const toggleDropdown3 = () => {
    setIsDropdownOpen3((prevOpen) => !prevOpen);
  };

  const toggleDropdown4 = () => {
    setIsDropdownOpen4((prevOpen) => !prevOpen);
  };

  const toggleDropdown5 = () => {
    setIsDropdownOpen5((prevOpen) => !prevOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Outside click
      setIsDropdownOpen3(false);
      setIsDropdownOpen4(false);
      setIsDropdownOpen5(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (topOfComponentRef.current) {
      const offset = 220;
      window.scrollTo({
        top: topOfComponentRef.current.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, [currentPage]);
  let topicsForCurrentPage: AllTopics[] = [];

  if (allTopics) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    topicsForCurrentPage = allTopics.slice(startIndex, endIndex);
  }

  return (
    <DashboardLayout>
      {!verifyOtp ? <VerificationBanner /> : null}
      <div
        ref={topOfComponentRef}
        className="flex items-baseline justify-between"
      >
        <div>
          <h1 className="font-medium font-walsheim text-generalBlack text-[26px]">
            Learning Path
          </h1>
          <p className="font-medium capitalize font-walsheim text-[#5C5C5B] text-base mt-1 mb-8">
            {chosenTrack.officerType} Learning Path
          </p>
        </div>
        <div>
          <p
            className="text-primary text-base font-medium font-walsheim underline cursor-pointer"
            onClick={handleChangePath}
          >
            Change Your learning Path
          </p>
        </div>
      </div>
      <h2 className="text-primaryBlack font-medium text-xl mb-4">
        Learning Tracks
      </h2>
      <CourseList
        topics={topicsForCurrentPage}
        oneColumn={topicsForCurrentPage.length === 1}
      />
      {learningTrackModal && (
        <>
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity flex items-center justify-center">
                <div className="grid relative  mx-auto overflow-y-auto align-bottom sm:align-middle max-w-5xl border rounded-xl bg-white shadow-[0_-4px_10.600000381469727px_0_rgba(190,190,190,0.25)]">
                  <div className="border-b py-6 flex items-center w-full justify-between">
                    <p className="text-base text-generalBlack font-medium pl-6">
                      Change Your Learning Path
                    </p>
                    <div
                      className="cursor-pointer pr-6"
                      onClick={() => setLearningTrackModal(false)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                  <div className="p-6">
                    {step === 1 && (
                      <>
                        <p className="text-sm font-medium text-generalBlack text-left pb-6">
                          Select a new Path
                        </p>
                        <form>
                          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div
                              className={`border ${
                                chosenTrack.officerType === "sales" ||
                                (!chosenTrack.officerType &&
                                  PathName === "sales")
                                  ? "border-[#16ceaa]"
                                  : "border-[#5e5e5e] border-opacity-30"
                              } flex items-center py-5 px-4 w-full shadow-sm rounded-xl`}
                            >
                              <input
                                type="radio"
                                name="officerType"
                                id="sales"
                                onChange={() => handleRadioChange("sales")}
                                required
                                className="h-6 w-10 outline-none ring-0 focus:ring-0"
                              />
                              <div className="text-left ml-2">
                                <label
                                  htmlFor="sales"
                                  className="text-sm font-medium text-[#0e0e0e] block mb-2"
                                >
                                  Sales Oriented
                                  {PathName === "sales" ? (
                                    <span className="text-[#5E5E5E]">
                                      {" "}
                                      - (Your Current Learning Path)
                                    </span>
                                  ) : null}
                                </label>
                                <p className="text-sm font-medium text-[#5e5e5e] opacity-50">
                                  Go for this if you are more interested in
                                  consumer and content engagement
                                </p>
                              </div>
                            </div>
                            <div
                              className={`border ${
                                chosenTrack.officerType === "technical" ||
                                (!chosenTrack.officerType &&
                                  PathName === "technical")
                                  ? "border-[#16ceaa]"
                                  : "border-[#5e5e5e] border-opacity-30"
                              } flex items-center py-5 px-4 w-full shadow-sm rounded-xl`}
                            >
                              <input
                                type="radio"
                                name="officerType"
                                id="technical"
                                onChange={() => handleRadioChange("technical")}
                                required
                                className="h-6 w-10 outline-none ring-0 focus:ring-0"
                              />
                              <div className="text-left ml-2">
                                <label
                                  htmlFor="technical"
                                  className="text-sm font-medium text-[#0e0e0e] block mb-2"
                                >
                                  Technical Oriented
                                  {PathName === "technical" ? (
                                    <span className="text-[#5E5E5E]">
                                      {" "}
                                      - (Your Current Learning Path)
                                    </span>
                                  ) : null}
                                </label>
                                <p className="text-sm font-medium text-[#5e5e5e] opacity-50">
                                  Go for this if you are more interested in
                                  technical development and support
                                </p>
                              </div>
                            </div>
                            {chosenTrack.officerType === "technical" &&
                              PathName !== "technical" && (
                                <>
                                  <div>
                                    <label
                                      htmlFor="technicalDropdown1"
                                      className="block text-sm font-medium leading-6 text-[#363636] capitalize text-left"
                                    >
                                      Which best complement your skill
                                    </label>
                                    <div className="mt-1 relative">
                                      <input
                                        type="text"
                                        id="technicalDropdown1"
                                        name="technicalDropdown1"
                                        value={selected}
                                        placeholder="Select"
                                        readOnly
                                        onClick={toggleDropdown3}
                                        className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4"
                                      />
                                      <img
                                        src={DropDown}
                                        alt=""
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleDropdown3}
                                      />
                                      {isDropdownOpen3 && (
                                        <div
                                          className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3"
                                          ref={dropdownRef}
                                        >
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "complementSkill",
                                                "Human Interactions"
                                              );
                                              toggleDropdown3();
                                              setSelected("Human Interactions");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Human Interactions
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "complementSkill",
                                                "Marketing & Ideation"
                                              );
                                              toggleDropdown3();
                                              setSelected(
                                                "Marketing & Ideation"
                                              );
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Marketing & Ideation
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "complementSkill",
                                                "Research & Data"
                                              );
                                              toggleDropdown3();
                                              setSelected("Research & Data");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] text-left"
                                          >
                                            Research & Data
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="technicalDropdown2"
                                      className="block text-sm font-medium leading-6 text-[#363636] capitalize text-left"
                                    >
                                      How would you rate your technical
                                      capability?
                                    </label>
                                    <div className="mt-1 relative">
                                      <input
                                        type="text"
                                        id="technicalDropdown2"
                                        name="technicalDropdown2"
                                        value={capabilitySelected}
                                        placeholder="Select"
                                        readOnly
                                        onClick={toggleDropdown4}
                                        className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4"
                                      />
                                      <img
                                        src={DropDown}
                                        alt=""
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleDropdown4}
                                      />
                                      {isDropdownOpen4 && (
                                        <div
                                          className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3"
                                          ref={dropdownRef}
                                        >
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "technicalCapability",
                                                "Low"
                                              );
                                              toggleDropdown4();
                                              setCapabilitySelected("Low");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Low
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "technicalCapability",
                                                "Mid"
                                              );
                                              toggleDropdown4();
                                              setCapabilitySelected("Mid");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Mid
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "technicalCapability",
                                                "High"
                                              );
                                              toggleDropdown4();
                                              setCapabilitySelected("High");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] text-left"
                                          >
                                            High
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="technicalDropdown3"
                                      className="block text-sm font-medium leading-6 text-[#363636] capitalize text-left"
                                    >
                                      What language can you speak frequently
                                    </label>
                                    <div className="mt-1 relative">
                                      <input
                                        type="text"
                                        id="technicalDropdown3"
                                        name="technicalDropdown3"
                                        value={languageSelected}
                                        placeholder="Select"
                                        readOnly
                                        onClick={toggleDropdown5}
                                        className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4"
                                      />
                                      <img
                                        src={DropDown}
                                        alt=""
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleDropdown5}
                                      />
                                      {isDropdownOpen5 && (
                                        <div
                                          className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3"
                                          ref={dropdownRef}
                                        >
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "English"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("English");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            English
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "Hausa"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("Hausa");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Hausa
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "Igbo"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("Igbo");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Igbo
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "Yoruba"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("Yoruba");
                                            }}
                                            className="px-4 text-left py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed]"
                                          >
                                            Yoruba
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "French"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("French");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] text-left"
                                          >
                                            French
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            {chosenTrack.officerType === "sales" &&
                              PathName !== "sales" && (
                                <>
                                  <div>
                                    <label
                                      htmlFor="technicalDropdown1"
                                      className="block text-sm font-medium leading-6 text-[#363636] capitalize text-left"
                                    >
                                      Which best complement your skill
                                    </label>
                                    <div className="mt-1 relative">
                                      <input
                                        type="text"
                                        id="technicalDropdown1"
                                        name="technicalDropdown1"
                                        value={selected}
                                        placeholder="Select"
                                        readOnly
                                        onClick={toggleDropdown3}
                                        className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4"
                                      />
                                      <img
                                        src={DropDown}
                                        alt=""
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleDropdown3}
                                      />
                                      {isDropdownOpen3 && (
                                        <div
                                          className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3"
                                          ref={dropdownRef}
                                        >
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "complementSkill",
                                                "Human Interactions"
                                              );
                                              toggleDropdown3();
                                              setSelected("Human Interactions");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Human Interactions
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "complementSkill",
                                                "Marketing & Ideation"
                                              );
                                              toggleDropdown3();
                                              setSelected(
                                                "Marketing & Ideation"
                                              );
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Marketing & Ideation
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "complementSkill",
                                                "Research & Data"
                                              );
                                              toggleDropdown3();
                                              setSelected("Research & Data");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] text-left"
                                          >
                                            Research & Data
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="technicalDropdown3"
                                      className="block text-sm font-medium leading-6 text-[#363636] capitalize text-left"
                                    >
                                      What language can you speak frequently
                                    </label>
                                    <div className="mt-1 relative">
                                      <input
                                        type="text"
                                        id="technicalDropdown3"
                                        name="technicalDropdown3"
                                        value={languageSelected}
                                        placeholder="Select"
                                        readOnly
                                        onClick={toggleDropdown5}
                                        className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4"
                                      />
                                      <img
                                        src={DropDown}
                                        alt=""
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleDropdown5}
                                      />
                                      {isDropdownOpen5 && (
                                        <div
                                          className="absolute z-10 top-full w-full bg-white rounded-lg shadow-lg border border-[#eaeaed] py-3"
                                          ref={dropdownRef}
                                        >
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "English"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("English");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            English
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "Hausa"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("Hausa");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Hausa
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "Igbo"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("Igbo");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed] text-left"
                                          >
                                            Igbo
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "Yoruba"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("Yoruba");
                                            }}
                                            className="px-4 text-left py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed]"
                                          >
                                            Yoruba
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleOptionClick(
                                                "language",
                                                "French"
                                              );
                                              toggleDropdown5();
                                              setLanguageSelected("French");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] text-left"
                                          >
                                            French
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                          </div>
                          <div className="flex items-center mt-24 justify-between">
                            <div>
                              <button
                                type="button"
                                onClick={() => setLearningTrackModal(false)}
                                className="font-walsheim px-16 py-2.5 border border-[#16ceaa] rounded-3xl text-base font-medium text-[#16ceaa]"
                              >
                                Cancel
                              </button>
                            </div>
                            <div>
                              <button
                                className={`px-16 py-2.5 rounded-3xl text-base font-medium text-white focus:outline-none bg-[#16ceaa] shadow-[0_26px_46px_0_rgba(22,206,170,0.35)] w-[auto] ${
                                  isNextEnabled
                                    ? ""
                                    : "opacity-40 cursor-pointer"
                                }`}
                                onClick={handleNext}
                                disabled={!isNextEnabled}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    )}

                    {chosenTrack.officerType === "technical" && step === 2 && (
                      <ChoosePath
                        handleSubmit={handleSubmit}
                        handleBack={() => setStep((prevStep) => prevStep - 1)}
                        selectedTechnicalPath={selectedTechnicalPath}
                        setSelectedTechnicalPath={setSelectedTechnicalPath}
                        chosenTrack={chosenTrack}
                        salesPath={salesPath}
                        technicalOptions1Array={technicalOptions1Array}
                      />
                    )}
                    {chosenTrack.officerType === "sales" && step === 2 && (
                      <SalesPath
                        handleSubmit={handleSubmit}
                        handleBack={() => setStep((prevStep) => prevStep - 1)}
                        selectedTechnicalPath={selectedTechnicalPath}
                        setSelectedTechnicalPath={setSelectedTechnicalPath}
                        chosenTrack={chosenTrack}
                        salesPath={salesPath}
                        technicalOptions1Array={technicalOptions1Array}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && (
            <Modal
              showHeader={false}
              closeModal={() => {
                setLoading(false);
                setLearningTrackModal(false);
              }}
              showfooter={true}
              showCloseIcon={false}
              onConfirm={handleSubmit}
            >
              <div key="body" className="">
                <p className="text-[26px] text-generalBlack font-medium">
                  Updating Changes
                </p>
                <img
                  src={Loading}
                  alt="Loading"
                  className="mx-auto text-center"
                />
              </div>
            </Modal>
          )}
          {success && (
            <Modal
              showHeader={false}
              closeModal={() => {
                setSuccess(false);
                setLearningTrackModal(false);
              }}
              showfooter={true}
              showCloseIcon={false}
              onConfirm={handleSubmit}
            >
              <div key="body" className="">
                <img
                  src={Successful}
                  alt="Successful"
                  className="mx-auto text-center my-4"
                />
                <p className="text-[26px] text-generalBlack font-medium text-center mb-2">
                  Your Learning Path has been updated Successfully
                </p>
                <p className="text-sm font-medium text-[#868686] text-center mb-10">
                  You are in the technical learning Path now!
                </p>

                <div>
                  <button
                    className="text-lg text-white font-medium bg-primary py-2 rounded-[30px] shadow-[0_26px_46px_0_rgba(22,206,170,0.35)]"
                    onClick={() => {
                      setSuccess(false);
                      setLearningTrackModal(false);
                      setLoading(false);
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totlaPages={totalPages}
        onPageChange={handlePageChange}
      />
    </DashboardLayout>
  );
};

export default LearningPath;
