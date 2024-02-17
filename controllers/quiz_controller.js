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

async function quiztest(req, res) {
    //let letter = String.fromCharCode(97 + Math.round(Math.random() * 26));
    let quiz = {
        options: [],
        answer: "",
        ansURL: "",
    };
    let response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Give 4 random examples of a non-living common noun. Answer in one word. Present your answer as a JS Array" },
                ],
            },
        ],
    });

    let replies = response.choices[0].message.content;
    replies = replies.replace('[', '').replace(']', '').replaceAll('"', '').split(', ');
    console.log(replies)
    
    quiz.options = replies;
    quiz.answer = replies[Math.floor(Math.random() * 3)];

    
        response = await openai.images.generate({
            model: "dall-e-2",
            prompt: "a " + quiz.answer + ". Make it cartoonish.",
            n: 1,
            size: "512x512",
        });
        quiz.ansURL = response.data[0].url;
        //console.log(image_url)
    
    res.send(quiz);


}

module.exports = {
    quiztest,
}