import React, { useState, useEffect } from "react";
import { Box, Spacer, Flex } from "@chakra-ui/react";
import { TitleBar } from "./components/TitleBar";
import { WriteReview } from "./WriteReview";
import { SearchReviews } from "./SearchReviews";
import { Settings } from "./Settings";
import {
  getReviewsFromFile,
  getCharacteristicsFromFile,
} from "./searchReviewCalls.js";

function App() {
  const [tab, setTab] = useState("write");
  const [reviews, setReviews] = useState([]);
  const [characteristics, setCharacteristics] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getReviewsFromFile();
      const characteristics = await getCharacteristicsFromFile();
      setReviews(data.reviews);
      setCharacteristics(characteristics);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Box>Loading info...</Box>;
  }

  return (
    <>
      <TitleBar tab={tab} setTab={setTab} />
      {tab === "write" && <WriteReview traits={characteristics} />}
      {tab === "search" && (
        <SearchReviews reviews={reviews} traits={characteristics} />
      )}
      {tab === "settings" && (
        <Settings reviews={reviews} traits={characteristics} />
      )}
    </>
  );
}

export default App;
