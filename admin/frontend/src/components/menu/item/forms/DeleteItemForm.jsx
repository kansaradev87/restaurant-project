import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteItemForm() {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch items when a category is selected
  useEffect(() => {
    if (!selectedCategory) {
      setCategoryItems([]);
      return;
    }

    const fetchItemsByCategory = async () => {
      setFetchingItems(true);
      try {
        console.log(`Fetching items for category: ${selectedCategory}`); // Debugging
        const response = await axios.get(
          `http://localhost:5000/api/items/category/${selectedCategory}`
        );
        console.log("Fetched items:", response.data); // Debugging
        setCategoryItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load items for the selected category");
        setCategoryItems([]);
      } finally {
        setFetchingItems(false);
      }
    };

    fetchItemsByCategory();
    setSelectedItem(""); // Reset selected item when category changes
  }, [selectedCategory]);

  // Handle delete item request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem || !selectedCategory) {
      toast.error("Please select both item and category");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/items/${selectedItem}/${selectedCategory}`
      );

      toast.success("Item deleted successfully!");

      // Remove deleted item from UI
      setCategoryItems((prevItems) =>
        prevItems.filter((item) => item.name !== selectedItem)
      );

      // Reset selection
      setSelectedItem("");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(error.response?.data?.message || "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="dark:bg-darkmode-hover w-full lg:w-2/3 bg-lightmode-hover md:rounded-xl p-5">
        <h2 className="text-center text-2xl font-bold">Delete Item</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-5">
          
          {/* Category Selection */}
          <label htmlFor="category" className="mt-3">Category</label>
          {fetchingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-8 w-56 rounded-md border dark:bg-darkmode-components"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option> // Passing category name
              ))}
            </select>
          )}

          {/* Item Selection */}
          <label htmlFor="item" className="mt-3">Item Name</label>
          {!selectedCategory ? (
            <p className="text-sm text-gray-500">Please select a category first</p>
          ) : fetchingItems ? (
            <p>Loading items...</p>
          ) : (
            <select
              id="item"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="h-8 w-56 rounded-md border dark:bg-darkmode-components"
            >
              <option value="">Select an item</option>
              {categoryItems.length > 0 ? (
                categoryItems.map((item) => (
                  <option key={item._id} value={item.name}>{item.name}</option> // Passing item name
                ))
              ) : (
                <option value="" disabled>No items in this category</option>
              )}
            </select>
          )}

          {/* Delete Button */}
          <div className="flex justify-center items-center mt-5">
            <button
              type="submit"
              disabled={loading || !selectedItem || !selectedCategory}
              className={`border border-red-500 rounded-md h-8 w-24 mr-4 duration-200 
                ${(!selectedItem || !selectedCategory) 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'dark:hover:bg-red-500 hover:bg-red-500'}`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DeleteItemForm;
