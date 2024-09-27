import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
  status: false,
  userData: (() => {
    try {
      const cookieUser = Cookies.get("user");
      return cookieUser ? JSON.parse(cookieUser) : null;
    } catch (error) {
      console.error("Error parsing user from cookies:", error);
      return null;
    }
  })(),
  error: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      console.log("User logged in:", action.payload);
      Cookies.set("user", JSON.stringify(action.payload), { expires: 1 });
    },
    logout: (state) => {
      state.status = false;
      state.userData = null; 
      Cookies.remove("user");
    },
  },
});

export const authUserActions = authSlice.actions;
export default authSlice.reducer;
