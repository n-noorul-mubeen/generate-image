const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY; // Pixabay API Key
// Helper function to fetch images from Pixabay
const fetchImage = async (query) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=3`
    );
    return response.data.hits[0]?.webformatURL || "No image found";
  } catch (error) {
    console.error("Error fetching image:", error);
    return "Error fetching image";
  }
};
// Define endpoints
app.get("/:category", async (req, res) => {
  const category = req.params.category;
  const imageUrl = await fetchImage(category);
  res.send(`<img src="${imageUrl}" alt="${category} image" />`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
