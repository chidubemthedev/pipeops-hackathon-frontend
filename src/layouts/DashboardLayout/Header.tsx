import { MenuIcon } from "../../assets/icons";
const Header = ({ userData, isOpen, setIsOpen }: any) => {
  function handleClick() {
    setIsOpen(!isOpen);
  }

  const initials = `${userData?.firstName?.charAt(
    0
  )}${userData?.lastName?.charAt(0)}`;

  return (
    <nav className="fixed top-0 right-0 h-[80px] flex items-center flex-wrap bg-[#fff] p-5 lg:px-10 w-full  lg:w-[82%] ml-auto lg:justify-between justify-between z-40">
      <div
        onClick={handleClick}
        className="lg:hidden flex items-center justify-center gap-[20px]"
      >
        <MenuIcon />
        <h1 className="font-[900] text-2xl capitalize text-primary">VINANCE</h1>
      </div>

      <div className="lg:flex px-3 space-x-2 max-w-[400px] h-10 w-full  rounded-[12px] items-center hidden" />

      <div className="flex gap-5  divide-x divide-[#E8EAED]">
        <div className="">
          <div className="ml-5  flex items-center gap-x-3 relative">
            <div className="w-[30px] h-[30px] md:w-[41px] md:h-[41px]  rounded-full overflow-hidden bg-[#D0F5EE80] font-bold flex items-center justify-center uppercase">
              {userData.image ? (
                <img src={userData.image} />
              ) : (
                <span className="text-xs md:text-base">{initials}</span>
              )}
              <span className="w-2 h-2 rounded-full bg-[#4BB543] absolute right-[-1px] bottom-0 md:left-8 md:bottom-1"></span>
            </div>
            <p className="font-medium text-sm hidden lg:block capitalize text-neutral-800">
              {userData.firstName} {userData.lastName}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
