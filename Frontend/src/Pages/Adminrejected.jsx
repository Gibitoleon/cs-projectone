import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";
import "../css/AdminRejectedDetails.css";

const fakeRejectedItems = [
  {
    _id: "1",
    ItemName: "Designer Leather Wallet",
    Description:
      "Found in the student lounge with credit cards and ID inside. The wallet is black with a silver monogram.",
    Category: "Accessories",
    Locationfound: "Student Center Lounge, Near Coffee Stand",
    Imageurl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    Status: "rejected",
    RejectionReason: "Item does not match any reported lost wallet details.",
    Foundby: {
      Fullname: "John Doe",
      Email: "john@example.com",
      ProfilePic: "https://randomuser.me/api/portraits/men/75.jpg",
      Phone: "+254 712 345 678",
    },
    createdAt: new Date().toISOString(),
  },
];

export const AdminRejectedDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const selected = fakeRejectedItems.find((itm) => itm._id === id);
    setItem(selected);
  }, [id]);

  if (!item) return <div className="loading">Loading...</div>;

  const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="admin-rejected-details-container">
      <h1 className="page-title">Rejected Item Details</h1>

      <div className="details-card">
        {/* Left: Item Details */}
        <div className="item-section">
          <div className="item-image-container">
            <img
              src={item.Imageurl}
              alt={item.ItemName}
              className="item-image"
            />
            <div className="status-badge status-rejected">
              <FaTimesCircle /> {item.Status}
            </div>
          </div>

          <div className="item-details">
            <h2>{item.ItemName}</h2>
            <div className="detail-row">
              <span className="category-badge">{item.Category}</span>
            </div>
            <div className="detail-row">
              <FaCalendarAlt /> {formattedDate}
            </div>
            <div className="detail-row">
              <FaMapMarkerAlt /> {item.Locationfound}
            </div>
            <div className="item-description">
              <h4>Description</h4>
              <p>{item.Description}</p>
            </div>

            <div className="rejection-reason">
              <h4>Rejection Reason</h4>
              <p>{item.RejectionReason}</p>
            </div>
          </div>
        </div>

        {/* Right: Founder Details */}
        <div className="founder-section">
          <div className="founder-info">
            <img
              src={item.Foundby?.ProfilePic}
              alt="Founder"
              className="founder-avatar"
            />
            <h3>{item.Foundby?.Fullname}</h3>
            <div className="founder-contact">
              <div>
                <FaEnvelope /> {item.Foundby?.Email}
              </div>
              <div>
                <FaPhone /> {item.Foundby?.Phone}
              </div>
            </div>
            <button className="contact-btn">Contact Finder</button>
          </div>
        </div>
      </div>
    </div>
  );
};
