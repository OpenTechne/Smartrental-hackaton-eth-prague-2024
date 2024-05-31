import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Button,
  Grid,
  Box,
} from "@chakra-ui/react";

import PageWrapper from "./PageWrapper";

const DynamicForm = ({ fields, sections, onSubmit, columns }) => {
  const { register, handleSubmit } = useForm();

  const button = (
    <Button type="submit" colorScheme="blue">
      Submit
    </Button>
  );

  const form = (
    <form onSubmit={handleSubmit(onSubmit)}>
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} mb={8}>
          <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
            {fields
              .filter((field) => field.section === section.name)
              .map((field) => {
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
                          type="date"
                          {...register(field.name)}
                          defaultValue={field.value}
                        />
                      </FormControl>
                    );
                  case "textarea":
                    return (
                      <FormControl
                        key={field.name}
                        id={field.name}
                        isRequired={field.required}
                      >
                        <FormLabel>{field.label}</FormLabel>
                        <Textarea
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
        </Box>
      ))}
    </form>
  );

  return <PageWrapper bottom={button}>{form}</PageWrapper>;
};

export default DynamicForm;
