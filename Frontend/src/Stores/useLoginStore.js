import { create } from "zustand";
export const useLoginStore = create((set, get) => ({
  Email: "",
  Password: "",

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
}));
