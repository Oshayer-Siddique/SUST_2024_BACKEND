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

let generatedtxt;
let translatedtxt;

async function generateText(req, res) {
    const { inputlanguage, mood } = req.body;

    const prompt = `Generate a complete sentence ${inputlanguage} text about random topic with a ${mood} mood in 50 letters.`;



    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",


        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: prompt },
                ],
            },
        ],
    });
    //console.log(response.choices[0]);
    generatedtxt = response.choices[0].message.content;
    res.send(generatedtxt);

}


async function TranslateText(req, res) {
    const { outputlanguage } = req.body;

    const translationPrompt = `Translate the following text: "${generatedtxt}" into ${outputlanguage} language.`;



    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",


        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: translationPrompt },
                ],
            },
        ],
    });
    //console.log(response.choices[0]);
    translatedtxt = response.choices[0].message.content;
    res.send(translatedtxt);
    //res.send(generatedtxt)
}


async function correctness(req, res) {
    const { userinput } = req.body;

    const comparePrompt = `Compare the following texts: "${translatedtxt}" and  "${userinput}".Why ${userinput} is incorrect?`;
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 100,

        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: comparePrompt },
                ],
            },
        ],
    });

    var answer = response.choices[0].message.content;
    res.send(answer);


}







module.exports = {
    generateText,
    TranslateText,
    correctness,
}

