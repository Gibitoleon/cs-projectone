import React, { useEffect, useState } from "react";
import axios from "../../Utils/Fetch";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const FoundItemsTab = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/admin/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/admin/items/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (err) {}
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-lg">{item.name}</div>
              <div className="text-gray-600 mb-2">{item.description}</div>
              <div className="text-sm text-gray-500 mb-2">Location: {item.location}</div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status] || "bg-gray-100 text-gray-700"}`}>
                {item.status}
              </span>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                  onClick={() => handleAction(item._id, "approve")}
                  disabled={item.status === "Approved"}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                  onClick={() => handleAction(item._id, "reject")}
                  disabled={item.status === "Rejected"}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItemsTab;
