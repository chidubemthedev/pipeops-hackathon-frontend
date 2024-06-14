import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { InputField } from "../../../../components/Input";
import { getAdminProfile } from "../../../../features/super/superSlice";
import editUser from "../../../../assets/icons/user-edit.svg";

const Profile = () => {
  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoProgressComplete, setPhotoProgressComplete] = useState(false);
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state?.super?.adminProfile);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Create storage ref
    const storageRef = ref(storage, `adminimage/${file.name}`);
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
        // setInput({ ...input, image: downloadURL, thumbnail: downloadURL });
      }
    );
  };

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  console.log(profile);
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative max-w-full border rounded-xl bg-white">
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
              <InputField
                id="firstName"
                name="firstName"
                type="text"
                onChange={() => console.log("h")}
                defaultValue={profile?.data?.firstName}
                required
                classes="border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]"
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
                <InputField
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  onChange={() => console.log("h")}
                  defaultValue={profile?.data?.lastName}
                  classes="border outline-none py-3 px-4 shadow-none ring-0 focus:ring-0 ring-transparent active:bg-transparent border-[#eaeaed] rounded-[10px] pl-4 placeholder:font-normal placeholder:text-base placeholder:text-[#B9B8B8]"
                />
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#E3E3E2] border-dashed rounded-[12px] w-full h-fit py-[23px] flex items-center gap-4 self-end flex-wrap">
            <label className="cursor-pointer ml-12">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#F7F7F7] mx-auto flex items-center justify-center">
                <div>
                  <img src={editUser} alt="edit user" />
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
            <label className="text-[#0E0E0E] text-[14px] font-[500] leading-[24px]">
              {profile?.data?.firstName} {profile?.data?.lastName}
              <p className="leading-[24px] mr-0 text-[14px] font-[400] text-[#5C5C5B]">
                super admin
              </p>
            </label>
            <br />
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
      </div>

      <div className="flex items-center my-8 justify-center flex-wrap">
        <div className="mr-6 mb-3">
          <button
            type="button"
            className="px-16 py-2.5 border border-[#16ceaa] rounded-3xl text-base font-medium text-[#16ceaa]"
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`px-16 py-2.5 rounded-3xl text-base font-medium text-white focus:outline-none bg-[#16ceaa] shadow-[0_26px_46px_0_rgba(22,206,170,0.35)] opacity-40`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
