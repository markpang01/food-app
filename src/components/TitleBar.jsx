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
          onClick={() => setTab("write")}
          fontWeight={tab === "write" ? "semibold" : "normal"}
        >
          Write a review!
        </Box>
        <Box
          onClick={() => setTab("search")}
          fontWeight={tab === "search" ? "semibold" : "normal"}
        >
          Find a restaurant!
        </Box>
        <Box
          onClick={() => setTab("settings")}
          fontWeight={tab === "settings" ? "semibold" : "normal"}
        >
          Look at stuff
        </Box>
      </Flex>
    </Flex>
  );
};
