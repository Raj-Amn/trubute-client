import type React from "react";

type HeaderProps = {
  firstName: string;
  lastName: string;
};

const HeaderSection: React.FC<HeaderProps> = ({ firstName, lastName }) => {
  return (
    <header className="w-full">
      {/* 🔹 Top Navigation Bar */}
      <div className="w-full bg-[#f5f7f8]/90 backdrop-blur-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="Tribute  Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-[#2a5b5f] text-xl font-medium">
              Tribute
            </span>
          </div>

          {/* Right: Nav Links */}
          <nav className="flex items-center space-x-8 text-[#2a5b5f] font-semibold text-sm tracking-wide">
            <a href="#" className="hover:text-[#1e3d3f] transition-colors">
              SIGN IN
            </a>
            <a href="#" className="hover:text-[#1e3d3f] transition-colors">
              CREATE A NEW WEBSITE
            </a>
            <a href="#" className="hover:text-[#1e3d3f] transition-colors">
              INVITE OTHERS
            </a>
            <a href="#" className="hover:text-[#1e3d3f] transition-colors">
              CONTACT SUPPORT
            </a>
          </nav>
        </div>
      </div>

      {/* 🔹 Main Image Section */}
      <div
        className="w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.forevermissed.com/tpl/forevermissed/flying_seagulls/final/build_1760959068466/images/cover_mobile.png')",
        }}
      >
        <div className="flex items-center justify-center h-full  text-5xl  drop-shadow-lg text-[#2A5E65]">
          {firstName} {lastName}
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
