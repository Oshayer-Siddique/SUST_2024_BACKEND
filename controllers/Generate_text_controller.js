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

    const prompt = `Generate a complete sentence ${inputlanguage} text about random topic with a ${mood} mood in 15 words.`;



    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens : 100,


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
    generatedtxt = response.choices[0].message;
    res.send(generatedtxt);

}


async function TranslateText(req, res) {
    const { userdatatxt, outputlanguage } = req.body;

    const translationPrompt = `Translate the following text: "${userdatatxt}" into ${outputlanguage} language.`;



    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 100,


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
    translatedtxt = response.choices[0].message;
    res.send(translatedtxt);
    //res.send(generatedtxt)
}


// async function correctness(req, res) {
//     const { userinput } = req.body;

//     const comparePrompt = `Compare the following texts: "${translatedtxt}" and  "${userinput}".Are their meaning same? Give incorrect words of ${userinput} sentence in a json format `;
//     const response = await openai.chat.completions.create({
//         model: "gpt-4-vision-preview",
//         max_tokens: 100,

//         messages: [
//             {
//                 role: "user",
//                 content: [
//                     { type: "text", text: comparePrompt },
//                 ],
//             },
//         ],
//     });

//     var answer = response.choices[0].message.content;
//     res.send(answer);


// }

function extractIncorrectWords(response, userInput) {
    // Implement logic to compare the response with the user input
    // Extract and return the list of incorrect words in a JSON format

    // For example, you might want to use a natural language processing library
    // or implement a custom algorithm to compare the words and find differences.

    // Here's a simplified example that assumes space-separated words:
    const responseWords = response.split(' ');
    const userInputWords = userInput.split(' ');

    const incorrectWords = userInputWords.filter(word => !responseWords.includes(word));

    return { incorrectWords };
}




async function correctness(req, res) {
    const { userinput } = req.body;

    const comparePrompt = `Compare the meaning of the following texts: "${translatedtxt}" and "${userinput}". Provide details on any differences, and list the incorrect words in the "${userinput}" sentence.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            max_tokens: 150, // Adjust the max_tokens as needed

            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: comparePrompt },
                    ],
                },
            ],
        });

        const answer = response.choices[0].message.content;

        // Extract incorrect words from the response
        const incorrectWords = extractIncorrectWords(answer, userinput);

        res.json({ answer });
    } catch (error) {
        console.error('Error processing correctness:', error);
        res.status(500).json({ message: "Error processing correctness" });
    }
}










module.exports = {
    generateText,
    TranslateText,
    correctness,
}

