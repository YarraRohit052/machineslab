const Experiment = require("../models/experiment");

const expdataHandler=async(req,res,next)=>{
    console.log(req.body);
    const rollno=req.rollno;
    const {voltage, current, speed, s1, s2, diffs1s2, torque, inputpower, outputpower, efficiency, exp}=req.body;
    try{
    const newExpData=new Experiment(
        {
            voltage,
            current,
            speed,
            s1,
            s2,
            s1_s2:diffs1s2,
            torque,
            inputpower,
            outputpower,
            efficiency,
            exp,
            rollno
    }
    );
    await newExpData.save();
}catch(err){
    console.log(err);
}
let expdata;
try{
    expdata = await Experiment.find({exp:exp,rollno:rollno})
}catch(err){
    console.log(err);
}
   return res.status(200).json({
       data:expdata
    });
}

const getexpdata = async(req,res,next)=>{
    const{exp}=req.body;
    const rollno=req.rollno;
    let expdata;
try{
    expdata = await Experiment.find({exp:exp, rollno:rollno});
}catch(err){
    console.log(err);
}
   return res.status(200).json({
       data:expdata
    });

}
const deleterowHandler=async(req,res,next)=>{
    const {row_id,exp}=req.body;
    const rollno=req.rollno;
    //console.log(row_id);
    let expdata;
    try{
        await Experiment.findOneAndDelete({_id:row_id});
    }catch(err){
        console.log(err);
    }try{
        expdata = await Experiment.find({exp:exp, rollno:rollno});
    }catch(err){
        console.log(err);
    }
    return res.status(200).json({
        data:expdata
     });
}
exports.expdataHandler=expdataHandler;
exports.getexpdata=getexpdata;
exports.deleterowHandler=deleterowHandler;