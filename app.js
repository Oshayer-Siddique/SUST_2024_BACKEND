// // Importing required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const csv = require('csv-parser');
// const fs = require('fs');

// const mongoose = require("mongoose");

// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const multer = require('multer');
// const path = require('path');
// const dotenv = require('dotenv');
// const cors = require('cors');

// //const bodyParser = require('body-parser');

// // Creating an Express application

// const app = express();

// dotenv.config();

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));


// const mongourl = process.env.DB;




// mongoose
//   .connect(mongourl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });



// // Define a route for the root path '/'
// app.get('/', (req, res) => {
//     res.send('Hello, Sahil!');
//   });


// // Define a schema
// // Define a schema
// const yourSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//   });
  
//   // Create a model based on the schema
//   const YourModel = mongoose.model('YourModel', yourSchema); // replace with your model name
  
//   app.post('/insertData', (req, res) => {
//     const dataToInsert = req.body;
  
//     // Create an instance of the model with the data
//     const newData = new YourModel(dataToInsert);
  
//     // Save data to MongoDB using promises
//     newData.save()
//       .then(result => {
//         console.log('Data saved successfully:', result);
//         res.status(201).send('Data saved successfully');
//       })
//       .catch(err => {
//         console.error('Error saving data:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });



//   app.get('/getData', async (req, res) => {
//     try {
//       // Find all documents in the collection
//       const allData = await YourModel.find();
  
//       // Send the data as a response
//       res.status(200).json(allData);
//     } catch (error) {
//       console.error('Error retrieving data:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });


  



// app.listen(process.env.port,()=> {
//     console.log(`server listening on port ${process.env.port}`)
// })

// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey : "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"
// });

// const prmpt = "A robot contemplating life";

// async function main() {
//   const image = await openai.images.generate({ prompt: prmpt });

//   console.log(image.data);
// }
// main();


const  GoogleGenerativeAI  = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAxaUZaOqxmckzdkZ4oGnJB8ADTClPs6BY");

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Write a story about a hero"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();