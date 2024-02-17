const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");


const User = require("../models/user");




async function profile(req,res){

    const{username} = req.params;
    const user = await User.findOne({username});


    if(user){
        res.send({user : username});
    }
    else{
        res.send("Failed");
    }

}



async function login(req,res,next){
    const{username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error : "Invalid Username"});
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({error : "Invalid Password"});
            
        }

        const token = jwt.sign({username : username},process.env.secret_key,{
            expiresIn : "1h",

        });

        res.cookie(process.env.COOKIE_NAME,token,{
            httpOnly : true,
            expiresIn : new Date(Date.now() + 10000000),

        });
        
        res.redirect(`/profile/${user.username}`)
        //res.send(token);
        next();

    }
    catch(error){
        res.status(500).json({ error: "An error occured" });
    }

}



function logout(req,res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("Logout Complete")

}




module.exports = {
    login,
    profile,
    logout,
}