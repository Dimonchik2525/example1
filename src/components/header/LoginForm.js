import { useContext, useState } from "react"
import { LoginContext } from "../useContext"


export function LoginForm(props) {
   let [loginState, setLoginState] = useState({ loginInp: '', password: '' })
   let { login, setLogin } = useContext(LoginContext)
   let accept = useContext(LoginContext)
   return (
      <div onClick={(e) => props.setShowLog(false)} className="login__wrapper">
         <div className="login__container">
            <div onClick={(e) => e.stopPropagation()} className="login__content">
               <div className="login__name">
                  <input onChange={(e) => setLoginState({ ...loginState, loginInp: e.target.value })} value={loginState.loginInp} type="text" placeholder="your name" />
               </div>
               <div className="login__password">
                  <input onChange={(e) => setLoginState({ ...loginState, password: e.target.value })} value={loginState.password} type="password" placeholder="your password" />
               </div>
               <div className="login__enter">
                  <button onClick={() => {
                     //accept.setMainPage(true)
                     setLogin(true)
                     props.setShowLog(false)
                  }}>Log in</button>
               </div>
            </div>
         </div>
      </div>
   )
}