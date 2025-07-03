import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Signup } from "./Pages/Auth/Register/Signup";
import { Login } from "./Pages/Auth/Login";
import LostItemsPage from "./Pages/Item/Search";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "./Pages/Sidebar";
import ClaimPage from "./Pages/Item/Claimpage";
import FinderDashboard from "./Pages/Item/Finderdashboard/Finderdashboard";
import ItemDetailsPage from "./Pages/Item/ItemDetails";
import MyClaimsPage from "./Pages/Item/Myclaims";
import ProfilePage from "./Pages/Auth/Profile";
import NotificationPage from "./Pages/Notifications";
import { useLoginStore } from "./Stores/useLoginStore";
import AdminItemsPage from "./Pages/Adminreview";
import { useLocation } from "react-router-dom";

import { AdminItemDetailsPage } from "./Pages/AdminItemDetails";
import { AdminApprovedDetailsPage } from "./Pages/Adminapproved";
import { AdminEscalatedDetailsPage } from "./Pages/Adminescalated";
import { AdminRejectedDetailsPage } from "./Pages/Adminrejected";
import { DisputeDetailsPage } from "./Pages/Admindispute";
import { AdminAnalyticsPage } from "./Pages/Adminanalytics";

import "./App.css";

function App() {
  const authuser = useLoginStore((state) => state.authuser);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/login", "/signup"];
    if (!authuser && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [authuser, navigate, location.pathname]);

  return (
    <div className="app">
      {authuser && <Sidebar />}

      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Shared routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationPage />} />

        {authuser?.Role === "Admin" ? (
          <>
            <Route path="/adminReview" element={<AdminItemsPage />} />
            <Route
              path="/admin/review/:id"
              element={<AdminItemDetailsPage />}
            />
            <Route
              path="/admin/approved/:id"
              element={<AdminApprovedDetailsPage />}
            />
            <Route
              path="/admin/escalated/:id"
              element={<AdminEscalatedDetailsPage />}
            />
            <Route
              path="/admin/rejected/:id"
              element={<AdminRejectedDetailsPage />}
            />
            <Route
              path="/admin/disputes/:id"
              element={<DisputeDetailsPage />}
            />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          </>
        ) : (
          <>
            <Route path="/search" element={<LostItemsPage />} />
            <Route path="/claimpage/:itemId" element={<ClaimPage />} />
            <Route path="/finderdashboard" element={<FinderDashboard />} />
            <Route path="/finder/item/:itemId" element={<ItemDetailsPage />} />
            <Route path="/myclaims" element={<MyClaimsPage />} />
          </>
        )}
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
