import React from "react";
import { Box, Spacer, Flex } from "@chakra-ui/react";

export const TitleBar = ({ tab, setTab }) => {
  return (
    <Flex borderBottom="1px solid black" bg="white">
      <Spacer />
      <Flex
        justify="space-between"
        borderLeft="1px solid black"
        gap="50px"
        px="10px"
        py="5px"
      >
        <Box
          onClick={() => setTab(0)}
          fontWeight={tab === 0 ? "semibold" : "normal"}
        >
          Write a review!
        </Box>
        <Box
          onClick={() => setTab(1)}
          fontWeight={tab === 1 ? "semibold" : "normal"}
        >
          Find a restaurant!
        </Box>
      </Flex>
    </Flex>
  );
};
