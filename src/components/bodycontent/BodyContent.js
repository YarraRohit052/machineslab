import "./BodyContent.css";
import ExpForm from "./ExpForm";
import ExpTable from "./ExpTable";
import { useContext, useEffect, useState } from "react";
import ExpActions from "./ExpActions";
import CustomModal from "./CustomModal";
import { AuthContext } from "../../context/auth-context";
import config from "../../utils/config.json";
import { Button } from "react-rainbow-components";

const BodyContent = (props) => {
  const [DataTable,setDataTable]=useState([]);
  const [chartno,setChartNo]=useState();
  const [isOpen, setIsOpen]=useState();
  const auth=useContext(AuthContext);
  let convertedData;
  const exp=parseInt(props.expname.split(" ")[1]);
  const deleterowHandler=(row_id)=>{
    //console.log(row_id);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+auth.token
      },
      body:JSON.stringify({row_id,exp})
    };
    fetch(config.SERVER.URL+"/exp/deleterow", requestOptions)
  .then(async(result) => {
    const data=await result.json();
    //console.log(data);
    if(data.data.length>0){
      convertedData=data.data.map((v,i)=>{
        //console.log(v);
        const newobj=v;
        newobj.sno=i+1;
        newobj.deleterow= <Button label="Delete" onClick={()=>deleterowHandler(v._id)} variant="destructive" className="rainbow-m-around_medium" />;
        return newobj;
      });
      setDataTable(convertedData);
    }
      
  }).catch((err)=>{
    console.log(err);
  });
  }

  const formInputsHandler=(inputs)=>{
    let convertedData;
    console.log(inputs);
    convertedData=inputs.map((v,i)=>{
      //console.log(v);
      const newobj=v;
      newobj.sno=i+1;
      newobj.deleterow= <Button label="Delete" onClick={()=>deleterowHandler(v._id)} variant="destructive" className="rainbow-m-around_medium" />;
      return newobj;
    });
    setDataTable(convertedData);
    
  }

  const chartNoHandler=(cno)=>{
    setChartNo(cno);
    setIsOpen(!isOpen);
    //console.log(cno);
  }

  useEffect(()=>{
    

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+auth.token
      },
      body:JSON.stringify({exp})
    };
    
    //fetch("https://mlbackend.onrender.com/exp/getexpdata", requestOptions)
    fetch(config.SERVER.URL+"/exp/getexpdata", requestOptions)
    .then(async(result) => {
      const data=await result.json();
      //console.log(data);
      if(data.data.length>0){
        convertedData=data.data.map((v,i)=>{
          //console.log(v);
          const newobj=v;
          newobj.sno=i+1;
          newobj.deleterow= <Button label="Delete" onClick={()=>deleterowHandler(v._id)} variant="destructive" className="rainbow-m-around_medium" />;
          return newobj;
        });
        setDataTable(convertedData);
      }
        
    }).catch((err)=>{
      console.log(err);
    });
  },[props.expname]);

  return (
  <div className="body__content__container">
    <ExpForm onsubmit={formInputsHandler} expname={props.expname}/>
    <ExpTable datatable={DataTable}/>
    <ExpActions cnohandler={chartNoHandler}/>
    <CustomModal isopen={isOpen} expno={props.expid} chartno={chartno} data={DataTable}/>
  </div>
  );
};

export default BodyContent;
