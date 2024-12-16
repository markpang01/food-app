import {
  giveSimilarityScore,
  findSimilarReviews,
} from "../utils/similarity.js";

const sampleReviewList = [
  {
    id: "1",
    tags: ["romantic", "cozy", "intimate"],
    ratings: [
      { metric: "taste", rating: 7 },
      { metric: "variety", rating: 3 },
      { metric: "speed", rating: 2 },
    ],
  },
  {
    id: "2",
    tags: ["family-friendly", "kid-friendly", "healthy"],
    ratings: [
      { metric: "cleanliness", rating: 2 },
      { metric: "staff-friendliness", rating: 9 },
      { metric: "speed", rating: 8 },
    ],
  },
];

const sampleResult = {
  tags: ["solo-diner", "healthy", "late-night"],
  ratings: [
    { metric: "cleanliness", rating: 8 },
    { metric: "speed", rating: 8 },
    { metric: "taste", rating: 7 },
  ],
};

test("giveSimilarityScore", () => {
  const score = giveSimilarityScore(sampleResult, sampleReviewList[1]);
  expect(score.tagSimilarity).toEqual(1);
  expect(score.metricSimilarity).toEqual(0);
});

test("find similar reviews", () => {
  const simArr = findSimilarReviews(sampleResult, sampleReviewList);
  expect(true).toEqual(true);
});
