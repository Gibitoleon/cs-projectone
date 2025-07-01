import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoginStore = create(
  persist(
    (set, get) => ({
      Email: "",
      Password: "",
      authuser: null,
      user: null,

      setauthUser: (user) => set({ authuser: user }),
      setUser: (user) => set({ user }),

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
        window.location.href = "/login";
      },

      setField: (key, value) => set({ [key]: value }),
      getLoginData: () => {
        const state = get();
        return {
          Email: state.Email,
          Password: state.Password,
        };
      },
      handleChange: (e) => {
        get().setField(e.target.name, e.target.value);
      },
    }),
    {
      name: "auth-user", // 🔐 localStorage key
      partialize: (state) => ({
        authuser: state.authuser, // only persist this
      }),
    }
  )
);
