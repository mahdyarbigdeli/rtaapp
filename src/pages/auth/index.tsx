import { Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";

export default function AuthIndex() {
  return (
    <Routes>
      <Route
        path='login'
        element={<LoginPage />}
      />
    </Routes>
  );
}
