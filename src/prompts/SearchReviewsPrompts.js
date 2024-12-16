export const rateMetricsPrompt = () => {
  return `
  Here is a query:
  {query}

  Here is a list of quantifiable metrics:
  \`\`\`
  {metrics}
  \`\`\`

  For each of these metrics, please provide a value between 0 and 10 for how important each metric is to the query.

  A basic guide for your ratings is below:
  1 - The user wants to find the worst thing in this category.
  3 - The user wants to find something bad in regards to this metric.
  5 - Mentions this metric but there is no clear attitude towarsd it.
  7 - The user wants to find something with this metric.
  10 - The user only wants the best thing available for this metric.

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

  Please identify all the metrics from the list that are relevant to the following query:
  {query}

  Your response should be composed of exact matches of metrics from the provided list.
  Make sure you output all metrics that are relevant to the query, regardless of whether they are mentioned in a positive or negative light.

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

  Please identify all the tags that are suitable for the following query:
  {query}

  Your response should be composed of exact matches of tags from the provided list.
  Make sure you only output tags that can be directly and easily interpreted from the query.

  Your response should be in a JSON object with the following headings:
  {{
    "tags": ["your list of tags here"],
  }}
  `;
};
