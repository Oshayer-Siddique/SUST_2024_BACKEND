const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    username: {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        required : true,
    }
})


const People = mongoose.model("People",peopleSchema);

module.exports = People;