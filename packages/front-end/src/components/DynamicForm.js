import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@chakra-ui/react";

import PageWrapper from "./PageWrapper";

const DynamicForm = ({ fields, columns, contract, setView }) => {
  const { register, getValues } = useForm();
  const [network, setNetwork] = useState("Polygon Amoy");

  const handleSubmit = async () => {
    const values = getValues();
    console.log(values);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chainName: network,
          contract,
          constructorArguments: [Object.values(values)],
        }),
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setView("NOTIFY");
    }
  };

  const button = (
    <Button
      onClick={handleSubmit}
      variant="outline"
      bg="#ffffff"
      className="mr-[40px]"
    >
      Submit
    </Button>
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
                  />
                </FormControl>
              );
            case "date":
              return (
                <FormControl
                  key={field.name}
                  id={field.name}
                  isRequired={field.required}
                >
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    background="white"
                    type="date"
                    {...register(field.name)}
                    defaultValue={field.value}
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
        For dates use unix timestamp value (number) and specify amounts in
        Ether.
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
