import { createSlice } from "@reduxjs/toolkit";

const PageMetaSlice = createSlice({
  name: "PageMeta",
  initialState: {
    title: "خانه",
  },
  reducers: {
    setPageMeta: (state: any, { payload }) => {
      return payload;
    },
  },
});

export const { setPageMeta } = PageMetaSlice.actions;

export default PageMetaSlice.reducer;
