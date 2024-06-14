import React, { useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Link } from 'react-router-dom';
import Manage from '../../../components/Tracks/Manage';
import { UserList } from '../../../util/types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUserList } from '../../../features/super/superSlice';

type Props = {
  userList: UserList;
};

const ManageTracks = ({ userList }: Props) => {
  const dispatch = useAppDispatch();
  const TrackList = useAppSelector((state) => state.super.userList.data);

  useEffect(() => {
    if (!TrackList) {
      dispatch(getUserList());
    }
  }, [dispatch, TrackList]);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-medium text-[26px] text-[#363636]">Manage Learning Tracks</h1>
          <p className="text-[#5e5e5e] text-base font-normal">Manage learning tracks for users here</p>
        </div>
        <div>
          <Link
            to="/create-tracks"
            className="text-white text-sm font-medium bg-primary rounded-[12px] p-[10px] h-[55px] w-[200px] flex items-center justify-center"
          >
            Create Track
          </Link>
        </div>

      </div>
      <Manage
      userList={userList}
      />
    </DashboardLayout>

  )
}

export default ManageTracks