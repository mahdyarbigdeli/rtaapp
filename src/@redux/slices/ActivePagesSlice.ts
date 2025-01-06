import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
};

const activePagesSlice = createSlice({
  name: "activePages",
  initialState,
  reducers: {},
});

export const activePagesActions = activePagesSlice.actions;

export default activePagesSlice.reducer;
