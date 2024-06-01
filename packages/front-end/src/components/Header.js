// components/Header.js
import Link from "next/link";

const Header = ({ setActiveSection }) => {
  return (
    <header className="w-full bg-gray-800 text-white p-4">
      <nav className="flex justify-around">
        <button onClick={() => setActiveSection("Contract")}>Contract</button>
        <button onClick={() => setActiveSection("message")}>Message</button>
        <button onClick={() => setActiveSection("requests")}>Reqiests</button>
      </nav>
    </header>
  );
};

export default Header;
