import React from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import DashboardTab from "./DashboardTab";
import FoundItemsTab from "./FoundItemsTab";
import ClaimsTab from "./ClaimsTab";
import DisputesTab from "./DisputesTab";
import UsersTab from "./UsersTab";

function getTabComponent(tab) {
  switch (tab) {
    case "items":
      return <FoundItemsTab />;
    case "claims":
      return <ClaimsTab />;
    case "disputes":
      return <DisputesTab />;
    case "users":
      return <UsersTab />;
    default:
      return <DashboardTab />;
  }
}

const AdminDashboard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "dashboard";

  return (
    <div style={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
      <AdminSidebar activeTab={tab} />
      <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
        {getTabComponent(tab)}
      </main>
    </div>
  );
};

export default AdminDashboard;
