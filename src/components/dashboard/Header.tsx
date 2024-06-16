import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="my-3 flex flex-col gap-3 sm:flex-row items-start sm:items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tght text-neutral-800 flex items-center gap-2">
            <div className="flex items-center">
              <span className="font-[500]">Overview</span>
            </div>
          </h2>
          <p className="text-sm text-[#5B5E63]">
            Here&apos;s the highlight for the day!
          </p>
        </div>

        <Link
          to={"/orders/create"}
          className="text-white text-sm font-medium bg-primary rounded-[30px] p-[10px] h-[55px] w-[200px] flex items-center justify-center"
        >
          Create Order
        </Link>
      </div>
    </div>
  );
};

export default Header;
