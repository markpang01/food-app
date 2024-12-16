import React from "react";
import { Textarea, Button, Spacer, Flex } from "@chakra-ui/react";

export const FormAndSubmit = ({
  handleFormSubmit,
  query,
  setQuery,
  loading,
}) => {
  const handleFormChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <Flex px="10px" direction="column" gap="10px" w="100%">
      <Textarea noOfLines={6} value={query} onChange={handleFormChange} />
      <Flex>
        <Spacer />
        <Button
          colorScheme="teal"
          isDisabled={loading || query.length === 0}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
