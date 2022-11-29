import "./CustomModal.css";
import { Modal } from "react-rainbow-components";
import {useContext, useEffect, useState } from "react";
import CustomChart from "./CustomChart";
import {AuthContext} from "../../context/auth-context";

const CustomModal = (props) => {
    const [isOpen, setIsopen] = useState(false);
    const [header, setHeader] = useState();
    const [color, setColor] = useState();
    const [ylabel,setYlabel] = useState();
    const[xdata,setXdata]=useState();
    const[ydata,setYdata]=useState();
    const auth=useContext(AuthContext);
   

    const closeModalHandler = () => {
        setIsopen(false);
    }

    useEffect(() => {
        if (props.isopen !== undefined) {
            setIsopen(true);
        }
    }, [props.isopen]);

    useEffect(()=>{
        let chartTitle,outputpower=[],speed=[],efficiency=[],current=[],torque=[];
        if (props.data){
            if(props.data.length>0){
                props.data.map((v,i)=>{
                    outputpower.push(v.outputpower);
                    speed.push(v.speed);
                    efficiency.push(v.efficiency);
                    current.push(v.current);
                    torque.push(v.torque);
                })
            }
        }
        setXdata(outputpower);
        if(props.chartno===1){
            chartTitle="Output Power Vs Speed"
            setColor("#ff6347");
            setYlabel("Speed (rpm)");
            setYdata(speed);
        }
        else if(props.chartno===2){
            chartTitle="Output Power Vs Efficiency"
            setColor("#191970");
            setYlabel("Efficiency (%)");
            setYdata(efficiency);
        }
        else if(props.chartno===3){
            chartTitle="Output Power Vs Armature Current"
            setColor("#256314");
            setYlabel("Current (A)");
            setYdata(current);
        }
        else if(props.chartno===4){
            chartTitle="Output Power Vs Torque"
            setColor("#8b008b");
            setYlabel("Torque (Nm)");
            setYdata(torque);
        }
        const mheader="Experiment"+props.expno+chartTitle+"RollNo:"+auth.rollno+"Name:"+auth.name;
        setHeader(mheader);
    },[props.chartno,props.expno,props.data]);

    return (
        <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModalHandler}
                title={header}
                className=" custom_modal"
            >
                <CustomChart title={header} color={color} ylabel={ylabel} xdata={xdata} ydata={ydata}/>
            </Modal>
        </div>
    );
}

export default CustomModal;