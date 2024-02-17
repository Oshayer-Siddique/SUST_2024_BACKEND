const express = require('express')

const router = express.Router();


const{generateText,TranslateText,correctness} = require('../controllers/Generate_text_controller');


router.post('/generate',generateText);
router.post('/translate',TranslateText);
router.post('/compare',correctness);


module.exports = router;
