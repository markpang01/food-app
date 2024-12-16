import React, { useState, useEffect } from "react";
import { Box, Spacer, Flex } from "@chakra-ui/react";
import { TitleBar } from "./components/TitleBar";
import { WriteReview } from "./WriteReview";
import { SearchReviews } from "./SearchReviews";
import { Settings } from "./Settings";
import { getReviewsFromFile } from "./searchReviewCalls.js";

function App() {
  const [tab, setTab] = useState("write");
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviewsFromFile();
      setReviews(data.reviews);
    };
    fetchData();
  }, []);

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

const characteristics = {
  metrics: [
    "taste",
    "freshness",
    "portion-size",
    "presentation",
    "variety",
    "speed",
    "staff-attentiveness",
    "staff-friendliness",
    "order-accuracy",
    "cleanliness",
    "noise",
    "lighting",
    "seat-comfort",
    "ambience",
    "value-for-price",
    "menu-clarity",
    "ease-of-payment",
    "wait-time",
    "accessibility",
  ],
  tags: [
    "romantic",
    "cozy",
    "trendy",
    "upscale",
    "casual",
    "rustic",
    "lively",
    "intimate",
    "family-friendly",
    "kid-friendly",
    "pet-friendly",
    "solo-diner-friendly",
    "group-friendly",
    "healthy",
    "vegetarian",
    "vegan",
    "gluten-free",
    "organic",
    "brunch",
    "late-night",
    "takeout",
    "breakfast",
    "scenic",
  ],
};

export default App;
