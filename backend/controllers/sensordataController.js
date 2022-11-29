const SensorData = require("../models/sensordata");


const sensordataHandler = async (req, res, next) => {
    const { voltage, current, speed } = req.body;
    let exists = false, sensordata;
    try {
        sensordata = await SensorData.find();
        if (sensordata.length == 1) {
            exists = true;
        }
        //console.log(sensordata);
    } catch (err) {
        console.log(err);
       return res.status(500).json({
            message: "Updating Data Failed!!",
        });
    }

    if (exists) {
        const result = await SensorData.findOneAndUpdate(
            { _id: sensordata[0]._id },
            {
                voltage: voltage,
                current: current,
                speed: speed
            }
        );
    }
    else {
        try {
            const newSensorData = new SensorData({
                voltage: voltage,
                current: current,
                speed: speed
            });
            await newSensorData.save();
        } catch (err) {
            console.log(err);
           return res.status(500).json({
                message: "Updating Data Failed!!",
            });
        }
    }

   return res.status(200).json({
        message: "Data Updated successfully!!",
    });
};

const addHours=(numofHours, date = new Date())=>{
    date.setTime(date.getTime() + numofHours * 60 * 60 * 1000)

    return date;
}

const getdataHandler=async(req,res,next)=>{
    let sensordata,updatedAtnew;
    
    try {
        sensordata = await SensorData.find();
        //console.log(sensordata);
    } catch (err) {
        console.log(err);
       return res.status(500).json({
            message: "Getting Data Failed!!",
        });
    }
    if(sensordata.length==1){
        const updatedAtold=new Date(sensordata[0].updatedAt);
        updatedAtnew = addHours(5.52,updatedAtold);
        //console.log(updatedAtnew);
    }
   return res.status(200).json({
        message: "Get Data successfully!!",
        voltage:sensordata[0].voltage,
        current:sensordata[0].current,
        speed:sensordata[0].speed,
        timestamp:updatedAtnew
    });
}

exports.sensordataHandler = sensordataHandler;
exports.getdataHandler = getdataHandler;