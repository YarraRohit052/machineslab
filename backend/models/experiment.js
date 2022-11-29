const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const experimentSchema=new Schema(
    {
        voltage:{
            type:Schema.Types.Number,
            required:true
        },
        current:{
            type:Schema.Types.Number,
            required:true
            
        },
        speed:{
            type:Schema.Types.Number,
            required:true
        },
        s1:{
                type:Schema.Types.Number,
                required:true
        },
        s2:{
            type:Schema.Types.Number,
            required:true
        },
        s1_s2:{
            type:Schema.Types.Number,
            required:true
        },
        torque:{
            type:Schema.Types.Number,
            required:true
        },
        inputpower:{
            type:Schema.Types.Number,
            required:true
        },
        outputpower:{
            type:Schema.Types.Number,
            required:true
        },
        efficiency:{
            type:Schema.Types.Number,
            required:true
        },
        exp:{
            type:Schema.Types.Number,
            required:true
        },
        rollno:{
            type:Schema.Types.String,
            required:true
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("experimentdata",experimentSchema);