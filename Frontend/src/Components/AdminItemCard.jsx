import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Card.css";

const AdminItemCard = ({ item, currentFilter }) => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  console.log(item?.isEscalated);
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (currentFilter === "disputes") {
      navigate(`/admin/disputes/${item._id}`);
      return;
    }

    if (item?.isEscalated == true) {
      navigate(`/admin/escalated/${item._id}`);
      return;
    }
    const status = item?.Status?.toLowerCase().trim();
    console.log("Navigating for status:", status);

    switch (item?.Status?.toLowerCase().trim()) {
      case "pending":
        navigate(`/admin/review/${item?._id}`);
        break;
      case "approved":
        navigate(`/admin/approved/${item._id}`);
        break;
      case "rejected":
        navigate(`/admin/rejected/${item._id}`);
        break;

      default:
        navigate(`/admin/review/${item._id}`);
    }
  };

  return (
    <div className="lost-item-card">
      <div className="image-container">
        <img
          src={item.Imageurl}
          alt={item.ItemName}
          className="item-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            e.target.className = "item-image placeholder";
          }}
        />
        {item.Status === "pending" && (
          <div className="new-badge" style={{ backgroundColor: "#f59e0b" }}>
            Pending
          </div>
        )}
        {item.Status === "approved" && (
          <div className="new-badge" style={{ backgroundColor: "#10b981" }}>
            Approved
          </div>
        )}
        {item.Status === "rejected" && (
          <div className="new-badge" style={{ backgroundColor: "#ef4444" }}>
            Rejected
          </div>
        )}
        {item.Status === "escalated" && (
          <div className="new-badge" style={{ backgroundColor: "#f43f5e" }}>
            Escalated
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3>{item.ItemName}</h3>
          <span className="category">{item.Category}</span>
        </div>
        <p className="description">{item.Description}</p>

        <div className="card-footer">
          <div className="location">
            <FaMapMarkerAlt className="icon" />
            <span>{item.Locationfound}</span>
          </div>
          <div className="date">Posted {formattedDate}</div>
        </div>

        <button
          onClick={handleViewMore}
          className="details-button view-more-btn"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default AdminItemCard;
