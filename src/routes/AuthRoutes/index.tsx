import { Routes, Route } from "react-router-dom";

import LogIn from "../../pages/auth/LogIn";
import ForgotPass from "../../pages/auth/ForgotPass";
import VerifyEmail from "../../pages/auth/VerifyEmail";
import ErrorPage from "../../pages/auth/ErrorPage";
import SignUp from "../../pages/auth/SignUp";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/ForgotPass" element={<ForgotPass />} />
      <Route path="/VerifyEmail" element={<VerifyEmail />} />
      <Route path="/SignUp" element={<SignUp />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
