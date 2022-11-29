import "./FormInput.css";
import { Input } from "react-rainbow-components";

const FormInput=(props)=>{

    const inputHandler=(e)=>{
        //console.log(e.target.value);
        props.handler(e.target.value);
    }
    return(
        <Input
        label={props.label}
        value={props.value}
        disabled={props.disabled}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto form__inputs"
        onChange={inputHandler}
    />
    );
}

export default FormInput;