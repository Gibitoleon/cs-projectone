import React, { useEffect, useState } from "react";
import axios from "../../Utils/Fetch";

const DisputesTab = () => {
  const [disputes, setDisputes] = useState([]);
  const [decision, setDecision] = useState({});
  const [comment, setComment] = useState({});

  const fetchDisputes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/admin/disputes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDisputes(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/admin/disputes/${id}/resolve`,
        { decision: decision[id], comment: comment[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDisputes();
    } catch (err) {}
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Disputes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {disputes.map((dispute) => (
          <div key={dispute._id} className="bg-white rounded-lg shadow p-4">
            <div className="font-bold text-lg mb-1">Claimant: {dispute.user?.name} ({dispute.user?.email})</div>
            <div className="text-gray-600 mb-1">Evidence: {dispute.evidenceText}</div>
            {dispute.evidenceUrl && (
              <img src={dispute.evidenceUrl} alt="Evidence" className="w-32 h-32 object-cover rounded mb-2" />
            )}
            <div className="mt-2">
              <select
                className="border rounded px-2 py-1 mr-2"
                value={decision[dispute._id] || ""}
                onChange={(e) => setDecision({ ...decision, [dispute._id]: e.target.value })}
              >
                <option value="">Final Decision</option>
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
              </select>
              <input
                type="text"
                className="border rounded px-2 py-1 mr-2"
                placeholder="Optional comment"
                value={comment[dispute._id] || ""}
                onChange={(e) => setComment({ ...comment, [dispute._id]: e.target.value })}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                onClick={() => handleResolve(dispute._id)}
                disabled={!decision[dispute._id]}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputesTab;
