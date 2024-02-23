import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./components/layout";
import Quests from "./components/quests";
import Authorize from "./routes/authorize";
import AllQuests from "./routes/all-quests";
import UserQuests from "./routes/user-quests";
import PersistLogin from "./routes/persistLogin";
import RequireAuth from "./routes/requireAuth";
import ErrorPage from "./components/error-page";
import { AuthProvider } from "./context/authProvider";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Authorize />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="quests" element={<Quests />}>
              <Route path="all-quests" element={<AllQuests />} />
              <Route path="user-quests" element={<UserQuests />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
