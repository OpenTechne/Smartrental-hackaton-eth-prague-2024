import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Text,
  Input,
} from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";
import { FaUsers, FaClock, FaFileContract } from "react-icons/fa";

const Contract = ({ contract }) => {
  const data = [
    {
      title: "Total Rent",
      value: "1ETH",
      icon: FaUsers,
    },
    {
      title: "Time Until Renewal",
      value: "3 days",
      icon: FaClock,
    },
    {
      title: "Your Contracts",
      value: "1",
      icon: FaFileContract,
    },
  ];

  const formFields = [
    {
      name: "landlordName",
      label: "Landlord's Name",
      type: "text",
      placeholder: "Graba Monchi",
      isReadOnly: true,
      value: "Graba Monchi",
    },
    {
      name: "tenantName",
      label: "Tenant's Name",
      type: "text",
      placeholder: "Antonino Arduino",
      isReadOnly: true,
      value: "Antonino Arduino",
    },
    {
      name: "propertyAddress",
      label: "Property Address",
      type: "text",
      placeholder: "An address here",
      isReadOnly: true,
      value: "An address here",
    },
    {
      name: "securityDeposit",
      label: "Security Deposit",
      type: "number",
      isReadOnly: true,
      placeholder: "Write your amount here ...",
    },
    {
      name: "rentAmount",
      label: "Rent Amount",
      type: "number",
      isReadOnly: true,
      placeholder: "Write your amount here ...",
    },
    {
      name: "rentDueDate",
      label: "Rent Due Date",
      type: "date",
      isReadOnly: true,
      placeholder: "Choose your date ...",
    },
    {
      name: "leaseEndDate",
      label: "Lease End Date",
      type: "date",
      isReadOnly: true,
      placeholder: "Choose your date here ...",
    },
  ];
  return (
    <div className="w-full mx-24 my-16">
      <div className="flex jusify-between w-full gap-8 mb-8">
        {data.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <Box mb={8}>
        <Text fontSize="2xl" mb={6}>
          Personal Data
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {formFields.map((field) => (
            <FormControl key={field.name} id={field.name} isRequired>
              <FormLabel>{field.label}</FormLabel>
              <Input
                type={field.type}
                placeholder={field.placeholder}
                defaultValue={field.value}
                isDisabled={field.isReadOnly}
                bg={field.isReadOnly ? "pink.50" : "white"}
              />
            </FormControl>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Contract;
