import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Grid,
  Box,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";

import PageWrapper from "./PageWrapper";

const DynamicForm = ({
  fields,
  columns,
  contract,
  setView,
  setContractDeployData,
  setLoadingMessage,
}) => {
  const { register, getValues } = useForm();
  const toast = useToast();
  const [network, setNetwork] = useState("Polygon Amoy");

  const handleSubmit = async () => {
    setView("LOADING");
    setLoadingMessage("Your smart contract is being deployed...");
    const values = getValues();
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chainName: network,
          bytecode: contract.bytecode,
          abi: contract.abi,
          constructorArguments: Object.values(values),
        }),
      });
      const data = await res.json();
      setContractDeployData({
        contractLink: data.data.linkToContract,
        contractAddress: data.data.contractAddress,
        abi: data.data.abi,
      });
      setView("NOTIFY");
    } catch (error) {
      console.error(error);
      setView("UPLOAD");
      toast({
        title: "There was an error deploying your smart contract",
        duration: 3000,
        status: "error",
        position: "bottom-right",
        variant: "subtle",
      });
    }
  };

  const button = (
    <div className="mr-4">
      <Button
        className="m-[10px]"
        onClick={() => setView("UPLOAD")}
        fontFamily="mulish"
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          handleSubmit();
        }}
        type="submit"
        colorScheme="black"
        className="text-white bg-darkGreen hover:bg-opacity-80 transition ease-in-out duration-500 "
      >
        Submit
      </Button>
    </div>
  );

  const form = (
    <Box mb={8}>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
        {fields.map((field) => {
          switch (field.type) {
            case "input":
              return (
                <FormControl
                  key={field.name}
                  id={field.name}
                  isRequired={field.required}
                >
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    background="white"
                    {...register(field.name)}
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                  />
                </FormControl>
              );
            case "number":
              return (
                <FormControl
                  key={field.name}
                  id={field.name}
                  isRequired={field.required}
                >
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    background="white"
                    type="number"
                    {...register(field.name)}
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                  />
                </FormControl>
              );
            case "checkbox":
              return (
                <FormControl
                  key={field.name}
                  id={field.name}
                  as={"fieldset"}
                  isRequired={field.required}
                >
                  <FormLabel as="legend">{field.label}</FormLabel>
                  <Checkbox
                    {...register(field.name)}
                    defaultChecked={field.value}
                  />
                </FormControl>
              );
            default:
              return null;
          }
        })}
      </Grid>
      <Text mt={3}>
        For dates use unix timestamp value (number) and specify amounts in Gwei.
      </Text>
      <Select
        value={network}
        bg="white"
        onChange={(e) => setNetwork(e.target.value)}
        mt={4}
        placeholder="Select network for deployment"
      >
        <option value="Polygon Amoy">Polygon Amoy</option>
        <option value="Polygon zkEVM Cardona">Polygon zkEVM Cardona</option>
        <option value="Linea Sepolia Testnet">Linea Sepolia Testnet</option>
        <option value="OP Sepolia">OP Sepolia</option>
        <option value="Mantle Sepolia Testnet">Mantle Sepolia Testnet</option>
      </Select>
    </Box>
  );

  return <PageWrapper bottom={button}>{form}</PageWrapper>;
};

export default DynamicForm;
