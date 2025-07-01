import { create } from "zustand";
import { persist } from "zustand/middleware";
import { io } from "socket.io-client";
import { useLoginStore } from "./useLoginStore";
import { toast } from "react-hot-toast";
import { queryclient } from "../Utils/queryclient";

export const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,

  connect: () => {
    if (get().socket) return;
    const authuser = useLoginStore.getState().authuser;

    if (!authuser?._id) return;
    const socket = io("http://localhost:4000", {
      withCredentials: true,
      query: {
        userId: authuser?._id,
      },

      reconnection: true,
    });

    // Set up listeners
    socket.off("notifications"); // Remove previous listener if any

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      set({ isConnected: true });
    });

    socket.on("notifications", (data) => {
      console.log(data);
      queryclient.invalidateQueries({ queryKey: ["getnotifications"] });

      toast(`🔔 ${data.message}`, {
        style: {
          background: "#f9fafb", // soft neutral background
          color: "#1f2937", // dark gray text
          border: "1px solid #e5e7eb",
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ isConnected: false });
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
}));
