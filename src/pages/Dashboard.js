import Header from "../components/header/Header";
import SideDrawer from "../components/sidebar/SideDrawer";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import BodyContent from "../components/bodycontent/BodyContent";
import DetailsCard from "../components/bodycontent/DetailsCard";


const Dashboard = (props) => {
    const[hamburgerState,setHamburgerState]=useState(false);
    const[expState,setExpState]=useState();
    const[isLoaded,setIsLoaded]=useState(false);
    const[showIntro,setShowIntro]=useState(true);

    const HamburgerClickHandler=()=>{
        setHamburgerState(!hamburgerState);
        //console.log(hamburgerState);
    };
const expReceiver=(exp)=>{
        //console.log(exp);
        setExpState(exp);
    };

    useEffect(()=>{
      if(!expState){
        setShowIntro(true);
      } 
    },[expState]);
    
    return (
    <>
    <Header hamburgerclick={HamburgerClickHandler} logout={props.logout}/>
    <SideDrawer hamburgerstate={hamburgerState} expreceiver={expReceiver}/>
    {!expState && <DetailsCard/>}
    {expState&& expState.id==="1"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="2"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="3"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="4"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="5"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="6"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="7"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="8"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="9"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    {expState&& expState.id==="10"&&<BodyContent expid={expState.id} expname={expState.ename}/>}
    </>
    );
};

   
export default Dashboard;