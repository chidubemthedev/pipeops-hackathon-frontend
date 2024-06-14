import DashboardLayout from "../../../../layouts/DashboardLayout";
import Pagination from "../../../../components/Utils/Pagination";
import CourseDetails from "./track";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChevronRight from "../../../../assets/images/chevron-right.png";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AllTopics, Course } from "../../../../util/types";
import { getCoursesByTopic } from "../../../../features/topic/topicSlice";
import noLeague from "../../../../assets/images/no-tracks.png";
import { SearchIcon } from "../../../../assets/icons";
import { LoadingSpinner } from "../../../../components/Utils/LoadingSpinner";

const TrackDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { topicId } = useParams();
  const location = useLocation();
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const topOfComponentRef = useRef<HTMLDivElement | null>(null);

  const topicName = location.state?.topicName;
  const loading = useAppSelector((state) => state.topic.loading);

  useEffect(() => {
    if (topicId) {
      dispatch(getCoursesByTopic(topicId)).then((res) => {
        if (res.payload) {
          setAllCourses(res.payload.courses);
        }
      });
    }
  }, [topicId, dispatch]);

  useEffect(() => {
    if (allCourses) {
      setFilteredCourses(
        allCourses.filter((course: Course) =>
          course.courseName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [allCourses, search]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (filteredCourses ? filteredCourses.length : 0) / itemsPerPage
  );

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  let coursesForCurrentPage: Course[] = [];

  if (filteredCourses) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    coursesForCurrentPage = filteredCourses.slice(startIndex, endIndex);
  }

  useEffect(() => {
    if (topOfComponentRef.current) {
      const offset = 220;
      window.scrollTo({
        top: topOfComponentRef.current.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  return (
    <DashboardLayout>
      <div>
        <p
          className="cursor-pointer font-normal font-walsheim text-[#5C5C5B] text-base flex items-center w-max"
          onClick={() => navigate(-1)}
        >
          <img src={ChevronRight} alt="" className="mr-2" />
          Back
        </p>
        <h1 className="font-medium font-walsheim text-generalBlack text-[26px] mb-4 mt-2">
          Learning Track Details
        </h1>
      </div>

      <div
        ref={topOfComponentRef}
        className="flex justify-between items-center  rounded-t-xl pb-5 bg-white"
      >
        <div className="mt-5 flex justify-between w-full px-6">
          <h2 className="font-medium text-base lg:text-lg text-[#0e0e0e] font-walsheim capitalize">
            {topicName}
          </h2>

          <div className="md:flex px-3 space-x-2 max-w-[400px] h-10 border-border w-full border rounded-[12px] items-center hidden">
            <input
              type="text"
              className="bg-inherit w-full border-none outline-none placeholder:text-placeholder"
              placeholder="Search Course"
              ref={inputRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <span>
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-[50vh] gap-2">
          <LoadingSpinner />
          <p className="text-2xl font-semibold">loading...</p>
        </div>
      )}
      {coursesForCurrentPage.length > 0 && (
        <div className="max-w-7xl overflow-x-auto border-b rounded-b-xl bg-white pb-8">
          <div className="flex flex-col">
            <div className="-my-2">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="pr-6 py-3 bg-[#F9F9F9F7] text-left text-base text-generalBlack font-medium font-walsheim tracking-wider">
                          <span className="pl-6">Name of Course</span>
                        </th>
                        <th className="px-6 py-3 bg-[#F9F9F9F7] text-left text-base text-generalBlack font-medium font-walsheim tracking-wider">
                          Website
                        </th>
                        <th className="px-6 py-3 bg-[#F9F9F9F7] text-left text-base font-walsheim text-generalBlack font-medium tracking-wider">
                          Earnable Point
                        </th>
                        <th className="pr-6 py-3 bg-[#F9F9F9F7] text-left text-base text-generalBlack font-medium font-walsheim tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {coursesForCurrentPage.map((course) => (
                        <CourseDetails key={course?.courseId} course={course} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && coursesForCurrentPage.length <= 0 && (
        <div className="bg-white flex flex-col justify-center items-center h-[50vh] rounded-b-xl">
          <img src={noLeague} alt="no-league" />
          <p className="text-lg font-semibold mt-4 text-center mr-0">
            No courses available.
          </p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totlaPages={totalPages}
        onPageChange={handlePageChange}
      />
    </DashboardLayout>
  );
};

export default TrackDetails;
