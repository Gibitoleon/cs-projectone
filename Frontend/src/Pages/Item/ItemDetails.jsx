import { useParams } from "react-router-dom";
import { useState } from "react";
import "../../css/details.css";

const sampleClaimsData = {
  1: [
    {
      claimant: "John Doe",
      status: "Under Review",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      answers: {
        "What color was the item?": "Brown",
        "What brand was the item?": "Gucci",
        "What items were inside it?": "ID card, credit cards",
      },
    },
  ],
};

const sampleItems = [
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
  },
];

const ItemDetailsPage = () => {
  const { itemId } = useParams();
  const item = sampleItems.find((i) => i.id === parseInt(itemId));
  const claims = sampleClaimsData[itemId] || [];

  const [questions, setQuestions] = useState([""]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleAddQuestion = () => setQuestions([...questions, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuestions(questions.filter((q) => q.trim()));
    setQuestions([""]);
  };

  if (!item) return <div className="item-details-page">Item not found.</div>;

  return (
    <div className="item-details-page">
      <div className="item-header side-by-side">
        <img src={item.imageUrl} alt={item.name} />
        <div className="item-info">
          <h1>{item.name}</h1>
          <p className="meta">{item.description}</p>
          <p className="meta">Category: {item.category}</p>
          <p className="meta">Found: {item.locationFound}</p>
          <p className="meta">Date Posted: {item.datePosted}</p>
          <span className={`status-badge ${item.status.toLowerCase()}`}>
            {item.status}
          </span>

          {item.status === "Approved" && (
            <div className="verification-section-inline">
              <h3>🛡️ Set Verification Questions</h3>
              <form onSubmit={handleSubmit}>
                {questions.map((q, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Question ${i + 1}`}
                    value={q}
                    onChange={(e) => handleQuestionChange(i, e.target.value)}
                    required
                  />
                ))}
                <button type="button" onClick={handleAddQuestion}>
                  ➕ Add Another Question
                </button>
                <button type="submit">✅ Submit</button>
              </form>
              {submittedQuestions.length > 0 && (
                <div className="verification-questions-display">
                  <h4>✔️ Submitted Questions:</h4>
                  <ul>
                    {submittedQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="claims-section">
        <h2>Claims on this Item</h2>
        {claims.length === 0 ? (
          <p>No claims yet.</p>
        ) : (
          claims.map((claim, index) => (
            <div className="claim-card" key={index}>
              <div className="claimant-info">
                <img
                  src={claim.profileImage}
                  alt={claim.claimant}
                  className="claimant-img"
                />
                <strong>{claim.claimant}</strong>
                <span
                  className={`claim-status ${claim.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {claim.status}
                </span>
              </div>
              <div className="answers">
                {Object.entries(claim.answers).map(([question, answer], i) => (
                  <p key={i}>
                    <strong>{question}</strong>: {answer}
                  </p>
                ))}
              </div>
              <div className="action-buttons">
                <button className="approve-btn">Approve</button>
                <button className="reject-btn">Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
      {item.status === "Approved" && claims.length > 0 && (
        <div className="escalate-section">
          <h3>Need more time?</h3>
          <p>
            If you're unable to decide based on the current claims, you can
            escalate this item for further review.
          </p>
          <button
            className="escalate-btn"
            onClick={() => alert("Item escalated for further review")}
          >
            🚨 Escalate Item
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemDetailsPage;
