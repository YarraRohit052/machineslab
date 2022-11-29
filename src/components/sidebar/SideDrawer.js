import "./SideDrawer.css";
import {Drawer} from "react-rainbow-components";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";

const Experiments=[
    {id:"1", name:"Experiment 1"},
    {id:"2", name:"Experiment 2"},
    {id:"3", name:"Experiment 3"},
    {id:"4", name:"Experiment 4"},
    {id:"5", name:"Experiment 5"},
    {id:"6", name:"Experiment 6"},
    {id:"7", name:"Experiment 7"},
    {id:"8", name:"Experiment 8"},
    {id:"9", name:"Experiment 9"},
    {id:"10", name:"Experiment 10"}
];  
const SideDrawer=(props)=>{
    const [isOpen, setIsopen]=useState(false);

    const SideDrawerCloser=()=>{
        setIsopen(false);
    }

    const expHandler=(id,ename)=>{
            //console.log(id);
            props.expreceiver({id,ename});
    }

    useEffect(()=>{
        setIsopen(props.hamburgerstate);
    },[props.hamburgerstate]);

    let menuitems=Experiments.map((v,i)=>{
        return <MenuItem key={v.id} id={v.id} ename={v.name} expclick={expHandler} drawercloser={SideDrawerCloser}/>
    });
    return(
        <div className="side__drawer__container">
            <Drawer
            id="experiments"
            header="Experiments"
            isOpen={isOpen}
            className="side__drawer"
            onRequestClose={SideDrawerCloser}
        >
            <div className="menu__items__container">
                {menuitems}
            </div>
            </Drawer>
        </div>
    );
}

export default SideDrawer;