import { useState } from "react";
import { FaSearch, FaFilter, FaCalendarAlt } from "react-icons/fa";
import LostItemCard from "../../Components/Item";
import "../../css/LostItempage.css";

const LostItemsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("name"); // 'name' or 'description'
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [items] = useState([
    {
      id: 1,
      name: "Designer Leather Wallet",
      description:
        "Found in the student lounge with credit cards and ID. Reward offered for return.",
      category: "Wallet",
      locationFound: "Student Center Lounge",
      datePosted: "2023-06-15",
      imageUrl:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "AirPods Pro (2nd Gen)",
      description:
        "White case with blue tooth sticker. Last connected to 'iPhone 14 Pro'.",
      category: "Electronics",
      locationFound: "Library Study Room B2",
      datePosted: "2023-06-10",
      imageUrl:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Gold Necklace",
      description:
        "Thin gold chain with heart pendant. Found near the fountain.",
      category: "Jewelry",
      locationFound: "Central Campus Fountain",
      datePosted: "2023-06-05",
      imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601",
    },
    {
      id: 4,
      name: "Black Backpack",
      description:
        "North Face backpack with laptop compartment and water bottle pocket.",
      category: "Bag",
      locationFound: "Bus Stop #12",
      datePosted: "2023-05-28",
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Ray-Ban Sunglasses",
      description: "Black Wayfarer style with slight scratch on left lens.",
      category: "Accessories",
      locationFound: "Sports Field Bleachers",
      datePosted: "2023-05-20",
      imageUrl:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Water Bottle",
      description: "Hydro Flask 32oz in matte black with stickers on the side.",
      category: "Other",
      locationFound: "Gym Locker Room",
      datePosted: "2023-05-15",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchText.trim() === "" ||
      item[searchField]?.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="lost-items-container">
      <div className="search-filter-section">
        <div className="search-box-wrapper">
          <FaSearch className="icon" />
          <input
            type="text"
            className="search-box"
            placeholder={`Search by ${searchField}...`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="search-dropdown"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="name">Item Name</option>
            <option value="description">Description</option>
          </select>
        </div>

        <div className="filter-section">
          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Wallet</option>
            <option>Electronics</option>
            <option>Jewelry</option>
            <option>Bag</option>
            <option>Accessories</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="results-header">
        <h2>
          Recently Found Items <span>{filteredItems.length} items</span>
        </h2>
        <div className="sorted-by">
          <FaCalendarAlt /> Sorted by: Newest First
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <LostItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LostItemsPage;
