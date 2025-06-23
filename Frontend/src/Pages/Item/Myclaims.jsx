import { useState } from "react";
import "../../css/Myclaims.css";

const sampleClaims = [
  {
    id: 1,
    itemName: "Designer Leather Wallet",
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Approved",
    answers: {
      "What color was the item?": "Brown",
      "What brand was the item?": "Gucci",
    },
  },
  {
    id: 2,
    itemName: "Ray-Ban Sunglasses",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Rejected",
    answers: {
      "What color was the item?": "Black",
      "What brand was the item?": "Ray-Ban",
    },
  },
  {
    id: 3,
    itemName: "USB Flash Drive",
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Pending",
    answers: {
      "What brand was the item?": "SanDisk",
    },
  },
];

const ClaimsPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [disputes, setDisputes] = useState({});
  const [showDisputeForm, setShowDisputeForm] = useState(null);
  const [disputeText, setDisputeText] = useState("");

  const handleDisputeSubmit = (id) => {
    setDisputes({ ...disputes, [id]: disputeText });
    setDisputeText("");
    setShowDisputeForm(null);
  };

  const filteredClaims =
    statusFilter === "All"
      ? sampleClaims
      : sampleClaims.filter((claim) => claim.status === statusFilter);

  return (
    <div className="claims-page">
      <h2>📋 My Claims</h2>
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

      <div className="claims-list">
        {filteredClaims.map((claim) => (
          <div key={claim.id} className="claim-card">
            <img
              src={claim.imageUrl}
              alt={claim.itemName}
              className="item-img"
            />
            <div className="claim-info">
              <h3>{claim.itemName}</h3>
              <span className={`claim-status ${claim.status.toLowerCase()}`}>
                {claim.status}
              </span>
              <div className="answers">
                {Object.entries(claim.answers).map(([q, a], i) => (
                  <p key={i}>
                    <strong>{q}</strong>: {a}
                  </p>
                ))}
              </div>

              {claim.status === "Rejected" && !disputes[claim.id] && (
                <>
                  <button
                    className="dispute-btn"
                    onClick={() => setShowDisputeForm(claim.id)}
                  >
                    Raise Dispute
                  </button>
                  {showDisputeForm === claim.id && (
                    <div className="dispute-form">
                      <textarea
                        placeholder="Describe your dispute"
                        value={disputeText}
                        onChange={(e) => setDisputeText(e.target.value)}
                      ></textarea>
                      <button
                        onClick={() => handleDisputeSubmit(claim.id)}
                        className="submit-dispute-btn"
                      >
                        Submit Dispute
                      </button>
                    </div>
                  )}
                </>
              )}

              {disputes[claim.id] && (
                <div className="dispute-display">
                  <strong>Your Dispute:</strong> {disputes[claim.id]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimsPage;
