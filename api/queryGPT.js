import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });

export async function queryGPT(
  prompt,
  promptInputs,
  responseFormat = "",
  zodFormat
) {
  let formattedPrompt = prompt;
  console.log(promptInputs, "PROMPT INPUTS");
  for (const [key, value] of Object.entries(promptInputs)) {
    const placeholder = `{${key}}`;
    formattedPrompt = formattedPrompt.replaceAll(placeholder, value);
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: responseFormat,
      },
      {
        role: "user",
        content: formattedPrompt,
      },
    ],
    response_format: zodFormat,
  });
  return completion.choices[0].message.content;
}
