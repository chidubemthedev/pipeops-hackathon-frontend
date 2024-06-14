import { useEffect } from "react";
import { InputField } from "../../../components/Input";
import DashboardLayout from "../../../layouts/DashboardLayout";

const UserDetails = () => {
  // const dispatch = useAppDispatch();
  // const [userDetails, setUserDetails] = useState<any | null>(null);
  // const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getUserProfile(id)).then((response) => {
  //       if (response.payload) {
  //         setUserDetails(response.payload);
  //       }
  //     });
  //   }
  // }, [dispatch, id]);

  return (
    <DashboardLayout>
      <div className="text-[#363636] bg-white rounded-[30px] mt-[40px]">
        <div className="flex items-center h-[80px] border-b border-[#E8EAED]">
          <h1 className="font-[500] text-[18px] leading-[32px] px-[20px]">
            User Details
          </h1>
        </div>

        <div>
          <div className="flex items-center h-[50px] border-b border-[#E8EAED]">
            <h1 className="font-[500] text-[16px] leading-[24px] px-[20px]">
              Contact Details
            </h1>
          </div>
          <div className="grid md:grid-cols-2 my-10 gap-8 font-[400] text-[16px] leading-[24px] px-[20px]">
            <div>
              <label>Full Name</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                // defaultValue={`${userDetails?.userDetails.firstName || ""} ${
                //   userDetails?.userDetails.lastName || ""
                // }`.trim()}
                required
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Email Address</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                // defaultValue={userDetails?.userDetails.email}
                required
                readOnly={true}
                type="email"
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Date of Birth</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                // defaultValue={
                //   userDetails?.userDetails.dateOfBirth
                //     ? new Date(
                //         userDetails.userDetails.dateOfBirth
                //       ).toLocaleDateString("en-GB")
                //     : ""
                // }
                required
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Phone Number</label>
              <div className="flex items-center gap-3">
                <div className="border mt-2 py-3 px-3 border-[#E8EAED] rounded-[12px] sm:text-sm sm:leading-6 text-placeholder">
                  +234
                </div>
                <InputField
                  classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                  // defaultValue={userDetails?.userDetails.phone}
                  required
                  readOnly={true}
                  type="tel"
                  onChange={() => {
                    console.log("first");
                  }}
                />
              </div>
            </div>

            <div>
              <label>State of Origin</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                // defaultValue={userDetails?.userDetails.stateOfOrigin}
                required
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Local Government (State of Origin)</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                // defaultValue={userDetails?.userDetails.localGovtOfOrigin}
                required
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>State of Residence</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                required
                // defaultValue={userDetails?.userDetails.stateOfResidence}
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>
            <div>
              <label>Local Government (State of Residence)</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                required
                // defaultValue={userDetails?.userDetails.localGovtOfResidence}
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center h-[50px] border-b border-[#E8EAED]">
            <h1 className="font-[500] text-[16px] leading-[24px] px-[20px]">
              Account Details
            </h1>
          </div>
          <div className="grid md:grid-cols-2 my-10 gap-8 font-[400] text-[16px] leading-[24px] px-[20px]">
            <div>
              <label>DOPE Username</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                // defaultValue={userDetails?.userDetails.username}
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Officer Type</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                required
                // defaultValue={userDetails?.userDetails.officerType}
                readOnly={true}
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Technical Capability</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                // defaultValue={
                //   userDetails?.userDetails.officerData.technicalCapability ||
                //   "None"
                // }
                readOnly={true}
                required
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Language</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                // defaultValue={userDetails?.userDetails.officerData.language}
                readOnly={true}
                required
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Total Courses Enrolled</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                // defaultValue={userDetails?.userDetails.enrolledCourses}
                readOnly={true}
                required
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Total Courses Completed</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                // defaultValue={userDetails?.userDetails.completedCourses}
                readOnly={true}
                required
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Total League Joined</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                // defaultValue={userDetails?.myLeagues.length}
                readOnly={true}
                required
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>

            <div>
              <label>Total Point Earned</label>
              <InputField
                classes="mt-[8px] h-[55px] rounded-[12px] border-[#E8EAED] px-[16px] w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                // defaultValue={userDetails?.userDetails.totalPointsEarned}
                readOnly={true}
                required
                onChange={() => {
                  console.log("first");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
