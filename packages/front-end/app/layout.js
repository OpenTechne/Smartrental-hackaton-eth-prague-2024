"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

const leftArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
};

const rightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className="flex h-screen">
        {/* <StarknetProvider> TODO change with rainbowkit */}
          <div
            className={`${
              isMenuOpen ? "w-64" : "w-14"
            } bg-gray-800 text-white transition-width duration-300 flex h-full flex-col`}
          >
            <button
              className="p-4 text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? leftArrow() : rightArrow()}
            </button>
            <div className="h-full flex  flex-col justify-between">
              <nav className={`${isMenuOpen ? "block" : "hidden"} mt-4`}>
                <ul>
                  <li className="p-4">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="p-4">
                    <Link href="/about">Find Your Space</Link>
                  </li>
                  <li className="p-4">
                    <Link href="/contact">Spaces For Rent</Link>
                  </li>
                  <li className="p-4">
                    <Link href="/rent_your_space">Rent Your Space</Link>
                  </li>
                  {/* Add more menu items as needed */}
                </ul>
              </nav>
              <div
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } flex content-center justify-center mb-5`}
              >
              </div>
            </div>
          </div>
          <div className={inter.className}>{children}</div>
        {/* </StarknetProvider>  TODO Change with rainbowkit*/}
      </body>
    </html>
  );
}
