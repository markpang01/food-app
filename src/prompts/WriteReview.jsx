export const rateMetricsPrompt = () => {
  return `
  Here is a restaurant review:
  {review}

  Here is a list of quantifiable metrics:
  \`\`\`
  {metrics}
  \`\`\`

  For each of these metrics, please provide a value between 0 and 10 for how the review ranks this metric.

  A basic guide for your ratings is below:
  1 - The worst the reviewer has seen
  3 - Was viewed as moderately bad.
  5 - Was mentioned without indication of experience, or was called average.
  7 - Was viewed as moderately good.
  10 - The best the reviewer has seen.

  Respond in a JSON object with the following format:
  {{ 
    "ratings": [ { metric: "exact name of metric from provided list", rating: integer } ]
  }}

  `;
};

export const getMetricsPrompt = () => {
  return `
  Here is a list of metrics:
  \`\`\`
  {metrics}
  \`\`\`

  Please identify all the metrics from the list that are relevant to the following review:
  {review}

  Your response should be composed of exact matches of metrics from the provided list.
  Make sure you output all metrics that are mentioned, whether in a positive or negative light.

  Your response should be in a JSON object with the following headings:
  {{
    "metrics": ["your list of metrics here"],
  }}
  `;
};

export const getTagsPrompt = () => {
  return `
  Here is a list of tags:
  \`\`\`
  {tags}
  \`\`\`

  Please identify all the tags that are suitable for the following restaurant review:
  {review}

  Your response should be composed of exact matches of tags from the provided list.
  Make sure you only output tags that are true for that review.

  Your response should be in a JSON object with the following headings:
  {{
    "tags": ["your list of tags here"],
  }}
  `;
};
