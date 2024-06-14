interface TabsProps {
  tabs: any;
  onChangeTab: any;
}

const Tabs = ({ tabs, onChangeTab }: TabsProps) => {
  const selectTab = (tab: any) => {
    onChangeTab(tab);
  };
  return (
    <>
      <div className="tabs">
        <ul className="flex-wrap md:flex-nowrap">
          {tabs.map((tab: any) => {
            return (
              <li
                key={tab.name}
                onClick={() => selectTab(tab)}
                className={`${
                  tab.isActive ? "is-active" : ""
                } w-max md:w-[100%] pb-1`}
              >
                {tab.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="tabs-details">
        <slot></slot>
      </div>
    </>
  );
};

export default Tabs;
