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
  apiKey: process.env.OPENAI_API_KEY_GPT4
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

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  // Sets file(s) to be saved in uploads folder in same directory
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
  // Sets saved filename(s) to be original filename(s)
})

// Set saved storage options:
const upload = multer({ storage: storage })

app.use(cors())
app.post("/analyzeAudio", upload.array("files"), async (req, res) => {
  // Sets multer to intercept files named "files" on uploaded form data

  let audio = req.files[0];
  if (!(audio.mimetype.includes('audio'))) {
    fs.unlink(audio.path, (err) => {
      if (err) {
        console.error(err)
      }
    })
    res.json({ message: "File(s) must be an audio" });
  }
  else {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audio.path),
      model: "whisper-1",
      response_format: "verbose_json",
    });

    let reply = transcription.text;


    fs.unlink(audio.path, (err) => {
      if (err) {
        console.error(err)
      }
    })
    console.log(reply);
    res.json({ message: "File(s) uploaded successfully", description: reply });
  }

});




const generateTextRouter = require('./routers/Generate_text_router');
const imageRouter = require('./routers/imagerouter');


app.use('/', generateTextRouter);
app.use('/', imageRouter);





app.listen(process.env.port, () => {
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