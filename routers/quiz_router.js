const express = require('express')

const router = express.Router();

const{ quiztest } = require('../controllers/quiz_controller');

router.get('/quiz',quiztest);


module.exports = router;