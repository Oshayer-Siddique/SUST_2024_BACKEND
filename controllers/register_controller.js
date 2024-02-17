const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const User = require("../models/user");

async function register(req, res,next) {
  const { username, password, email } = req.body;

  try {
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(409).json({ error: "Username already taken" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedpassword,
      email,
    });
    await newUser.save();
    const token = jwt.sign({ username:username }, process.env.secret_key, {
        expiresIn: "1h",
      });

      res.send("Registration successful");
      next();


  } catch (error) {
    res.status(500).json({ error: "An error occured" });

  }
}



module.exports = {
    register,
}