const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const usersController = require("../controllers/usersController");

router.post(
    "/signup",
    body('name').isLength({min:4}),
    body("rollno").toUpperCase().isLength({min:10}),
    body("password").isLength({min:8}),
    usersController.signupHandler
    );

    router.post(
        "/login",
        body("rollno").toUpperCase().isLength({ min: 6 }),
        body("password").isLength({min:8}),
        usersController.loginHandler
    );

    router.post("/login",)

    module.exports=router;