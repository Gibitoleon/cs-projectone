import React, { useEffect, useState } from "react";
import axios from "../../Utils/Fetch";

const ClaimsTab = () => {
  const [claims, setClaims] = useState([]);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/admin/claims", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaims(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/admin/claims/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClaims();
    } catch (err) {}
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Claims Awaiting Review</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {claims.map((claim) => (
          <div key={claim._id} className="bg-white rounded-lg shadow p-4">
            <div className="font-bold text-lg mb-1">{claim.item?.name}</div>
            <div className="text-gray-600 mb-1">Claimant: {claim.user?.name} ({claim.user?.email})</div>
            <div className="text-sm text-gray-500 mb-2">Verification Q: {claim.question}</div>
            <div className="text-sm text-gray-700 mb-2">Answer: {claim.answer}</div>
            <div className="mt-4 flex gap-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                onClick={() => handleAction(claim._id, "approve")}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                onClick={() => handleAction(claim._id, "reject")}
              >
                Reject
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                onClick={() => handleAction(claim._id, "escalate")}
              >
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimsTab;
