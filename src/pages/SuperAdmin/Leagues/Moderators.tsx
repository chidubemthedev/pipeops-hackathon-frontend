import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ModeratorHeader from "../../../components/Admin/Leagues/ModeratorHeader";
import ModeratorTable from "../../../components/Admin/Leagues/ModeratorTable";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getLeagueModerators } from "../../../features/super/superSlice";

const Moderators = () => {
  const dispatch = useAppDispatch();
  const moderatorList = useAppSelector((state) => state.super.moderators);

  console.log(moderatorList, "ModeratorList");

  useEffect(() => {
    dispatch(getLeagueModerators());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <ModeratorHeader />
      <ModeratorTable moderators={moderatorList} />
    </DashboardLayout>
  );
};

export default Moderators;
