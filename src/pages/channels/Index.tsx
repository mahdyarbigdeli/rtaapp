import { Route, Routes } from "react-router-dom";
import ChannelsLayout from "./layout/layout";
import TransactionsPage from "./snapp/transactions/TransactionsPage";
import AssigineeUser from "./assigne-user/AssigineeUser";
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

      <Route
        path='assignee-user/*'
        element={<AssigineeUser />}
      />
    </Routes>
  );
}
