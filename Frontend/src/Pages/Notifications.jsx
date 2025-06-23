import { useState } from "react";
import { Bell } from "lucide-react";
import "../css/Notification.css";

const sampleNotifications = [
  {
    id: 1,
    title: "Claim Approved",
    message: "Your claim on 'Designer Leather Wallet' has been approved.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Item Status Update",
    message:
      "Your uploaded item 'Ray-Ban Sunglasses' is now marked as Approved.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 3,
    title: "New Claim Received",
    message: "Someone has submitted a claim on your item 'USB Flash Drive'.",
    timestamp: "3 days ago",
    read: false,
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="notification-page">
      <h2>
        <Bell size={22} style={{ marginRight: 8 }} /> Notifications
      </h2>

      <div className="notifications-list">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`notification-card ${note.read ? "read" : "unread"}`}
            onClick={() => markAsRead(note.id)}
          >
            <h4>{note.title}</h4>
            <p>{note.message}</p>
            <span className="timestamp">{note.timestamp}</span>
            {!note.read && <span className="new-badge">New</span>}
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="empty">No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
