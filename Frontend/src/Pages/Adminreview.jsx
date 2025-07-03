import { useState } from "react";
import AdminItemCard from "../Components/AdminItemCard";
import "../css/LostItempage.css";
import { useCustomQuery } from "../Customhooks/useQuery";
import useProgressBar from "../Customhooks/useProgressbar";

const statusFilters = [
  "all",
  "approved",
  "pending",
  "rejected",
  "disputes",
  "Escalated",
];

const AdminItemsPage = () => {
  useProgressBar();
  const [filter, setFilter] = useState("all");
  const queryParams = () => {
    if (filter === "all") return "";
    if (filter === "disputes") return "?hasDisputes=true";
    if (filter === "Escalated") return "?isEscalated=true";
    return `?Status=${filter}`;
  };

  const {
    data: AdminItems,
    isFetching,
    error,
  } = useCustomQuery(
    ["AdminItems", filter],
    `items/getallitemsforadmin${queryParams()}`
  );
  console.log(AdminItems);

  return (
    <div className="lost-items-container">
      <div className="results-header">
        <h2>
          Manage Uploaded Items <span>{AdminItems?.data?.length} items</span>
        </h2>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              backgroundColor: filter === status ? "#2563eb" : "white",
              color: filter === status ? "white" : "#1e293b",
              border: "1px solid #d1d5db",
              fontSize: "0.9rem",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {AdminItems?.data?.map((item) => (
          <AdminItemCard key={item._id} item={item} currentFilter={filter} />
        ))}
      </div>
    </div>
  );
};

export default AdminItemsPage;
