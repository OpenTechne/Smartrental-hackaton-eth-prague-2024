"use client";
import { ChakraProvider } from "@chakra-ui/react";

import { Mulish } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { SUPPORTED_CHAINS } from "./constants";

// RainbowKit imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import theme from "./../chakra-theme.js";
// RainbowKit config
const config = getDefaultConfig({
  appName: "My RainbowKit App", // TODO: TBD
  projectId: "YOUR_PROJECT_ID", // TODO: TBD
  chains: SUPPORTED_CHAINS,
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const mulish = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head></head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={lightTheme({
                accentColor: "#083032",
                accentColorForeground: "white",
                borderRadius: "medium",
              })}
            >
              <ChakraProvider>
                <div
                  className={`flex justify-center items-center ${mulish.className}`}
                >
                  {children}
                </div>
              </ChakraProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
