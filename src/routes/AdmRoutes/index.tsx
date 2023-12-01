import { Routes, Route } from "react-router-dom";
//import { useAuth } from "../../hooks/auth";

import Dashboard from "../../pages/app/Dashboard";
import ErrorPage from "../../pages/auth/ErrorPage";
/* import CadClient from "../../pages/cad/CadClient";
import Availability from "../../pages/app/Availability";
import CadSpeciality from "../../pages/cad/CadSpeciality";
import CadProfiss from "../../pages/cad/CadProfiss";
import CadProfSpec from "../../pages/cad/CadProfSpec";
import ConClient from "../../pages/cad/ConClient"; */


export function AdmRoutes() {
  //const { logged: { level } } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/*       <Route path="/Availability" element={<Availability />} />
      <Route path="/CadClient" element={<CadClient />} />
      <Route path="/ConClient" element={<ConClient />} />
      <Route path="/CadSpeciality" element={<CadSpeciality />} />
      <Route path="/CadProfiss" element={<CadProfiss />} />
      <Route path="/CadProfSpec" element={<CadProfSpec />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
