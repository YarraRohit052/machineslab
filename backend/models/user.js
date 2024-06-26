
const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    rollno:{
        type:String,
        required:true,
        minlength:6,
    },
},
    {timestamps:true}
);


module.exports = mongoose.model("User",userSchema);