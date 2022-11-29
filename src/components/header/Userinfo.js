import { Avatar, ProgressStep } from "react-rainbow-components";
import "./Userinfo.css";
import userlogo from "../../images/user.jpg";
import poweroff from "../../images/poweroff.jpg";
import {useContext} from "react";
import {AuthContext} from "../../context/auth-context";

const Userinfo=(props)=>{
    const auth =useContext(AuthContext);
    const signoutHandler=()=>{
        auth.logout();
    }
    return(
        <div className="user__info__container">
            <div className="user__logo__container">
              <Avatar className="user__logo"  src={userlogo}/>
              
            </div>
            <div className="user__details__container">
                <h4 className="username">{auth.name}</h4>
                <h4 className="role">{auth.rollno}</h4>
            </div>
            <div className="signout__button__container" onClick={signoutHandler}>
             <Avatar className="signout__Button"  src={poweroff} />
            </div>
        </div>
    );
};

export default Userinfo;