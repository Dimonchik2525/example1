import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import MainRouter from "./components/MainRouter";
import { useState } from "react";
import { LoginContext } from "./components/useContext";
import Navigate from "./components/header/Navigate";


function App() {

   let [login, setLogin] = useState(false)
   let [mainPage, setMainPage] = useState(false)


   return (
      <LoginContext.Provider value={{
         login,
         setLogin,
         mainPage,
         setMainPage,
      }}>
         <BrowserRouter>
            <Header></Header>
            {mainPage ? <Navigate /> : ''}
            <MainRouter></MainRouter>
         </BrowserRouter>
      </LoginContext.Provider>
   );
}

export default App;
