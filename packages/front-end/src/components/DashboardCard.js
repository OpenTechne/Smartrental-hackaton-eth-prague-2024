import React from "react";
import { Box, Text, Icon } from "@chakra-ui/react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Box
      className="bg-capuccino flex items-center justify-between"
      p={4}
      rounded="md"
      boxShadow="md"
      width="100%"
      maxWidth="500px"
      height={"auto"}
      maxHeight={100}
    >
      <div className="flex justify-between items-center w-full">
        <Box>
          <Text fontSize="sm" color="gray.500">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </Box>
        <Box
          className="bg-fairGreen rounded-full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="50px"
          height="50px"
        >
          <Icon as={icon} boxSize={6} color="#073032" />
        </Box>
      </div>
    </Box>
  );
};

export default DashboardCard;
