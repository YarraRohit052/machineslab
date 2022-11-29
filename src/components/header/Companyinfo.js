import { Avatar } from "react-rainbow-components";
import "./Companyinfo.css";
import logo from "../../images/logo.jpg";
import hamburger from "../../images/hamburger.jpg";


const Companyinfo=(props)=>{
    
    return(
        <>
        <div className="hamburger__button__container">
            <img 
             alt="hamburger" 
             className="hamburger__button" 
             src={hamburger} 
             onClick={props.hamburgerclick}
            />
        </div>
        <div className="company__logo__container">
        <Avatar className="company__logo" src={logo}/>
        </div>
        <div className="company__name__container">
        <h4 className="company__name">Electrical Machines Lab</h4> 
        </div>
        </>
    );
};

export default Companyinfo;