import { Route, Routes } from "react-router-dom";
import CreateUser from "./create/Create";

export default function UsersIndex() {
  return (
    <Routes>
      <Route
        path='create'
        element={<CreateUser />}
      />
    </Routes>
  );
}
