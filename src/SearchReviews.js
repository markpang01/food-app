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
import { FormAndSubmit } from "./components/FormAndSubmit.js";
import { ShowReview } from "./components/ShowReview";
import {
  getMetrics,
  getTags,
  rateTraits,
  writeReviewToFile,
} from "./searchReviewCalls.js";
import { findSimilarReviews } from "./utils/similarity.js";

export const SearchReviews = ({ traits, reviews }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [similarReviews, setSimilarReviews] = useState([]);

  const handleFormSubmit = async () => {
    setLoading(true);
    const metrics = await getMetrics(traits.metrics, query);
    const tags = await getTags(traits.tags, query);
    const ratings = await rateTraits(metrics, query);
    const response = { ...tags, ...ratings };
    const similar = findSimilarReviews(response, reviews);
    setSimilarReviews(similar);
    setResponse(response);
    setLoading(false);
  };

  return (
    <Flex direction="column" gap="40px" w="100%" px="30px" py="20px">
      <FormAndSubmit
        handleFormSubmit={handleFormSubmit}
        query={query}
        setQuery={setQuery}
        loading={loading}
      />
      {response && !loading && (
        <ViewReviews response={response} similarReviews={similarReviews} />
      )}
    </Flex>
  );
};

const ViewReviews = ({ response, similarReviews }) => {
  return (
    <Flex justify="space-between" px="50px " gap="40px">
      <Box flex="1">
        <Text fontWeight="bold">Query Result</Text>
        <ShowReview review={response} isOpen={true} />
      </Box>
      <Box flex="1">
        <Text fontWeight="bold">Sorted Similar Reviews</Text>
        <Flex direction="column" gap="20px">
          {similarReviews.map((s, i) => (
            <ShowReview key={i} review={s} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};
