import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SearchIcon } from "../../../../assets/icons";
import Header from "../../../../components/Leagues/Header";
import LeagueList from "../../../../components/Leagues/LeagueList";
import Tabs from "../../../../components/Utils/Tabs";
import {
  getJoinedLeagues,
  getLeagueList,
  getMyCreatedLeagues,
  getPendingLeagueRequests,
  getSentRequests,
} from "../../../../features/league/leagueSlice";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import RequestList from "../../../../components/Leagues/Request/RequestList";

const MyLeagues = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const joinedLeaguesInfo = useAppSelector(
    (state) => state.league.joinedLeagues
  );
  const createdLeaguesInfo = useAppSelector(
    (state) => state.league.createdLeagues
  );
  const sentRequests = useAppSelector((state) => state.league.sentRequests);
  const pendingLeagueRequests = useAppSelector(
    (state) => state.league.pendingLeagues
  );

  const [tabs, setTabs] = useState([
    { name: "All Joined Leagues", value: "joined", isActive: true },
    { name: "Created Leagues", value: "created", isActive: false },
    { name: "Sent Requests", value: "sent", isActive: false },
    { name: "Pending Requests", value: "pending", isActive: false },
  ]);

  const joinedLeagues = joinedLeaguesInfo.map((league) => {
    return league._league;
  });

  const createdLeagues = createdLeaguesInfo.map((league) => {
    return league._league;
  });

  const joinedLeaguesLeaderBoard = joinedLeaguesInfo.map((league) => {
    return league.leaderboard;
  });

  const createdLeaguesLeaderBoard = createdLeaguesInfo.map((league) => {
    return league.leaderboard;
  });

  useEffect(() => {
    dispatch(getLeagueList());
    dispatch(getMyCreatedLeagues());
    dispatch(getJoinedLeagues());
    dispatch(getSentRequests());
    dispatch(getPendingLeagueRequests());
  }, [dispatch, tabs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeTab = tabs.find((tab) => tab.isActive);

  const onChangeTab = (selectedTab: any) => {
    setLoading(true); // Start loading

    const newTabs = tabs.map((tab: any) => {
      return {
        ...tab,
        isActive: tab.name === selectedTab.name,
      };
    });
    setTabs(newTabs);

    setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 1000);
  };

  return (
    <DashboardLayout>
      <Header />

      <div className="lg:flex px-3 space-x-2 max-w-[400px] h-10 border-border w-full border rounded-[12px] items-center hidden bg-white mt-[40px]">
        <input
          type="text"
          className="bg-inherit w-full border-none outline-none placeholder:text-placeholder  "
          placeholder="Search league"
        />
        <span>
          <SearchIcon />
        </span>
      </div>

      <section className="px-[16px] py-[12px] rounded-[20px]">
        <div className="my-10 md:w-[90%]">
          <Tabs tabs={tabs} onChangeTab={onChangeTab} />
        </div>
        {tabs[0].isActive && (
          <LeagueList
            leagues={joinedLeagues}
            leaderBoard={joinedLeaguesLeaderBoard}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
        {tabs[1].isActive && (
          <LeagueList
            leagues={createdLeagues}
            leaderBoard={createdLeaguesLeaderBoard}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
        {tabs[2].isActive && (
          <RequestList
            requests={sentRequests}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
        {tabs[3].isActive && (
          <RequestList
            requests={pendingLeagueRequests}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default MyLeagues;
