const express = require('express')

const router = express.Router();

const {analyzeimage,handwritinganalyzer} = require('../controllers/image_controller');


router.post('/analyze',analyzeimage);
router.post('/handwrite',handwritinganalyzer);

module.exports = router;