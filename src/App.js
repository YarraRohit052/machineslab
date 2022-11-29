import "./App.css";
import LoginScreen from "./pages/LoginScreen";
import Dashboard from "./pages/Dashboard";
import { useCallback, useEffect, useState } from "react";
import SignupScreen from "./pages/SignupScreen";
import { AuthContext } from "./context/auth-context";




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [component, setComponent] = useState('login');
  const [name, setName] = useState();
  const [rollno, setRollno] = useState();
  const [token, setToken] = useState();
  const [tokenExp, setTokenExp] = useState();


  let logouttimer
  const login = useCallback((name, rollno, token, expirationDate) => {
    setName(name);
    setRollno(rollno);
    setToken(token);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() +1000 * 60 * 60 );
    setTokenExp(tokenExpirationDate);
    localStorage.setItem("userData", JSON.stringify({
      name: name,
      rollno: rollno,
      token: token,
      expiration: tokenExpirationDate.toISOString()
    })
  );
  }, []);


  const logout = useCallback(()=>{
    setName(null);
    setRollno(null);
    setToken(null);
    setTokenExp(null);
    setComponent("login");
    localStorage.removeItem("userData");
  },[]);

  useEffect(()=>{
    if(token&&tokenExp){
      const remainingTime=tokenExp.getTime()-new Date().getTime();
      logouttimer=setTimeout(logout,remainingTime);
    }else{
      clearTimeout(logouttimer);
    }
  },[token,logout,tokenExp]);

  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem("userData"));
    if(storedData && storedData.token && new Date(storedData.expiration)>new Date()){
      login(
        storedData.name,
        storedData.rollno,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  },[login]);


  const componentHandler = (componentName) => {
    setComponent(componentName);
  };
useEffect(()=>{
  if(name&&rollno&&token&&tokenExp){
    setComponent("dashboard");
  }
},[name,rollno,token,tokenExp]);
 
  return (
    <div className="App">
      <AuthContext.Provider value={{
        name: name,
        rollno: rollno,
        token: token,
        login: login,
        logout: logout,
      }}>
        {component === "login" ?( <LoginScreen componentHandler={componentHandler} />) : null}
        {component === "signup" ? (<SignupScreen componentHandler={componentHandler} /> ): null}
        {component === "dashboard" ?( <Dashboard componentHandler={componentHandler} /> ): null}
      </AuthContext.Provider>
    </div>
  );
};
export default App;
