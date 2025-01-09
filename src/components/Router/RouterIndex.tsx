import useGlobalStates from "@/@redux/hooks/useGlobalStates";
import AuthIndex from "@/pages/auth";
import ChannelsIndex from "@/pages/channels/Index";
import UsersIndex from "@/pages/users";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SearchIndex from "@/pages/search";

export default function RouterIndex() {
  const { user } = useGlobalStates();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<RootLayout />}>
          <Route
            path='/auth/*'
            element={<AuthIndex />}
          />

          {user.accessToken && (
            <Route
              path='/channels/*'
              element={<ChannelsIndex />}
            />
          )}

          {user.accessToken && (
            <Route
              path='/search/*'
              element={<SearchIndex />}
            />
          )}

          {user?.role === "admin" && (
            <Route
              path='/users/*'
              element={<UsersIndex />}
            />
          )}
        </Route>

        <Route
          path='/'
          element={<Navigate to={"/channels"} />}
        />
      </Routes>

      {!!user.accessToken === false && <Navigate to='/auth/login' />}
    </BrowserRouter>
  );
}
