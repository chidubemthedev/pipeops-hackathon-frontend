import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { SearchIcon } from "../../../../assets/icons";
import Header from "../../../../components/Leagues/Header";
import LeagueList from "../../../../components/Leagues/LeagueList";
import Tabs from "../../../../components/Utils/Tabs";
import {
  getJoinedLeagues,
  getLeagueList,
  getSentRequests,
  getStarredLeagues,
} from "../../../../features/league/leagueSlice";
import DashboardLayout from "../../../../layouts/DashboardLayout";

const DiscoverLeaguesPage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  let leagues = useAppSelector((state) => state.league.leagueList);
  const joinedLeagues = useAppSelector((state) => state.league.joinedLeagues);
  const sentRequests = useAppSelector((state) => state.league.sentRequests);

  const joinedLeagueIds = joinedLeagues.map((league) => league._league._id);
  const sentRequestLeagueIds = sentRequests.map((request) => request._id);

  leagues = leagues.filter(
    (league) =>
      !joinedLeagueIds.includes(league._id) &&
      !sentRequestLeagueIds.includes(league._id)
  );

  let starredLeagues = useAppSelector((state) => state.league.starredLeagues);
  starredLeagues = starredLeagues.filter(
    (league) => !joinedLeagueIds.includes(league._id)
  );

  const [tabs, setTabs] = useState([
    { name: "Discover Leagues", value: "all", isActive: true },
    { name: "Public Leagues", value: "public", isActive: false },
    { name: "Private Leagues", value: "private", isActive: false },
    { name: "Saved Leagues", value: "starred", isActive: false },
  ]);

  const publicLeagues = leagues.filter((league) => league.private === false);
  const privateLeagues = leagues.filter((league) => league.private === true);

  useEffect(() => {
    dispatch(getLeagueList());
    dispatch(getStarredLeagues());
    dispatch(getJoinedLeagues());
    dispatch(getSentRequests());
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
            leagues={leagues}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
        {tabs[1].isActive && (
          <LeagueList
            leagues={publicLeagues}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
        {tabs[2].isActive && (
          <LeagueList
            leagues={privateLeagues}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
        {tabs[3].isActive && (
          <LeagueList
            leagues={starredLeagues}
            loading={loading}
            tab={activeTab?.value || "all"}
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default DiscoverLeaguesPage;
