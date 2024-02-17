const express = require('express')

const router = express.Router();

const {analyzeimage} = require('../controllers/image_controller');


router.post('/analyze',analyzeimage);

module.exports = router;