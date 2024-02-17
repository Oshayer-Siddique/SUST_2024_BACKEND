const express = require('express')

const router = express.Router();


const{text_audio} = require('../controllers/audio_controller');

router.post('/txtaudio',text_audio);


module.exports = router;