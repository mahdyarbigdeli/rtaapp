import { Route, Routes } from "react-router-dom";
import ChannelsLayout from "./layout/layout";
import TransactionsPage from "./snapp/transactions/TransactionsPage";
import AssigineeUser from "./assigne-user/AssigineeUser";
import MiniPayTransaction from "./mini-pay/transaction/new/MiniPayTransaction";
import MiniPayLayout from "./mini-pay/layout/MiniPayLayout";
import MiniPayCancelTransaction from "./mini-pay/transaction/cancel/Cancel";
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
        path='mini-pay/*'
        element={<MiniPayLayout />}>
        <Route
          index
          element={<MiniPayTransaction />}
        />
        <Route
          index
          path='transaction/new/*'
          element={<MiniPayTransaction />}
        />
        <Route
          index
          path='transaction/cancel/*'
          element={<MiniPayCancelTransaction />}
        />
      </Route>

      <Route
        path='assignee-user/*'
        element={<AssigineeUser />}
      />
    </Routes>
  );
}
