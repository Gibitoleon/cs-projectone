import React, { useEffect, useState } from "react";
import axios from "../../Utils/Fetch";

const statCards = [
  { label: "Total Found Items", key: "items", color: "bg-blue-100 text-blue-700" },
  { label: "Total Claims", key: "claims", color: "bg-green-100 text-green-700" },
  { label: "Open Disputes", key: "disputes", color: "bg-red-100 text-red-700" },
  { label: "Registered Users", key: "users", color: "bg-yellow-100 text-yellow-700" },
];

const DashboardTab = () => {
  const [stats, setStats] = useState({ items: 0, claims: 0, disputes: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        // handle error
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((card) => (
          <div
            key={card.key}
            className={`rounded-lg shadow p-6 flex flex-col items-center ${card.color}`}
          >
            <div className="text-3xl font-bold mb-2">{stats[card.key]}</div>
            <div className="text-lg font-medium">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTab;
