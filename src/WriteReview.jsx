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

export const WriteReview = ({ traits }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [identifiedTraits, setIdentifiedTraits] = useState(null);
  const [reviewedMetrics, setReviewedMetrics] = useState([]);

  const handleFormSubmit = async () => {
    setLoading(true);
    const metrics = await getMetrics(traits, query);
    const tags = await getTags(traits, query);
    const response = { ...metrics, ...tags };
    setIdentifiedTraits(response);
    const ratings = await rateTraits(response.metrics, query);
    await writeReviewToFile({ ...tags, ...ratings });
    setReviewedMetrics(ratings.ratings);
    setLoading(false);
  };

  return (
    <Flex w="100%" px="30px" py="20px">
      <Flex flex="3" direction="column" gap="10px">
        <FormAndSubmit
          handleFormSubmit={handleFormSubmit}
          query={query}
          setQuery={setQuery}
          loading={loading}
        />
        {identifiedTraits && (
          <ViewTraits
            identifiedTraits={identifiedTraits}
            allTraits={traits}
            reviewedMetrics={reviewedMetrics}
          />
        )}
      </Flex>
      <Box flex="1">
        <ViewCharacteristics flex="1" traits={traits} />
      </Box>
    </Flex>
  );
};

const ViewTraits = ({ identifiedTraits, allTraits, reviewedMetrics = [] }) => {
  const metrics = identifiedTraits.metrics || [];
  const tags = identifiedTraits.tags || [];
  return (
    <Flex gap="50px">
      {reviewedMetrics.length ? (
        <Box>
          <Text fontWeight="semibold">Metrics Rated</Text>
          <UnorderedList>
            {metrics.map((t, i) => {
              const rating = reviewedMetrics.find((r) => r.metric === t);
              return (
                <ListItem key={i}>
                  {t}: {rating.rating}
                </ListItem>
              );
            })}
          </UnorderedList>
        </Box>
      ) : (
        <Box>
          <Text fontWeight="semibold">Metrics Found</Text>
          <UnorderedList>
            {metrics.map((t, i) => (
              <ListItem key={i}>{t}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
      <Box>
        <Text fontWeight="semibold">Tags Found</Text>
        <UnorderedList>
          {tags.map((t, i) => (
            <ListItem key={i}>{t}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

const FormAndSubmit = ({ handleFormSubmit, query, setQuery, loading }) => {
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
