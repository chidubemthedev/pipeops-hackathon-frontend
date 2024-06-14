import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LeagueHeader from "../../../components/Admin/Leagues/LeagueHeader";
import LeagueTable from "../../../components/Admin/Leagues/LeagueTable";
import { getSuperLeagueList } from "../../../features/super/superSlice";
import DashboardLayout from "../../../layouts/DashboardLayout";

const ManageLeagues = () => {
  const dispatch = useAppDispatch();
  const leagueList = useAppSelector((state) => state.super.allLeagues);

  useEffect(() => {
    dispatch(getSuperLeagueList());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <LeagueHeader />
      <LeagueTable leagueList={leagueList} />
    </DashboardLayout>
  );
};

export default ManageLeagues;
