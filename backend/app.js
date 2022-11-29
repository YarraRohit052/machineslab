const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const app = express();

const Authorization=require("./middlewares/check-auth");

const sensorDataRoutes = require("./routes/sensordataRoutes");
const expDataRoutes = require("./routes/experimentdataRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users",usersRoutes);
app.use("/api", sensorDataRoutes);
app.use("/exp", Authorization, expDataRoutes);

const port=process.env.PORT || 5000;
mongoose
    .connect(
        "mongodb+srv://Rohit:02122002@cluster0.ve8vowi.mongodb.net/iotcourse?retryWrites=true&w=majority"
)
.then((result) => {
    console.log("app is running...");
    app.listen(port);
  }).catch((err)=>{
    console.log(err);
  });