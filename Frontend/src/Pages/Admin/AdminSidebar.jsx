import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../Stores/useLoginStore";
import { TbLogout2 } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineInventory2,
  MdOutlineAssignment,
  MdGavel,
  MdPeopleOutline,
} from "react-icons/md";
import "../../css/Sidebar.css";

const tabs = [
  { label: "Dashboard", value: "dashboard", icon: <MdDashboard size={20} /> },
  {
    label: "Found Items",
    value: "items",
    icon: <MdOutlineInventory2 size={20} />,
  },
  { label: "Claims", value: "claims", icon: <MdOutlineAssignment size={20} /> },
  { label: "Disputes", value: "disputes", icon: <MdGavel size={20} /> },
  { label: "Users", value: "users", icon: <MdPeopleOutline size={20} /> },
];

const AdminSidebar = ({ activeTab }) => {
  const navigate = useNavigate();
  const { user, logout } = useLoginStore();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => navigate(`/admin?tab=${tab.value}`)}
              className={`nav-item${
                activeTab === tab.value ? " active" : ""
              }`}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-text">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="Profile-section">
          <div className="Profile-picture-container">
            {user?.ProfileImg ? (
              <img src={user.ProfileImg} alt="Profile" />
            ) : (
              <FaRegUser className="profile-pic" size={20} />
            )}
          </div>
          <div className="Profile-name">
            <article>{user?.Firstname || user?.name || "Admin"}</article>
            <article>@{user?.Surname?.toLowerCase() || "admin"}</article>
          </div>
          <div
            className="logout-icons"
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            <TbLogout2 size={22} />
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
