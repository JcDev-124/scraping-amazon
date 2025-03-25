import { useState } from "react";
import axios from "axios";
import './App.css'; 

export default function App() {
  // State hooks for keyword, products, loading, and error
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch products from the backend API
  const fetchProducts = async () => {
    if (!keyword.trim()) return; // Prevent request if keyword is empty

    setLoading(true);
    setError(null);
    setProducts([]); // Clear previous search results
    try {
      const response = await axios.get(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      setProducts(response.data); // Store fetched products
    } catch (err) {
      setError("Failed to fetch products. Please try again later."); // Handle error
    }
    setLoading(false);
  };

  // Handle input changes for the search keyword
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value); // Update the search keyword
    setError(null); // Clear any previous error message
  };

  // Clear search results and input field
  const handleClearSearch = () => {
    setKeyword(""); // Reset keyword
    setProducts([]); // Clear products
    setError(null); // Clear errors
  };

  return (
    <div className="app-container">
      <h1 className="title">Amazon Scraper</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter keyword"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button className="search-button" onClick={fetchProducts} disabled={loading || !keyword.trim()}>
          {loading ? "Searching..." : "Search"} {/* Show searching text when loading */}
        </button>
        {keyword && (  // Show clear button only when there's a keyword
          <button className="clear-button" onClick={handleClearSearch}>Clear Search</button>
        )}
      </div>
      {error && <p className="error">{error}</p>} {/* Display error if exists */}
      <div className="products-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
