import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  getMetricsPrompt,
  getTagsPrompt,
  rateMetricsPrompt,
} from "./prompts/SearchReviewsPrompts.js";

export async function getCharacteristicsFromFile() {
  const response = await fetch("http://localhost:3001/api/getFileData", {
    method: "POST",
    body: JSON.stringify({
      fileName: "characteristics.json",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function getReviewsFromFile() {
  const response = await fetch("http://localhost:3001/api/getFileData", {
    method: "POST",
    body: JSON.stringify({
      fileName: "reviews.json",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function rateTraits(metrics, query) {
  try {
    const QueryFormat = z.object({
      ratings: z.array(
        z.object({
          metric: z.string(),
          rating: z.number(),
        })
      ),
    });
    const zodFormat = zodResponseFormat(QueryFormat, "response");

    const response = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: rateMetricsPrompt(),
        promptInputs: {
          metrics,
          query,
        },
        responseFormat: `Your response should be an array of ratings. Each rating should be an object including the name of the exact metric from the list provided and a numerical value between 0 and 10.`,
        zodFormat,
      }),
    });
    const res = await response.json();
    const parsed = JSON.parse(res.response);
    return parsed;
  } catch (e) {
    console.log("Error in rateTraits:", e);
  }
}

export async function getMetrics(metrics, query) {
  try {
    const QueryFormat = z.object({
      metrics: z.array(z.string()),
    });
    const zodFormat = zodResponseFormat(QueryFormat, "response");

    const response = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: getMetricsPrompt(),
        promptInputs: {
          metrics,
          query,
        },
        zodFormat,
      }),
    });
    const res = await response.json();
    const parsed = JSON.parse(res.response);
    return parsed;
  } catch (e) {
    console.log("Error in getMetrics:", e);
  }
}

export async function getTags(tags, query) {
  try {
    const QueryFormat = z.object({
      tags: z.array(z.string()),
    });
    const zodFormat = zodResponseFormat(QueryFormat, "response");

    const response = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: getTagsPrompt(),
        promptInputs: {
          tags,
          query,
        },
        zodFormat,
      }),
    });
    const res = await response.json();
    const parsed = JSON.parse(res.response);
    return parsed;
  } catch (e) {
    console.log("Error in getMetrics:", e);
  }
}
