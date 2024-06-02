import { React, useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Text,
  Input,
  Button,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useConfig } from "wagmi";
import DashboardCard from "./DashboardCard";
import { FaUsers, FaClock, FaFileContract } from "react-icons/fa";
import { readContract } from "@wagmi/core";

const Contract = ({ contract }) => {
  const [contractAddress, setContractAddress] = useState("");
  const [contractLoaded, setContractLoaded] = useState(false);
  const [contractViewValues, setContractViewValues] = useState([]);
  const [contractAbi, setContractAbi] = useState([]);
  const toast = useToast();
  const config = useConfig();

  useEffect(() => {
    const fetchItems = async () => {
      const viewValues = [];
      for (const _function of contractAbi) {
        if (_function.stateMutability === "view") {
          viewValues[_function.name] = await getViewFunctionValue(
            _function.name
          );
        }
      }
      return viewValues;
    };
    fetchItems().then((data) => {
      setContractViewValues(data);
    });
  }, [contractLoaded]);

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

  const handleInputChange = (e) => {
    setContractAddress(e.target.value);
  };
  const handleButtonClick = async () => {
    try {
      const res = await fetch("/api/get/abi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chainId: Number(ethereum.chainId),
          address: contractAddress,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch abi");
      }

      const data = await res.json();
      const { abi } = data;
      if (!abi) {
        toast({
          title: "No abi found in the database",
          duration: 3000,
          status: "error",
          position: "bottom-right",
          variant: "subtle",
        });
      } else {
        setContractAbi(abi);
        setContractLoaded(true);
      }
    } catch (err) {
      toast({
        title: "There was an error while fetching the abi",
        duration: 3000,
        status: "error",
        position: "bottom-right",
        variant: "subtle",
      });
      console.error(err);
    }
  };

  const getViewFunctionValue = async (name) => {
    const result = await readContract(config, {
      abi: contractAbi,
      address: contractAddress,
      functionName: name,
    });
    return String(result);
  };

  return (
    <div className="w-full mx-24 my-16">
      {!contractLoaded ? (
        <div className="flex flex-col jusify-between w-full gap-8 mb-8">
          <input
            className=" border-2 border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            type="text"
            onChange={handleInputChange}
            placeholder="0x..."
          />
          <Button onClick={handleButtonClick}>Load Contract</Button>
        </div>
      ) : (
        <div>
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
          <Divider />
          <div className="flex flex-row my-1 gap-1">
            Contract Address :
            <Box
              borderRadius="md"
              borderWidth="2px"
              width={"fit-content"}
              borderColor={"darkGreen"}
              bg="white"
              color="black"
              p={0.25}
              px={1.5}
            >
              {contractAddress}
            </Box>
          </div>

          <Divider />

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {contractAbi.map(
              (_function) =>
                _function.stateMutability === "view" && (
                  <FormControl
                    key={_function.name}
                    id={_function.name}
                    isRequired
                  >
                    <FormLabel>{_function.name}</FormLabel>
                    <Input
                      // type={field.type}
                      placeholder={contractViewValues[_function.name]}
                      defaultValue={contractViewValues[_function.name]}
                      isDisabled={true}
                      bg={ "white"}
                    />
                  </FormControl>
                )
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Contract;
