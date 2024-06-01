import { extendTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config.js"; // adjust the path as needed

const { theme: tailwindTheme } = resolveConfig(tailwindConfig);

const theme = extendTheme({
  fonts: {
    heading: "'Mulish', sans-serif",
    body: "'Mulish', sans-serif",
  },
  colors: {
    fairgreen: tailwindTheme.colors.fairGreen,
    capuccino: tailwindTheme.colors.capuccino,
    // Map other colors as needed
  },
});

export default theme;
