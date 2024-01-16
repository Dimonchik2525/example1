import { Route, Routes } from "react-router-dom";
import NailPage from "../pages/NailPage";
import Statistic from "../pages/Statistic";
import { useContext } from "react";
import { LoginContext } from "./useContext";
import ClientPage from "../pages/ClientPage";
import Home from "../pages/Home";


export default function MainRouter() {
   let { login, setLogin } = useContext(LoginContext)
   return (
      <div>
         {login
            ?
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/nail" element={<NailPage />} />
               <Route path="/statistic" element={<Statistic />} />
               <Route path="/nail/:id" element={<ClientPage />} />
            </Routes>
            :
            <div>
               <div className="permission">You dont have permission, please log in</div>
            </div>
         }
      </div >
   )
}