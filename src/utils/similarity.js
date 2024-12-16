export function giveSimilarityScore(review, resultReview) {
  const { tags, ratings } = review;
  const { tags: resultTags, ratings: resultMetrics } = resultReview;
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  const numTagMatches = tags.reduce((acc, t) => {
    acc += resultTags.includes(t) ? 1 : 0;
    return acc;
  }, 0);
  ratings.forEach((m) => {
    const resVal = resultMetrics.find((r) => r.metric === m.metric);
    if (resVal) {
      const normA = m.rating - 5;
      const normB = resVal.rating - 5;
      dotProduct += normA * normB;
      magnitudeA += normA ** 2;
      magnitudeB += normB ** 2;
    }
  });
  if (magnitudeA === 0 || magnitudeB === 0) {
    return { metricSimilarity: 0, tagSimilarity: numTagMatches };
  }
  return {
    metricSimilarity:
      dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB)),
    tagSimilarity: numTagMatches,
  };
}

export function findSimilarReviews(review, allReviews) {
  const similarities = allReviews.map((r) => {
    const similarity = giveSimilarityScore(review, r);
    return { ...r, ...similarity };
  });
  return similarities.sort((a, b) => {
    const aTotal = a.tagSimilarity * 2 + a.metricSimilarity;
    const bTotal = b.tagSimilarity * 2 + b.metricSimilarity;
    return bTotal - aTotal;
  });
}
