const Header = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#601A35] text-2xl font-bold">
          <h1>Vinance</h1>
        </div>
        <div className="flex items-center bg-[#601A35] text-white px-4 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.11-.45 2.11-1.17 2.83l-5.66 5.66a4 4 0 01-5.66 0L5.17 16.83A4 4 0 014 11c0-2.21 1.79-4 4-4s4 1.79 4 4z"
            />
          </svg>
          <span className="font-semibold">Secure Checkout Page</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
