const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
const OpenAI = require("openai");
const axios = require('axios');

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_GPT4
});


async function analyzeimage(req,res){
    const { imageurl,language } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `What’s in this image? Describe in 10 words or less in ${language} language.` },
            {
              type: "image_url",
              image_url: {
                "url": imageurl,
              },
            },
          ],
        },
      ],
    });
    let reply = response.choices[0];
  
    console.log(reply);
    res.json({ message: "Image found successfully", description: reply.message.content });

}


module.exports = {
    analyzeimage,
}