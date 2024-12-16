import React, { useState, useEffect } from "react";
import {
  UnorderedList,
  ListItem,
  Text,
  Textarea,
  Button,
  Box,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { ShowReview } from "./components/ShowReview";

export const Settings = ({ reviews, traits }) => {
  return (
    <Flex w="100%" px="30px" py="20px">
      <Flex flex="3" direction="column" gap="10px">
        <Text fontWeight="bold">Reviews</Text>
        <Flex direction="column" gap="20px">
          {reviews.map((s, i) => (
            <ShowReview key={i} review={s} />
          ))}
        </Flex>
      </Flex>
      <Box flex="1">
        <ViewCharacteristics flex="1" traits={traits} />
      </Box>
    </Flex>
  );
};

const ViewCharacteristics = ({ traits }) => {
  const { metrics, tags } = traits;

  return (
    <Flex px="30px" gap="30px" borderLeft="1px solid">
      <Flex direction="column" gap="10px">
        <Text fontWeight="bold">Metrics</Text>
        <Flex direction="column" gap="3px">
          {metrics.map((m, i) => (
            <Text key={i}>{m}</Text>
          ))}
        </Flex>
      </Flex>
      <Flex direction="column" gap="10px">
        <Text fontWeight="bold">Tags</Text>
        <Flex direction="column" gap="3px">
          {tags.map((t, i) => (
            <Text key={i}>{t}</Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
