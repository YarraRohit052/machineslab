import Companyinfo from "./Companyinfo";
import "./Header.css";
import Userinfo from "./Userinfo";
const Header = (props) => {
 
    return(
      <div className="app__bar">
        <div className="company__info__container">
            <Companyinfo hamburgerclick={props.hamburgerclick} />
        </div>
        <div className="header__body__container">
            
        </div>
        <Userinfo logout={props.logout}/>
        </div>
    );
};

export default Header;
