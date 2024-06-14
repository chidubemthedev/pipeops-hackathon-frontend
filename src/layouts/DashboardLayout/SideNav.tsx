import CloseIcon from "../../assets/icons/MdiClose.svg";
import Logo from "../../assets/images/Logo.svg";

import { clearState } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { appNavs } from "../../util/helpers";
import { LogoutIcon, SideBarDivider } from "../../assets/icons";

const SideNav = ({ isOpen, setIsOpen }: any) => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation();

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const userNavs = appNavs.filter((nav) =>
    nav?.roles?.includes(authUser?.userData?.role?.toUpperCase())
  );

  const handleNavIcon = (nav: any) => {
    if (nav.link === "/") {
      return location.pathname === nav.link ? nav.activeIcon : nav.icon;
    } else {
      return location.pathname.includes(nav.link) ? nav.activeIcon : nav.icon;
    }
  };

  const isNavActive = (nav: any) => {
    if (nav.link === "/") {
      return Boolean(location.pathname === nav.link);
    } else {
      return Boolean(location.pathname.includes(nav.link));
    }
  };

  const handleNavClick = (e: any, nav: any) => {
    const navDropdown = document.getElementById(`nav-dropdown-${nav.name}`);
    navDropdown?.classList.contains("active")
      ? navDropdown?.classList.remove("active")
      : navDropdown?.classList.add("active");

    const navIcon = document.getElementById("nav-icon");
    navIcon?.classList.contains("active")
      ? navIcon?.classList.remove("active")
      : navIcon?.classList.add("active");
  };
  const logOutUser = () => {
    document.cookie = "ttk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(clearState());
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`${
        isOpen
          ? "block left-0 w-[80%] opacity-1"
          : "w-0 left-[-20%] md:left-[-40%] lg:left-0 opacity-1"
      } lg:block md:w-[25%] lg:w-[18%] bg-white h-screen fixed top-0 p-5 px-0 flex flex-col justify-between z-50 pt-0 sidenav-transition font-walsheim`}
    >
      <div className="pt-5 lg:pt-12 h-full overflow-y-auto hidden-scrollbar">
        <Link
          to={"/"}
          className={`hidden lg:block lg:ml-[22px] lg:mb-[62px] px-5 `}
        >
          <img src={Logo} alt="" className={`lg:mb-[62px] image`} />
        </Link>
        <img
          src={CloseIcon}
          alt=""
          className="mb-5 mt-2 w-6 ml-5 lg:hidden cursor-pointer"
          onClick={handleClick}
        />

        <div className="relative flex-1">
          <div className="mt-4 flex flex-col gap-y-2">
            {userNavs.map((nav) =>
              nav?.hasChildren ? (
                <div key={nav.name}>
                  <div
                    className={
                      // eslint-disable-next-line no-constant-condition
                      `${
                        isNavActive(nav)
                          ? "bg-[#D0F5EE80] text-primary font-bold hover:text-orange"
                          : ""
                      } relative flex items-center gap-x-5  p-4 px-0 pl-10 rounded-lg cursor-pointer w-full text-[#8C8B8B] hover:text-[#8C8B8B] `
                    }
                    onClick={(e: any) => handleNavClick(e, nav)}
                  >
                    <img src={handleNavIcon(nav)} alt="" />

                    <div className="flex justify-between items-center w-full pr-8">
                      <p className="text-sm text-inherit font-base hover:text-inherit">
                        {nav.name}
                      </p>
                      <span id="nav-icon">{<SideBarDivider />}</span>
                    </div>

                    {isNavActive(nav) && (
                      <div className="absolute left-0 top-0 h-full w-1 rounded-r-2xl bg-primary"></div>
                    )}
                  </div>
                  <div
                    className="nav-dropdown  relative"
                    id={`nav-dropdown-${nav.name}`}
                  >
                    <div className="absolute top-0 right-[76%]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="78"
                        viewBox="0 0 13 78"
                        fill="none"
                      >
                        <path
                          d="M1 0.5V31.5M1 31.5H12.5M1 31.5V74C1 75.6569 2.34315 77 4 77H12.5"
                          stroke="#8C8B8B"
                        />
                      </svg>
                    </div>
                    {nav?.children.map((nav) => {
                      return (
                        <NavLink
                          key={nav.name}
                          to={nav.link}
                          className={({ isActive }) =>
                            ` relative flex items-center text-left gap-x-5  w-max  ml-[4.5rem] rounded-lg cursor-pointer w-full text-[#8C8B8B] hover:text-[#8C8B8B] `
                          }
                        >
                          <p
                            className={`text-sm  font-base hover:text-inherit p-1 px-2 rounded-md ${
                              isNavActive(nav)
                                ? "bg-[#D0F5EE80] text-primary font-medium hover:text-orange mt-4"
                                : "mt-4"
                            }`}
                          >
                            {nav.name}
                          </p>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={nav.name}
                  to={nav?.hasChildren ? "#" : nav.link}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#D0F5EE80] text-primary font-bold hover:text-orange"
                        : ""
                    } relative flex items-center gap-x-5  p-4 px-0 pl-10 rounded-lg cursor-pointer w-full text-[#8C8B8B] hover:text-[#8C8B8B] `
                  }
                >
                  <img src={handleNavIcon(nav)} alt="" />

                  <p className="text-sm text-inherit font-base hover:text-inherit">
                    {nav.name}
                  </p>
                  {isNavActive(nav) && (
                    <div className="absolute left-0 top-0 h-full w-1 rounded-r-2xl bg-primary"></div>
                  )}
                </NavLink>
              )
            )}
          </div>
        </div>

        <div className="absolute bottom-10 md:bottom-5 w-full left-0">
          <div
            className="flex justify-start gap-4 items-center border-t border-[#CFCFCF] mx-5 py-4  px-4 cursor-pointer"
            onClick={logOutUser}
          >
            <LogoutIcon />
            <p className="text-secondary-300 text-sm font-medium">Log Out</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
