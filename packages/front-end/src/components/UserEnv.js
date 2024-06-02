import React, { useState } from "react";
import Header from "../components/Header";
import Contract from "../components/Contract";
import Message from "../components/Message";
import Requests from "../components/Requests";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const UserEnv = (contract) => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "contract":
        return <Contract />;
      case "message":
        return <Message />;
      case "requests":
        return <Requests />;
      default:
        return <Contract contract={contract} />;
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex relative">
      <Header setActiveSection={setActiveSection} />
      <div className="absolute right-[30px] top-[30px]">
        <ConnectButton />
      </div>
      <div className=" flex w-screen justify-center self-center">
        {renderSection()}
      </div>
    </div>
  );
};

export default UserEnv;
