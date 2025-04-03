import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayCategory() {
  const [categories, setCategories] = useState([]); // State for categories
  const [fetchingCategories, setFetchingCategories] = useState(true); // Loading state
  const [message, setMessage] = useState(""); // Error message

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data); // Store categories in state
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage("Failed to load categories");
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  if (fetchingCategories) {
    return <div>Loading Categories...</div>;
  }

  return (
    <div>
      {message && <div className="error-message">{message}</div>} {/* Show error if any */}
      {categories.length === 0 ? (
        <div>No Categories available</div>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b my-4 mx-6">Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6">
            {categories.map((category) => (
              <div key={category._id} className="border rounded p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{category.name}</h3> {/* Corrected */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayCategory;
