import "./ExpForm.css";
import { Card, ProgressStep } from "react-rainbow-components";
import FormInput from "./FormInput";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-rainbow-components";
import { AuthContext } from "../../context/auth-context";
import config from "../../utils/config.json";

const ExpForm = (props) => {
    const [dateTime, setDateTime] = useState();
    const [voltage, setVoltage] = useState();
    const [current, setCurrent] = useState();
    const [armaturecurrent, setArmatureCurrent] = useState();
    const [speed, setSpeed] = useState();
    const [s1, setS1] = useState();
    const [s2, setS2] = useState();
    const [differences1s2, setDifferenceS1S2] = useState(s1 - s2);
    const [torque, setTorque] = useState();
    const [inputpower, setInputPower] = useState();
    const [outputpower, setOutputPower] = useState();
    const [efficiency, setEfficiency] = useState();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const diffs1s2 = s1 - s2;
        setDifferenceS1S2(diffs1s2);
    }, [s1, s2]);

    useEffect(() => {
        const Torque = 9.81 * 0.15 * differences1s2;
        setTorque(Torque);
    }, [differences1s2]);

    useEffect(() => {
        const inputpower = voltage * current;
        setInputPower(inputpower);
    }, [voltage, current]);

    useEffect(() => {
        const outputpower = (2 * 3.14 * speed * torque) / 60;
        setOutputPower(outputpower);
    }, [speed, torque]);

    useEffect(() => {
        const Efficiency = (outputpower / inputpower) * 100;  
        setEfficiency(Efficiency);
    }, [outputpower, inputpower])
   
    const getdataHandler = () => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.token
            },

        };
        console.log(requestOptions);
        fetch(config.SERVER.URL + "/api/sensordata", requestOptions)
            .then(async (result) => {
                const data = await result.json();
                //console.log(data);
                setDateTime(data.timestamp);
                setVoltage(data.voltage);
                setCurrent(data.current);
                setArmatureCurrent(data.armaturecurrent);
                setSpeed(data.speed);
            }).catch((err) => {
                console.log(err);
            });

    }

    const s1Handler = (S1) => {

        setS1(S1);
        //console.log("S1=",s1);
    }

    const s2Handler = (S2) => {

        setS2(S2);
        //console.log("S2=",s2);
    }



    const formSubmitHandler = () => {
        const floats1 = parseFloat(s1);
        const floats2 = parseFloat(s2);
        const exp = parseInt(props.expname.split(" ")[1]);
        const inputs = {
            voltage: parseFloat(voltage),
            current: parseFloat(current),
            armaturecurrent: parseFloat(armaturecurrent),
            speed: parseInt(speed),
            s1: floats1,
            s2: floats2,
            diffs1s2: differences1s2,
            torque: parseFloat(torque),
            inputpower: parseFloat(inputpower),
            outputpower: parseFloat(outputpower),
            efficiency: parseFloat(efficiency),
            exp: exp
        };
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.token
            },
            body: JSON.stringify(inputs)
        };
        let convertedData;
        fetch(config.SERVER.URL + "/exp/postdata", requestOptions)
            .then(async (result) => {
                const data = await result.json();
                //console.log(data);
                if (data.data.length > 0) {
                    convertedData = data.data.map((v, i) => {
                        //console.log(v);
                        const newobj = v;
                        newobj.sno = i + 1;
                        return newobj;
                    });
                    //console.log(convertedData);
                    props.onsubmit(convertedData);
                }

            }).catch((err) => {
                console.log(err);
            });
        //console.log(inputs);

    }

    return (
        <Card className="exp__form__card">
            <div className="exp__name__container">
                <h2>{props.expname}</h2>
            </div>
            <FormInput label={"DateTime"} value={dateTime} disabled={true} />
            <FormInput label={"Voltage (V)"} value={voltage} disabled={true} />
            <FormInput label={"Current (A)"} value={current} disabled={true} />
            <FormInput label={"Armature Current (Am)"} value={armaturecurrent} disabled={true}/>
            <FormInput label={"Speed (RPM)"} value={speed} disabled={true} />
            <FormInput label={"S1"} value={s1} handler={s1Handler} disabled={false} />
            <FormInput label={"S2"} value={s2} handler={s2Handler} disabled={false} />
            <FormInput label={"S1-S2"} value={differences1s2} disabled={true} />
            <FormInput label={"Torque(N-m)"} value={torque} disabled={true} />
            <FormInput label={"Input Power(W)"} value={inputpower} disabled={true} />
            <FormInput label={"Output Power(W)"} value={outputpower} disabled={true} />
            <FormInput label={"Efficiency(%)"} value={efficiency} disabled={true} />

            <div className="form__button__container">
                <Button
                    label="Get Data"
                    onClick={getdataHandler}
                    variant="brand"
                    className="rainbow-m-around_medium"
                />
                <Button
                    label="Insert Data"
                    onClick={formSubmitHandler}
                    variant="success"
                    className="rainbow-m-around_medium"
                />
            </div>
        </Card>
    );
}

export default ExpForm;
