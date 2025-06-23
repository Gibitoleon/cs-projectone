import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../css/Card.css";

const LostItemCard = ({ item, onViewDetails }) => {
  const formattedDate = new Date(item.datePosted).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="lost-item-card">
      <div className="image-container">
        <img
          src={item.imageUrl}
          alt={item.name}
          title={item.name}
          className="item-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            e.target.className = "item-image placeholder";
          }}
        />

        <div className="new-badge">NEW</div>
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3>{item.name}</h3>
          <span className="category">{item.category}</span>
        </div>

        <p className="description">{item.description}</p>

        <div className="card-footer">
          <div className="location">
            <FaMapMarkerAlt className="icon" />
            <span>{item.locationFound}</span>
          </div>
          <div className="date">Posted {formattedDate}</div>
        </div>

        <button
          onClick={() => onViewDetails(item.id)}
          className="details-button"
        >
          <FaEye className="icon" /> View Details
        </button>
      </div>
    </div>
  );
};

export default LostItemCard;
