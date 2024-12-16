import React, { useState, useEffect } from "react";
import {
  Collapse,
  Text,
  Button,
  Box,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

export const ShowReview = ({ review, isOpen = false }) => {
  const [open, setOpen] = useState(isOpen);

  if (!review) return null;
  return (
    <Box w="100%" gap="100px">
      {review?.query && (
        <Text pb="5px" borderBottom="1px dotted">
          {review?.query}
        </Text>
      )}
      <Flex gap="5px">
        <Text fontWeight="medium">Tags: </Text>
        <Text>{review?.tags?.join(", ")}</Text>
      </Flex>
      <Box>
        <Flex gap="10px">
          <Text fontWeight="medium">Metrics</Text>
          <Button variant="link" onClick={() => setOpen(!open)} size="xs">
            {open ? "(hide)" : "(show)"}
          </Button>
        </Flex>
        <Collapse in={open}>
          <SimpleGrid
            columns={2}
            spacingX="20px"
            spacingY="8px"
            justifyItems="start"
            border="1px dotted black"
            p="5px"
          >
            {review?.ratings?.map((m, i) => (
              <React.Fragment key={i}>
                <Text fontWeight="light" textAlign="right">
                  {m.metric}
                </Text>
                <Text fontWeight="light">{m.rating}</Text>
              </React.Fragment>
            ))}
          </SimpleGrid>
        </Collapse>
      </Box>
    </Box>
  );
};
