import {Routes, Route} from 'react-router-dom';
import {useAuth} from '../../hooks/auth';

import Dashboard from '../../pages/app/Dashboard';
import CadProfiss from '../../pages/cad/CadProfiss';
import CadGroup from '../../pages/cad/CadGroup';
import CadScale from '../../pages/cad/CadScales';
import CadProfGroup from '../../pages/cad/CadProfGroup';
import Printers from '../../pages/app/Printers';
//import Agenda from "../../pages/app/Agenda";
import ErrorPage from '../../pages/auth/ErrorPage';
/* import CadClient from "../../pages/cad/CadClient";
import Availability from "../../pages/app/Availability";
import CadCustomers from "../../pages/cad/CadCustomers";
import CadUsers from "../../pages/cad/CadUsers";
import CadSpeciality from "../../pages/cad/CadSpeciality";

import CadProfSpec from "../../pages/cad/CadProfSpec";
import ConClient from "../../pages/cad/ConClient"; */

export function AppRoutes() {
   const {
      logged: {level},
   } = useAuth();
   return (
      <Routes>
         {level === 0 && <Route path="/" element={<Dashboard />} />}
         {level === 0 && <Route path="/" element={<Dashboard />} />}
         {level === 1 && <Route path="/" element={<Dashboard />} />}

         <Route path="/CadProfiss" element={<CadProfiss />} />
         <Route path="/Printers" element={<Printers />} />
         <Route path="/CadGroup" element={<CadGroup />} />
         <Route path="/CadScale" element={<CadScale />} />
         <Route path="/CadProfGroup" element={<CadProfGroup />} />
         {/*  <Route path="/Agenda" element={<Agenda />} />
      <Route path="/Availability" element={<Availability />} />
      <Route path="/CadUsers" element={<CadUsers />} />
      <Route path="/CadClient" element={<CadClient />} />
      <Route path="/ConClient" element={<ConClient />} />
      <Route path="/CadSpeciality" element={<CadSpeciality />} />

      <Route path="/CadProfSpec" element={<CadProfSpec />} /> */}

         <Route path="*" element={<ErrorPage />} />
      </Routes>
   );
}
