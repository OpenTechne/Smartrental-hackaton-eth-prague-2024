import React, { useState } from "react";
import Header from "../components/Header";
import Contract from "../components/Contract";
import Message from "../components/Message";
import Requests from "../components/Requests";

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
    <div className="w-screen h-screen bg-capuccino flex ">
      <Header setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  );
};

export default UserEnv;
