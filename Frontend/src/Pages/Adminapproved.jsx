import { useParams } from "react-router-dom";
import { useCustomQuery } from "../Customhooks/useQuery";
import useCustommutation from "../Customhooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import useProgressBar from "../Customhooks/useProgressbar";

import { toast } from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "../css/AdminItemDetails.css";
import "../css/AdminApprovedRightSide.css";

export const AdminApprovedDetailsPage = () => {
  useProgressBar();
  const queryClient = useQueryClient();
  const returnMutation = useCustommutation({
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: `Adminapproved${id}` });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const { id } = useParams();
  const { data, isFetching, error } = useCustomQuery(
    `Adminapproved${id}`,
    `items/approveditem/${id}`
  );

  const item = data?.data;

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!item) return <p>No item found.</p>;

  const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMarkAsReturned = () => {
    returnMutation.mutate({
      url: `items/updateitemreturned/${data?.data?._id}`,
      method: "PATCH",
    });
    console.log("Marked as returned logic here");
  };

  return (
    <div className="admin-item-details-container">
      <h1 className="page-title">Approved Item Details</h1>

      <div className="details-card">
        {/* Left: Item Details */}
        <div className="item-section">
          <div className="item-image-container">
            <img
              src={item.Imageurl}
              alt={item.ItemName}
              className="item-image"
            />
            <div className={`status-badge status-${item?.Status}`}>
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

        {/* Right: Approved Claimant */}
        <div className="approved-claimants-container">
          <h3>Approved Claimant</h3>
          {item.Claims && item.Claims.length > 0 ? (
            item.Claims.map((claim) => (
              <div className="approved-claimant-card" key={claim._id}>
                <div className="claimant-avatar-container">
                  <img
                    src={claim.User?.ProfileImg}
                    alt={`${claim.User?.Firstname} ${claim.User?.Surname}`}
                    className="claimant-avatar"
                  />
                </div>
                <p>
                  <strong>Name:</strong> {claim.User?.Firstname}{" "}
                  {claim.User?.Surname}
                </p>
                <p>
                  <FaEnvelope /> {claim.User?.Email}
                </p>
                <p>
                  <FaPhone /> {claim.User?.Phonenumber}
                </p>
                <div>
                  <strong>Answers:</strong>
                  <ul>
                    {claim.Answers.map((ans) => (
                      <li key={ans._id}>
                        <strong>{ans.Question_id?.Questiontext}:</strong>{" "}
                        {ans.Answertext}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="return-status">
                  {item.Isreturned ? (
                    <span className="returned">
                      <FaCheckCircle /> Item Returned
                    </span>
                  ) : (
                    <>
                      <span className="not-returned">Not Yet Returned</span>
                      <button
                        className="mark-returned-btn"
                        onClick={handleMarkAsReturned}
                      >
                        {returnMutation.isPending ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Mark as returned"
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No approved claimant for this item yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
