import { useState } from "react";
import "../css/DisputeDetails.css";
import { useCustomQuery } from "../Customhooks/useQuery";
import useCustommutation from "../Customhooks/useMutation";
import { useParams, useNavigate } from "react-router-dom";
import useProgressBar from "../Customhooks/useProgressbar";
import { toast } from "react-hot-toast";

export const DisputeDetailsPage = () => {
  const [message, setMessage] = useState("");
  const [followUpSent, setFollowUpSent] = useState(false);
  const navigate = useNavigate();

  useProgressBar();
  const { id } = useParams();

  // Fetch item disputes and claims
  const { data, isFetching, error } = useCustomQuery(
    "Admindispute",
    `disputes/getdisputes/${id}`
  );
  const item = data?.data;

  // Mutation: Send follow-up to all parties
  const sendFollowUpMutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data.message || "Follow-up sent to all parties.");
      setMessage("");
      setFollowUpSent(true); // SET FOLLOWUP SENT TO TRUE HERE
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error sending follow-up.");
    },
  });

  const handleSendFollowUp = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a follow-up message.");
      return;
    }

    sendFollowUpMutation.mutate({
      url: `disputes/sendfollowupforall`,
      method: "POST",
      info: {
        FollowupMessage: message,
        ItemId: id,
      },
    });
  };

  // Mutation: Mark dispute as resolved
  const updateDisputemutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data.message || "Dispute marked as resolved.");
      navigate("/admindisputes");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error resolving dispute.");
    },
  });

  const handleResolveDispute = (e, disputeId) => {
    e.preventDefault();
    updateDisputemutation.mutate({
      url: `disputes/updatesingledispute/${disputeId}/item/${id}`,
      method: "PATCH",
      info: { Status: "resolved" },
    });
  };

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!item) return <p>No data found for this dispute.</p>;

  return (
    <div className="dispute-details-container">
      <h1>Dispute Details</h1>

      {/* ITEM SUMMARY */}
      <div className="item-summary">
        <img src={item.Imageurl} alt={item.ItemName} className="item-img" />
        <div className="foundby-info">
          <h2>{item.ItemName}</h2>
          <div className="foundby-details">
            <img
              src={
                item.Foundby?.ProfileImg?.trim()
                  ? item.Foundby.ProfileImg
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Finder"
              className="profile-img"
            />
            <div>
              <p>
                Found by: {item.Foundby?.Firstname} {item.Foundby?.Surname}
              </p>
              <p>{item.Foundby?.Email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CLAIMS */}
      <div className="claims-section">
        <h3>Claims</h3>
        {item.Claims?.length === 0 && <p>No claims found.</p>}
        {item.Claims?.map((claim) => (
          <div key={claim._id} className="claim-card">
            <img
              src={
                claim.User?.ProfileImg?.trim()
                  ? claim.User.ProfileImg
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User"
              className="profile-img"
            />
            <div>
              <p>
                <strong>
                  {claim.User?.Firstname} {claim.User?.Surname}
                </strong>
              </p>
              <p>{claim.User?.Email}</p>
              <p>
                Status:{" "}
                <span
                  className={`status-badge ${claim.Status?.trim().toLowerCase()}`}
                >
                  {claim.Status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DISPUTES */}
      <div className="disputes-section">
        <h3>Disputes</h3>
        {item.Disputes?.length === 0 && <p>No disputes raised.</p>}
        {item.Disputes?.map((dispute) => (
          <div key={dispute._id} className="dispute-card">
            <img
              src={
                dispute.Raisedby?.ProfileImg?.trim()
                  ? dispute.Raisedby.ProfileImg
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Raiser"
              className="profile-img"
            />
            <div>
              <p>
                <strong>
                  {dispute.Raisedby?.Firstname} {dispute.Raisedby?.Surname}
                </strong>
              </p>
              <p>{dispute.Raisedby?.Email}</p>
              <p>Reason: {dispute.Reason}</p>
              <p>
                Status:{" "}
                <span
                  className={`status-badge ${
                    dispute.Handledby ? "resolved" : "pending"
                  }`}
                >
                  {dispute.Handledby ? "Resolved" : "Pending"}
                </span>
              </p>
            </div>

            {!dispute.Handledby && (
              <button
                className="resolve-btn"
                onClick={(e) => handleResolveDispute(e, dispute._id)}
                disabled={!followUpSent} // DISABLE IF FOLLOW-UP NOT SENT
              >
                {updateDisputemutation.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : !followUpSent ? (
                  "Send follow-up first"
                ) : (
                  "Mark as Resolved"
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FOLLOW UP MESSAGE FORM */}
      <form onSubmit={handleSendFollowUp} className="message-form">
        <h3>Send Follow-up Message to All Parties</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter follow-up message to claimants, finder, and disputers..."
          rows={3}
        />
        <button type="submit" className="followup-btn">
          {sendFollowUpMutation.isPending ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Send Follow-up"
          )}
        </button>
      </form>
    </div>
  );
};
