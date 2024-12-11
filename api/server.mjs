import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
const app = express();
import { queryGPT } from "./queryGPT.js";
import cors from "cors";
app.use(cors());

app.use(express.json());
const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, promptInputs, responseFormat, zodFormat } = req.body;
    const response = await queryGPT(
      prompt,
      promptInputs,
      responseFormat,
      zodFormat
    );
    res.json({ response });
  } catch (e) {
    console.log("error:", e);
  }
});

app.post("/api/addReview", (req, res) => {
  try {
    const newReview = req.body;

    console.log(process.cwd(), "CWD");
    const filePath = path.join(process.cwd(), "../reviews", "reviews.json");

    // Read current data
    const fileData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileData);

    // Ensure `reviews` is an array
    if (!Array.isArray(data.reviews)) {
      data.reviews = [];
    }

    // Add the new review
    data.reviews.push(newReview);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res
      .status(200)
      .json({ message: "Review added successfully!", reviews: data.reviews });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
