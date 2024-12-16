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
import {
  getMetrics,
  getTags,
  rateTraits,
  writeReviewToFile,
} from "./writeReviewCalls.js";
import { ShowReview } from "./components/ShowReview";
import { FormAndSubmit } from "./components/FormAndSubmit.js";

export const WriteReview = ({ traits }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const handleFormSubmit = async () => {
    setLoading(true);
    const metrics = await getMetrics(traits, query);
    const tags = await getTags(traits, query);
    const response = { ...metrics, ...tags };
    const ratings = await rateTraits(response.metrics, query);
    await writeReviewToFile({ ...tags, ...ratings, query });
    setReview({ ...tags, ...ratings, query });
    setQuery("");
    setLoading(false);
  };

  return (
    <Flex direction="column" gap="10px" w="100%" px="30px" py="20px">
      <FormAndSubmit
        handleFormSubmit={handleFormSubmit}
        query={query}
        setQuery={setQuery}
        loading={loading}
      />
      {review && !loading && <ShowReview review={review} isOpen={true} />}
    </Flex>
  );
};
