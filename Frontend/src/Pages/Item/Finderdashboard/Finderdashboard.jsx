import { useState } from "react";
import LostItemCard from "../../../Components/Item";
import "../../../css/Finderdashboard.css";
import { useNavigate } from "react-router-dom";
import { Upload } from "./Upload";

const FinderDashboard = () => {
  const [activeTab, setActiveTab] = useState("uploaded");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const [uploadedItems, setUploadedItems] = useState([
    {
      id: 1,
      name: "Designer Leather Wallet",
      description: "Found in the student lounge with credit cards and ID.",
      category: "Wallet",
      locationFound: "Student Center Lounge",
      datePosted: "2023-06-15",
      imageUrl:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Approved",
      hasNewClaims: true,
    },
    {
      id: 2,
      name: "Ray-Ban Sunglasses",
      description: "Wayfarer style found near sports bleachers.",
      category: "Accessories",
      locationFound: "Sports Field Bleachers",
      datePosted: "2023-06-14",
      imageUrl:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Pending",
      hasNewClaims: false,
    },
    {
      id: 3,
      name: "Black Backpack",
      description: "North Face backpack with laptop compartment.",
      category: "Bag",
      locationFound: "Bus Stop #12",
      datePosted: "2023-06-10",
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Rejected",
      hasNewClaims: false,
    },
    {
      id: 4,
      name: "Gold Necklace",
      description: "Thin gold chain with heart pendant.",
      category: "Jewelry",
      locationFound: "Central Campus Fountain",
      datePosted: "2023-06-05",
      imageUrl:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Approved",
      hasNewClaims: true,
    },
    {
      id: 5,
      name: "AirPods Pro (2nd Gen)",
      description: "White case with blue tooth sticker.",
      category: "Electronics",
      locationFound: "Library Study Room B2",
      datePosted: "2023-06-01",
      imageUrl:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Pending",
      hasNewClaims: false,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "",
    locationFound: "",
    imageUrl: "",
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const newUploadedItem = {
      ...newItem,
      id: uploadedItems.length + 1,
      datePosted: new Date().toISOString().split("T")[0],
      status: "Pending",
      hasNewClaims: false,
    };
    setUploadedItems([newUploadedItem, ...uploadedItems]);
    setNewItem({
      name: "",
      description: "",
      category: "",
      locationFound: "",
      imageUrl: "",
    });
    setActiveTab("uploaded");
  };

  const filteredItems =
    statusFilter === "All"
      ? uploadedItems
      : uploadedItems.filter((item) => item.status === statusFilter);

  return (
    <div className="finder-dashboard">
      <div className="tab-buttons">
        <button
          className={activeTab === "uploaded" ? "active" : ""}
          onClick={() => setActiveTab("uploaded")}
        >
          Uploaded Items
        </button>
        <button
          className={activeTab === "upload" ? "active" : ""}
          onClick={() => setActiveTab("upload")}
        >
          Upload New Item
        </button>
      </div>

      {activeTab === "uploaded" && (
        <>
          <div className="dashboard-header">
            <h2>📦 My Uploaded Items</h2>
            <p className="subtext">
              Track your uploaded items and manage claims. Click an item to view
              claim details.
            </p>
          </div>

          <div className="status-filters">
            {["All", "Approved", "Pending", "Rejected"].map((status) => (
              <button
                key={status}
                className={`filter-button ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="items-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="upload-status-wrapper"
                onClick={() => navigate(`/finder/item/${item.id}`)}
              >
                <LostItemCard item={item} showStatusBadge />
                <div className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
                {item.hasNewClaims && (
                  <span className="new-claim-tag">New Claim</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "upload" && <Upload />}
    </div>
  );
};

export default FinderDashboard;
