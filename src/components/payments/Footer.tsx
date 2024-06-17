import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md py-4 px-6 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#601A35] text-sm">
          &copy; {new Date().getFullYear()} Vinance. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="/privacy-policy"
            className="text-[#601A35] hover:underline text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-[#601A35] hover:underline text-sm"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
