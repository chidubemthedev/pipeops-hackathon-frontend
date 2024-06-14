import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import DropDown from "../../../assets/images/arrow-down.png";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import editUser from "../../../assets/icons/user-edit.svg";
import { InputField } from "../../../components/Input";
// import { Button } from "../../../components/Button";

type Inputs = {
  trackName: string;
  courseName: string;
  image: string;
  courseLink: string;
  dopePoint: string;
  learningPath: string;
};

const CreateTrack = () => {
  // const [displayModal, setDisplayModal] = useState(false);
  const [learningPathOpen, setLearningPathOpen] = useState(false);
  const [courses, setCourses] = useState<
    Array<{ courseName: string; courseLink: string; dopePoint: string }>
  >([]);

  const addCourse = () => {
    setCourses([...courses, { courseName: "", courseLink: "", dopePoint: "" }]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...courses];

    if (list[index]) {
      (list[index] as any)[name] = value;
      setCourses(list);
    }
  };

  const [input, setInput] = useState<Inputs>({
    trackName: "",
    courseName: "",
    image: "",
    courseLink: "",
    dopePoint: "",
    learningPath: "",
  });

  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoProgressComplete, setPhotoProgressComplete] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Create storage ref
    const storageRef = ref(storage, `trackimage/${file.name}`);
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
        setInput({ ...input, image: downloadURL });
      }
    );
  };

  const handleOriginClick = (learningPath: string) => {
    setInput({ ...input, learningPath });
    setLearningPathOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setLearningPathOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteCourse = (index: number) => {
    const list = [...courses];
    list.splice(index, 1);
    setCourses(list);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-medium text-[26px] text-[#363636]">
          Learning Tracks
        </h1>
        <p className="text-[#5e5e5e] text-base font-normal">
          Create learning tracks for users here
        </p>
      </div>

      <div className="max-w-7xl border rounded-xl bg-white pb-24">
        <div className="border-b pt-6 pb-[16px]">
          <h2 className="ml-6 font-medium text-base lg:text-lg text-[#0e0e0e] ">
            Create Track
          </h2>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-y-6 sm:gap-x-4 m-6">
              <div>
                <label
                  className="block text-base font-medium leading-6 text-generalBlack"
                  htmlFor="learningPath"
                >
                  Select a learning path
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="learningPath"
                    name="learningPath"
                    value={input.learningPath}
                    placeholder="Select"
                    readOnly
                    onClick={() => setLearningPathOpen((prevOpen) => !prevOpen)}
                    className="outline-none py-3 px-4 block w-full shadow-none border active:bg-transparent border-[#e3e3e2] rounded-[10px] pl-4"
                  />
                  <img
                    src={DropDown}
                    alt=""
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setLearningPathOpen((prevOpen) => !prevOpen)}
                  />

                  {learningPathOpen && (
                    <div
                      className="absolute z-10 top-full w-full bg-white rounded-xl shadow-lg py-3 border border-[#eaeaed]"
                      ref={dropdownRef}
                    >
                      <div
                        onClick={() => handleOriginClick("Sales Path")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e] border-b border-b-[#eaeaed]"
                      >
                        Sales Path
                      </div>
                      <div
                        onClick={() => handleOriginClick("Technial Path")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-euclid text-sm font-normal text-[#0e0e0e]"
                      >
                        Technial Path
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="trackName"
                  className="block text-base font-medium leading-6 text-generalBlack"
                >
                  Enter track name
                </label>
                <div className="mt-1">
                  <input
                    id="trackName"
                    name="trackName"
                    type="text"
                    value={input.trackName}
                    onChange={(e) =>
                      setInput({ ...input, trackName: e.target.value })
                    }
                    placeholder="Enter track name"
                    required
                    className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 mr-6">
              <p className="block text-base font-medium leading-6 text-generalBlack">
                Upload track image
              </p>
              <div className="text-center mt-1 border border-[#E3E3E2] border-dashed rounded-[12px] w-full h-fit py-[23px]">
                <label className="cursor-pointer">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-[#F7F7F7] mx-auto flex items-center justify-center">
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
            </div>
            <div className="mx-6 mt-4">
              <label
                htmlFor="courseName"
                className="block text-base font-medium leading-6 text-generalBlack"
              >
                Enter course name
              </label>
              <div className="mt-1">
                <input
                  id="courseName"
                  name="courseName"
                  value={input.courseName}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      courseName: e.target.value,
                    })
                  }
                  placeholder="Enter course name"
                  required
                  className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                />
              </div>
            </div>
            <div className="mr-6 mt-4">
              <label
                htmlFor="courseLink"
                className="block text-base font-medium leading-6 text-generalBlack"
              >
                Add course link
              </label>
              <div className="mt-1">
                <input
                  id="courseLink"
                  name="courseLink"
                  value={input.courseLink}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      courseLink: e.target.value,
                    })
                  }
                  placeholder="e,g www.coursera.com/cybersecurity"
                  required
                  className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                />
              </div>
            </div>
            <div className="mx-6 mt-4">
              <label
                htmlFor="dopePoint"
                className="block text-base font-medium leading-6 text-generalBlack"
              >
                Enter DOPE point
              </label>
              <div className="mt-1">
                <input
                  id="dopePoint"
                  name="dopePoint"
                  value={input.dopePoint}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      dopePoint: e.target.value,
                    })
                  }
                  placeholder="Enter DOPE point"
                  required
                  className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            {courses.map((course, i) => (
              <div key={i}>
                <p
                  onClick={() => deleteCourse(i)}
                  className="text-base font-medium text-[#B00020] ml-6 mb-4"
                >
                  Delete Details
                </p>
                <div className="border-t border-[#E8E8E8]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 sm:gap-x-4 m-6">
                    <div>
                      <label
                        htmlFor="courseName"
                        className="block text-base font-medium leading-6 text-generalBlack"
                      >
                        Enter course name
                      </label>
                      <div className="mt-1">
                        <input
                          name="courseName"
                          placeholder="Enter course name"
                          value={course.courseName}
                          onChange={(e) => handleInputChange(e, i)}
                          className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="courseLink"
                        className="block text-base font-medium leading-6 text-generalBlack"
                      >
                        Add course link
                      </label>
                      <div className="mt-1">
                        <input
                          name="courseLink"
                          placeholder="e,g www.coursera.com/cybersecurity"
                          value={course.courseLink}
                          onChange={(e) => handleInputChange(e, i)}
                          className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="dopePoint"
                        className="block text-base font-medium leading-6 text-generalBlack"
                      >
                        Enter DOPE point
                      </label>
                      <div className="mt-1">
                        <input
                          name="dopePoint"
                          placeholder="Enter DOPE point"
                          value={course.dopePoint}
                          onChange={(e) => handleInputChange(e, i)}
                          className="outline-none py-3 px-4 block w-full border border-[#e3e3e2] rounded-[10px] pl-4 placeholder:font-normal text-[#5C5C5B]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-6">
            <p
              className="text-base font-medium leading-6 text-primary"
              onClick={addCourse}
            >
              Add Another Course
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              className={`font-medium  py-2 px-4 w-[calc(35%_-_30px)] mt-24 text-white text-xl rounded-[30px] bg-primary opacity-50
                }`}
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTrack;
