import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import SearchTransaction from "./transaction/SearchTransaction";

export default function SearchIndex() {
  return (
    <Routes>
      <Route
        index={true}
        element={<Outlet />}
      />
      <Route
        path='transaction/*'
        element={<SearchTransaction />}
      />
    </Routes>
  );
}
