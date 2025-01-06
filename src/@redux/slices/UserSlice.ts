import { IUser } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IUser>) => {
      return payload;
    },
    logout: () => {
      return {};
    },
    fetchUser: (state) => {
      return state;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
