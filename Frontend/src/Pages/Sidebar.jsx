import { Bell, Box, ClipboardList, Home, BarChart2 } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomQuery } from "../Customhooks/useQuery";
import useCustommutation from "../Customhooks/useMutation";
import { useLoginStore } from "../Stores/useLoginStore";
import { useSocketStore } from "../Stores/useSocketStore";
import { toast } from "react-hot-toast";
import "../css/Sidebar.css";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const setAuthUser = useLoginStore((state) => state.setauthUser);
  const authuser = useLoginStore((state) => state.authuser);

  const navigate = useNavigate();

  const { data: Notifications } = useCustomQuery(
    `getnotifications`,
    `/notifications/getallNotifications`
  );
  const unreadCount =
    Notifications?.data?.filter((n) => !n.read && n.to === authuser?._id)
      ?.length || 0;

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data.message);
      useSocketStore.getState().disconnect();
      setAuthUser(null);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleLogout = () => {
    US;
    mutation.mutate({
      url: "/auth/logout",
      method: "POST",
    });
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>StrathFind</h2>
        </div>

        <nav className="sidebar-nav">
          {authuser?.Role === "Admin" ? (
            <>
              <Link to="/adminReview" className="nav-item">
                <BarChart2 size={24} className="nav-icon" />
                <span className="nav-text">Review Items</span>
              </Link>
              <Link to="/admin/analytics" className="nav-item">
                <BarChart2 size={24} className="nav-icon" />
                <span className="nav-text">Analytics</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/search" className="nav-item">
                <Home size={24} className="nav-icon" />
                <span className="nav-text">Home</span>
              </Link>
              <Link to="/finderdashboard" className="nav-item">
                <Box size={24} className="nav-icon" />
                <span className="nav-text">My Items</span>
              </Link>
              <Link to="/myclaims" className="nav-item">
                <ClipboardList size={24} className="nav-icon" />
                <span className="nav-text">My Claims</span>
              </Link>
            </>
          )}

          {/* Shared links */}
          <Link to="/notifications" className="nav-item notification-nav">
            <Bell size={24} className="nav-icon" />
            <span className="nav-text">Notifications</span>
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
          </Link>

          <Link to="/profile" className="nav-item">
            <FaRegUser size={20} className="nav-icon" />
            <span className="nav-text">Profile</span>
          </Link>
        </nav>

        <div className="Profile-section">
          <div className="Profile-picture-container">
            {authuser?.ProfileImg ? (
              <img src={authuser.ProfileImg} alt="Profile" />
            ) : (
              <FaRegUser className="profile-pic" size={20} />
            )}
          </div>

          <div className="Profile-name">
            <article>{authuser?.Firstname || "Guest"}</article>
            <article>@{authuser?.Surname?.toLowerCase() || "guest"}</article>
          </div>

          <div
            className="logout-icons"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <TbLogout2 size={22} />
          </div>
        </div>
      </aside>
    </>
  );
};
