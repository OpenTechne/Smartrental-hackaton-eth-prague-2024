// components/Header.js
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
const Header = ({ setActiveSection }) => {
  const [activeSection, setActiveSectionState] = useState("contract");
  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setActiveSectionState(section);
  };
  return (
    <div className="flex flex-col w-[240px] h-[600px] rounded-[10px] bg-fairGreen text-white p-4 items-center justify-start self-center ml-[30px]">
      <Image className="" src="/Logo.svg" width={180} height={50} />
      <nav className="flex flex-col justify-around items-start mt-[30px]">
        <button
          className={`text-black border-2 rounded-[5px] w-[180px] h-[40px] flex items-center justify-start pl-[10px] mb-[10px] ${
            activeSection === "contract"
              ? "bg-capuccino border-black"
              : " border-transparent"
          }`}
          onClick={() => handleSetActiveSection("contract")}
        >
          <Image
            src="/dashboard.svg"
            width={20}
            height={20}
            className="mr-[10px]"
          />
          Dashboard
        </button>
        <button
          className={`text-black border-2 rounded-[5px] w-[180px] h-[40px] flex items-center justify-start  pl-[10px] mb-[10px] ${
            activeSection === "message"
              ? "bg-capuccino border-black"
              : " border-transparent"
          }`}
          onClick={() => handleSetActiveSection("message")}
        >
          <Image
            src="/message.svg"
            width={20}
            height={20}
            className="mr-[10px]"
          />
          Communication
        </button>
        <button
          className={`text-black border-2 rounded-[5px] w-[180px] h-[40px] flex items-center justify-start  pl-[10px] ${
            activeSection === "requests"
              ? "bg-capuccino border-black"
              : " border-transparent"
          }`}
          onClick={() => handleSetActiveSection("requests")}
        >
          <Image
            src="/requests.svg"
            width={20}
            height={20}
            className="mr-[10px]"
          />
          Requests
        </button>
      </nav>
    </div>
  );
};

export default Header;
