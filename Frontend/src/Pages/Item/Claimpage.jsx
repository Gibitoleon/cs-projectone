import { useState } from "react";
import {
  FaWallet,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "../../css/ClaimPage.css";

const ClaimPage = () => {
  const item = {
    id: 1,
    name: "Designer Leather Wallet",
    description:
      "Found in the student lounge with credit cards and ID. Reward offered for return.",
    category: "Wallet",
    locationFound: "Student Center Lounge",
    datePosted: "2023-06-15",
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  };

  const [answers, setAnswers] = useState({
    color: "",
    brand: "",
    contents: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Claim submitted:", answers);
    setIsSubmitted(true);
  };

  return (
    <div className="claim-page-container">
      {/* Header */}
      <div className="claim-header">
        <h1>Claim This Item</h1>
        <p>Please verify you're the owner by answering these questions</p>
      </div>

      {/* Main Content */}
      <div className="claim-content">
        {/* Left Section - Item Details */}
        <div className="claim-item-section">
          <div className="item-image-container">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
          </div>

          <div className="item-details">
            <h2>{item.name}</h2>

            <div className="detail-row">
              <FaWallet className="detail-icon" />
              <span>
                <strong>Category:</strong> {item.category}
              </span>
            </div>

            <div className="detail-row">
              <FaMapMarkerAlt className="detail-icon" />
              <span>
                <strong>Location Found:</strong> {item.locationFound}
              </span>
            </div>

            <div className="detail-row">
              <FaCalendarAlt className="detail-icon" />
              <span>
                <strong>Date Posted:</strong>{" "}
                {new Date(item.datePosted).toLocaleDateString()}
              </span>
            </div>

            <div className="item-description">
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Claim Form */}
        <div className="claim-form-section">
          {isSubmitted ? (
            <div className="success-message">
              <FaCheckCircle className="success-icon" />
              <h3>Claim Submitted Successfully!</h3>
              <p>
                We've received your claim request. Our team will review your
                information and contact you within 24-48 hours.
              </p>
              <button
                className="back-button"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Claim
              </button>
            </div>
          ) : (
            <>
              <h3>Verification Questions</h3>
              <form className="claim-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>What color was the item?</label>
                  <input
                    type="text"
                    name="color"
                    value={answers.color}
                    onChange={handleChange}
                    placeholder="e.g., Brown"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>What brand was the item?</label>
                  <input
                    type="text"
                    name="brand"
                    value={answers.brand}
                    onChange={handleChange}
                    placeholder="e.g., Gucci"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>What items were inside it?</label>
                  <textarea
                    name="contents"
                    value={answers.contents}
                    onChange={handleChange}
                    placeholder="e.g., ID card, credit cards"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Submit Claim
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimPage;
