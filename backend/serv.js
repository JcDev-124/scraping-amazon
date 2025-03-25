import { serve } from "bun"; // Import Bun's serve function (not used in this case)
import express from "express"; // Import Express for routing
import axios from "axios"; // Import Axios for making HTTP requests
import { JSDOM } from "jsdom"; // Import JSDOM for parsing HTML content
import cors from "cors"; // Import CORS to handle cross-origin requests

const app = express();
const PORT = 3000;

// Enable CORS for all incoming requests
app.use(cors())

// Define the scraping API endpoint
app.get("/api/scrape", async (req, res) => {
  const { keyword } = req.query; // Extract 'keyword' from query parameters
  
  // If no keyword is provided, return a 400 error
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    // Construct the Amazon search URL based on the provided keyword
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    
    // Make an HTTP GET request to the Amazon search results page
    const { data } = await axios.get(url, {
      headers: {
        // Set a User-Agent header to avoid being blocked by Amazon
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Parse the HTML response using JSDOM
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const products = []; // Initialize an empty array to store product data

    // Loop through all the product items in the search results
    document.querySelectorAll(".s-main-slot .s-result-item").forEach((item) => {
      // Extract the product title, rating, reviews, and image
      const title = item.querySelector("h2 a span")?.textContent || "No title";
      const rating = item.querySelector(".a-icon-star-small span")?.textContent?.split(" ")[0] || "No rating";
      const reviews = item.querySelector(".a-size-small .a-link-normal")?.textContent || "No reviews";
      const image = item.querySelector(".s-image")?.src || "No image";

      // Push the extracted data into the products array
      products.push({ title, rating, reviews, image });
    });

    // Return the list of products as a JSON response
    res.json(products);
  } catch (error) {
    // If there's an error during the request, return a 500 error
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

console.log(`Server running at http://localhost:${PORT}`); // Log the server running message
