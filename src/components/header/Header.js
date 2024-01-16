import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import Navigate from "./Navigate";
import { useContext } from "react";
import { LoginContext } from "../useContext";


export default function Header() {
   let accept = useContext(LoginContext)
   let { login, setLogin } = useContext(LoginContext)
   let location = useLocation().pathname
   return (
      <div className='header__wrapper'>
         <div className="header__block">
            <div className="header__container">
               <div className="header__info">
                  <Link style={location == '/nail' ? { color: 'green' } : {}} onClick={() => {
                     if (login) {
                        accept.setMainPage(true)
                     }
                  }} className="header__info__nail" to={'/nail'}>go to nail's page</Link>
                  <Link style={location == '/statistic' ? { color: 'green' } : {}} onClick={() => accept.setMainPage(false)} className="header__info__statistic" to={'/statistic'}>go to statistic</Link>
                  <Link style={location == '/' ? { color: 'green' } : {}} onClick={() => accept.setMainPage(false)} className="header__info__statistic" to={'/'}>go home</Link>
               </div>
               <div className="header__login">
                  <Login></Login>
               </div>
            </div>
         </div>
      </div >
   )
}