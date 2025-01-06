import { Route, Routes } from "react-router-dom";
import ChannelsLayout from "./layout/layout";
import TransactionsPage from "./snapp/transactions/TransactionsPage";

export default function ChannelsIndex() {
  return (
    <Routes>
      <Route
        index={true}
        element={<ChannelsLayout />}
      />
      <Route
        path='snapp/*'
        element={<TransactionsPage />}
      />
    </Routes>
  );
}
