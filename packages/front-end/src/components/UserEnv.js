import React, { useState } from "react";
import Header from "../components/Header";
import Contract from "../components/Contract";
import Message from "../components/Message";
import Requests from "../components/Requests";

const UserEnv = () => {
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
        return <Contract />;
    }
  };

  return (
    <div className="w-screen h-screen bg-capuccino flex flex-col">
      <Header setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  );
};

export default UserEnv;
