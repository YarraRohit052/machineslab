import "./LoginScreen.css";
import background from "../images/background.jpg";
import { Card, Avatar, Input, Button } from "react-rainbow-components";
import logo from "../images/logo.jpg";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import config from "../utils/config.json";

const logoStyle = { width: 85, height: 85 };
const inputStyles = {
    width: 300,
};

const LoginScreen = (props) => {
    const [rollno, setRollno] = useState();
    const [password, setPassword] = useState();
    const [message,setMessage] = useState();
    const auth=useContext(AuthContext);

    const rollnoHandler = (e) => {
        setRollno(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const loginHandler = () => {
        const inputs = {
            rollno,
            password
        };
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        };
        fetch(config.SERVER.URL+"/api/users/login", requestOptions)
            .then(async (result) => {
                const data = await result.json();
                console.log(data);
                setMessage(data.message);
                if(data.name){
                    auth.login(data.name,data.rollno,data.token);
                }
            }).catch((err) => {
                console.log(err);
            });
    };

    const movetoSignup=()=>{
        props.componentHandler("signup");
    }
    return (
        <div className="login__screen" style={{ backgroundImage: `url(${background})` }}>
            <div className="rainbow-p-around__large loginbox__center centercard__opacity">
                <Card className="login__card">
                    <div className="logo__container">
                        <Avatar
                            style={logoStyle}
                            src={logo} />
                    </div>
                    <div className="login__text__container">
                        <p className="login__text">Login</p>
                    </div>
                    <div className="rainbow-m-vertical__x-large rainbow-m__auto">
                        <div className="rainbow-align-content__center rainbow-flex__wrap">
                            <Input
                                label="Roll Number"
                                placeholder="Roll Number"
                                type="text"
                                className="rainbow-p-around_medium"
                                style={inputStyles}
                                onChange={rollnoHandler}
                            />

                            <Input
                                label="Password"
                                placeholder="************"
                                type="password"
                                className="rainbow-p-around_medium"
                                style={inputStyles}
                                onChange={passwordHandler}
                            />
                            <div className="login__button__container">
                                <Button
                                    shaded
                                    label="Login"
                                    onClick={loginHandler}
                                    variant="brand"
                                    className="rainbow-m-around_medium"
                                />
                            </div>
                            <p className="error__message">{message}</p>
                            <p className="new__user__link" onClick={movetoSignup}>New User? Click here to Signup</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default LoginScreen;
