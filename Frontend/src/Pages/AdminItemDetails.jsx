import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCustomQuery } from "../Customhooks/useQuery";
import useProgressBar from "../Customhooks/useProgressbar";
import useCustommutation from "../Customhooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import "../css/AdminItemDetails.css";

export const AdminItemDetailsPage = () => {
  useProgressBar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [buttonname, setbuttonName] = useState("Approve");
  const reviewMutation = useCustommutation({
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      navigate("/adminReview");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const { data, isFetching, error } = useCustomQuery(
    ["AdminPendingItem", id],
    `items/pendingitems/${id}`
  );

  const item = data?.data;

  const [editReason, setEditReason] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (error) return <p>Error loading item details: {error.message}</p>;
  if (!item) return;

  const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleClick = (e) => {
    e.preventDefault();
    let status = "approved";
    setbuttonName(e.target.name);
    if (e.target.name == "Reject") {
      status = "rejected";
    }
    reviewMutation.mutate({
      url: `items/Admin/approveuploadeditem/${item?._id}`,
      method: `PATCH`,
      info: { Status: status },
    });
  };

  const handleSaveReason = () => {
    console.log("Saved reason:", editReason);
    setIsEditing(false);
  };

  const handleUndoRejection = () => {
    console.log("Rejection undone");
  };

  return (
    <div className="admin-item-details-container">
      <h1 className="page-title">Item Details</h1>

      <div className="details-card">
        {/* Left: Item Details */}
        <div className="item-section">
          <div className="item-image-container">
            <img
              src={item.Imageurl}
              alt={item.ItemName}
              className="item-image"
            />
            <div className={`status-badge status-${item.Status}`}>
              {item.Status}
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

            {item.Status === "pending" && (
              <div className="admin-actions">
                <button
                  className="approve-btn"
                  onClick={handleClick}
                  name="Approve"
                >
                  {reviewMutation.isPending && buttonname === "Approve" ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Approve"
                  )}
                </button>
                <button
                  className="reject-btn"
                  onClick={handleClick}
                  name="Reject"
                >
                  {reviewMutation.isPending && buttonname === "Reject" ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            )}

            {item.Status === "rejected" && (
              <div className="rejection-section">
                <h4>Rejection Reason</h4>
                {isEditing ? (
                  <div>
                    <textarea
                      value={editReason}
                      onChange={(e) => setEditReason(e.target.value)}
                      placeholder="Enter reason for rejection..."
                      rows={3}
                      className="reason-textarea"
                    />
                    <button className="save-btn" onClick={handleSaveReason}>
                      Save Reason
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>{item.RejectionReason || "No reason provided yet."}</p>
                    <button
                      className="edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      {item.RejectionReason ? "Edit Reason" : "Add Reason"}
                    </button>
                  </div>
                )}
                <button className="undo-btn" onClick={handleUndoRejection}>
                  Undo Rejection
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Founder Details */}
        <div className="founder-section">
          <div className="founder-info">
            <img
              src={item.Foundby?.ProfileImg}
              alt="Founder"
              className="founder-avatar"
            />
            <h3>
              {item.Foundby?.Firstname} {item.Foundby?.Surname}
            </h3>
            <div className="founder-contact">
              <div>
                <FaEnvelope /> {item.Foundby?.Email}
              </div>
              <div>
                <FaPhone /> {item.Foundby?.Phonenumber}
              </div>
            </div>
            <button className="contact-btn">Contact Finder</button>
          </div>
        </div>
      </div>
    </div>
  );
};
