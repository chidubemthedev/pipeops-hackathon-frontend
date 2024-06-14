import { useEffect } from "react";
import Link from "../../../../assets/images/green-link.svg";
import { Course } from "../../../../util/types";

const CourseDetails = ({ course }: { course: Course }) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <tr className="border-b last:border-b-0 border-[#E8E8E8]">
      <td className="pl-6 py-4 whitespace-nowrap text-sm font-normal text-generalBlack">
        <div className="">
          <div className="" aria-hidden="true" />
          <span className="capitalize">{course?.courseName}</span>
        </div>
      </td>
      <td className="px-6 whitespace-nowrap py-4 text-sm text-text-generalBlack font-normal">
        <div className="flex items-center space-x-2">
          <div className="flex flex-shrink-0 -space-x-1">
            <a
              href={course?.url}
              className="text-sm font-normal text-primary flex items-center cursor-pointer"
              target="blank"
            >
              Take Course
              <img src={Link} alt="" className="ml-3" />
            </a>
          </div>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm font-normal text-generalBlack text-center">
        {course?.point}
      </td>
      <td className="sm:pr-6 pr-3 py-4 whitespace-nowrap text-left  w-[auto]">
        <span
          className={`text-left text-sm py-1.5 rounded-[15px] px-4 font-medium ${
            course?.status === "completed"
              ? "bg-[#27AE60] bg-opacity-10 text-[#27AE60]"
              : course?.status === "enrolled"
              ? "bg-[#FFA500] bg-opacity-10 text-[#FFA500]"
              : "bg-[#EB5757] bg-opacity-10 text-[#EB5757]"
          }`}
        >
          {course?.status === "completed"
            ? "Completed"
            : course?.status === "enrolled"
            ? "In-progress"
            : "Not started"}
        </span>
      </td>
    </tr>
  );
};

export default CourseDetails;
