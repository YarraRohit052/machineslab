const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
const signupHandler = async (req, res, next) => {
    const { name, rollno, password, secretkey } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Input Validation Failed!",
        });
    }
    if (secretkey !== '123aes456') {
        return res.status(401).json({
            message: "Invalid Secret Key",
        });
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error!",
        });
    }
    let userExists = false;

    try {
        const userdata = await User.find({ rollno: rollno });
        if (userdata.length != 0) {
            userExists = true;
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error!",
        });
    }
    if (userExists) {
        return res.status(401).json({
            message: "User Already Exists!",
        });
    }
    const newUser = new User({
        name,
        rollno,
        password: hashedPassword
    });

    try {
        newUser.save();
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error!",
        });

    }
    return res.status(200).json({
        message: "User Created successfully"
    });

};
const loginHandler = async (req, res, next) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Input Validation Failed!",
        });
    }
    const { rollno, password } = req.body;
    let existinguser = [];
    try {
        existinguser = await User.find({ rollno });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error!",
        });
    }
    if (existinguser.length === 0) {
        return res.status(401).json({
            message: "Invalid Roll Number",
        });
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existinguser[0].password);
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error!",
        });
    }
    if(!isValidPassword){
        return res.status(401).json({
            message:"Invalid Password",
        })
    }
    let token;
    try{
        token=jwt.sign({
            name:existinguser[0].name,
            rollno
        },"mysecret",
        {expiresIn:"1h"});
    }catch (err) {
        return res.status(500).json({
            message: "Internal Server Error!",
        });
    }
    return res.status(200).json({
        name:existinguser[0].name,
        rollno,
        token,
        message: "Login successfully"
    });
};

exports.signupHandler = signupHandler;
exports.loginHandler = loginHandler;