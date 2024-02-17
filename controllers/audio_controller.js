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

async function text_audio(req, res) {
    const { userinput } = req.body;

    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "fable",
            input: userinput,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());

        // Set the response headers to indicate the content type and attachment
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'attachment; filename=speech.mp3');

        // Send the buffer as the response
        res.end(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating MP3 file" });
    }
}

module.exports = {
    text_audio,
}