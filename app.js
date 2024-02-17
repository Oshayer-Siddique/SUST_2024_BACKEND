// Importing required modules
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

//const bodyParser = require('body-parser');

// Creating an Express application

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY_GPT4
});


const mongourl = process.env.DB;




mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });



// Define a route for the root path '/'
app.get('/', (req, res) => {
    res.send('Hello, Oshayer!');
  });




// async function main() {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4-vision-preview",
//     messages: [
//       {
//         role: "user",
//         content: [
//           { type: "text", text: "What’s in this image? give me in one word" },
//           {
//             type: "image_url",
//             image_url: {
//               "url": "https://www.dropbox.com/s/zmeetcz4w902xn0/Maze.png?raw=1",
//             },
//           },
//         ],
//       },
//     ],
//   });
//   console.log(response.choices[0]);
// }
// main();

const generateTextRouter = require('./routers/Generate_text_router');


app.use('/',generateTextRouter);





app.listen(process.env.port,()=> {
    console.log(`server listening on port ${process.env.port}`)
})






// Now you can use the OpenAI library as needed in your application



// const  GoogleGenerativeAI  = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyAxaUZaOqxmckzdkZ4oGnJB8ADTClPs6BY");

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a hero"

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();