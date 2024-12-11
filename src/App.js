import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Spacer, Flex } from "@chakra-ui/react";
import { TitleBar } from "./TitleBar";
import { WriteReview } from "./WriteReview";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <TitleBar tab={tab} setTab={setTab} />
      {tab === 0 ? (
        <WriteReview traits={characteristics} />
      ) : (
        <Box>Finding a restaurant</Box>
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
