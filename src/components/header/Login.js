import { useContext, useState } from "react"
import { LoginContext } from "../useContext"
import { LoginForm } from "./LoginForm"
import { Link } from "react-router-dom";



export default function Login() {
   let { login, setLogin } = useContext(LoginContext)
   let [showLog, setShowLog] = useState(false)
   let accept = useContext(LoginContext)
   return (
      showLog
         ?
         <LoginForm setShowLog={setShowLog}></LoginForm>
         :
         <div>
            {login
               ?
               <div style={{ cursor: 'pointer' }} onClick={() => {
                  accept.setMainPage(false)
                  setLogin(false)
               }} className="login__false">Log out</div>
               :
               <Link onClick={() => {
                  accept.setMainPage(false)
                  setShowLog(true)
               }} className="login__false" to={'/'}>Log in</Link>
            }
         </div>
   )
}