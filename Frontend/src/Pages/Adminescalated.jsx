import { useParams } from "react-router-dom";
import { useCustomQuery } from "../Customhooks/useQuery";
import useCustommutation from "../Customhooks/useMutation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useProgressBar from "../Customhooks/useProgressbar";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import "../css/AdminItemDetails.css";
import "../css/AdminEscalatedRightSide.css";

export const AdminEscalatedDetailsPage = () => {
  useProgressBar();
  const navigate = useNavigate();
  const { id } = useParams();
  const [buttonName, setButtonName] = useState("Approve");

  const reviewmutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data.message || "Claim approved successfully.");
      navigate("/adminReview");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error approving claim.");
    },
  });

  const { data, isFetching, error } = useCustomQuery(
    "AdminEscalated",
    `/claims/Admin/getclaims/${id}`
  );

  const item = data?.data;

  if (isFetching) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!item) return <div className="no-data">No data found for this item.</div>;

  const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleApproveClaim = (claimId) => {
    reviewmutation.mutate({
      url: `claims/reviewclaim/${claimId}/Item/${id}`,
      method: "PATCH",
      info: { Status: "approved" },
    });
  };

  return (
    <div className="admin-item-details-container">
      <h1 className="page-title">Escalated Item Details</h1>

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
          </div>
        </div>

        {/* Right: Escalated Claims Review */}
        <div className="escalated-claims-container">
          <h3>Review Claims</h3>
          {item.Claims && item.Claims.length > 0 ? (
            item.Claims.map((claim) => (
              <div key={claim._id} className="claimant-card">
                <img
                  src={
                    claim.User?.ProfileImg?.trim()
                      ? claim.User.ProfileImg
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={claim.User?.Firstname}
                  className="claimant-avatar"
                />
                <p>
                  <strong>Name:</strong> {claim.User?.Firstname}{" "}
                  {claim.User?.Surname}
                </p>
                <p>
                  <FaEnvelope /> {claim.User?.Email}
                </p>
                <div>
                  <strong>Verification:</strong>
                  <ul className="qa-list">
                    {claim.Answers?.map((answerObj) => (
                      <li key={answerObj._id}>
                        <strong>Q:</strong>{" "}
                        {answerObj.Question_id?.Questiontext} <br />
                        <strong>A:</strong> {answerObj.Answertext}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="claim-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleApproveClaim(claim._id)}
                    disabled={reviewmutation.isPending}
                  >
                    {reviewmutation.isPending
                      ? "Approving..."
                      : "Approve Claim"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No claims for this item yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
