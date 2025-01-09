import { Route, Routes } from "react-router-dom";
import CreateUser from "./create/Create";
import UsersList from "./list/list";

export default function UsersIndex() {
  return (
    <Routes>
      <Route
        path='create'
        element={<CreateUser />}
      />
      <Route
        path='list'
        element={<UsersList />}
      />
    </Routes>
  );
}
