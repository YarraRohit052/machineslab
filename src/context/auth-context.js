import { createContext } from "react";

export const AuthContext=createContext({
    name:null,
    rollno:null,
    token:null,
    login:()=>{},
    logout:()=>{}
});