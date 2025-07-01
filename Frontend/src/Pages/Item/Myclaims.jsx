import { useState } from "react";
import "../../css/Myclaims.css";
import { useCustomQuery } from "../../Customhooks/useQuery";
import useProgressBar from "../../Customhooks/useProgressbar";
import useCustommutation from "../../Customhooks/useMutation";
import { toast } from "react-hot-toast";
import axios from "axios";

const ClaimsPage = () => {
  useProgressBar();
  const [statusFilter, setStatusFilter] = useState("all");
  const [disputes, setDisputes] = useState({});
  const [showDisputeForm, setShowDisputeForm] = useState(null);
  const [disputeText, setDisputeText] = useState("");
  const disputeMutation = useCustommutation({
    onSuccess: async (data) => {
      const { message, createdDispute } = data;
      console.log(createdDispute);

      toast.success(message);
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/disputes/getmydisputes/Item/${createdDispute.Item}/claim/${createdDispute.Claim}`
        );

        const dispute = res.data?.data;
        console.log(dispute);

        setDisputes((prev) => ({
          ...prev,
          [createdDispute.Claim]: dispute?.Reason || "Dispute submitted.",
        }));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch dispute");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const {
    data: myclaims,
    isFetching,
    error,
  } = useCustomQuery(
    ["myclaims", statusFilter],
    `/claims/myclaims${statusFilter !== "all" ? `?Status=${statusFilter}` : ""}`
  );

  console.log(statusFilter);

  const handleDisputeSubmit = (e, claimid, itemid) => {
    e.preventDefault();
    disputeMutation.mutate({
      url: `/disputes/raisedispute/claim/${claimid}/item/${itemid}`,
      method: `POST`,
      info: { Reason: disputeText },
    });
    setDisputeText("");
    setShowDisputeForm(null);
  };

  return (
    <div className="claims-page">
      <h2>📋 My Claims</h2>
      <div className="status-filters">
        {["all", "approved", "pending", "rejected"].map((status) => (
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
        {myclaims?.data?.length === 0 ? (
          <p className="no-claims">
            {statusFilter === "all"
              ? `You havent made claims yet`
              : `You have no ${statusFilter} claims`}
          </p>
        ) : (
          myclaims?.data?.map((claim) => (
            <div key={claim?._id} className="claim-card">
              <img
                src={claim?.Item?.Imageurl}
                alt={claim?.Item?.ItemName}
                className="item-img"
              />
              <div className="claim-info">
                <h3>{claim?.Item?.ItemName}</h3>
                <span className={`status-tag ${claim?.Status}`}>
                  {claim?.Status}
                </span>
                <div className="answers">
                  {claim?.Answers.map((Answer, index) => (
                    <p key={index}>
                      <strong>{Answer?.Question_id?.Questiontext}</strong>:{" "}
                      {Answer?.Answertext}
                    </p>
                  ))}
                </div>

                {claim?.Status === "rejected" && !disputes[claim?._id] && (
                  <>
                    <button
                      className="dispute-btn"
                      onClick={() => setShowDisputeForm(claim?._id)}
                    >
                      Raise Dispute
                    </button>
                    {showDisputeForm === claim?._id && (
                      <div className="dispute-form">
                        <textarea
                          placeholder="Describe your dispute"
                          value={disputeText}
                          onChange={(e) => setDisputeText(e.target.value)}
                        ></textarea>
                        <button
                          onClick={(e) =>
                            handleDisputeSubmit(e, claim?._id, claim?.Item?._id)
                          }
                          className="submit-dispute-btn"
                        >
                          Submit Dispute
                        </button>
                      </div>
                    )}
                  </>
                )}

                {disputes[claim?._id] && (
                  <div className="dispute-display">
                    <strong>Your Dispute:</strong> {disputes[claim?._id]}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClaimsPage;
