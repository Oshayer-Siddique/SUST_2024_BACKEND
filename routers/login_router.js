const express = require('express')

const router = express.Router();

const{login,profile,logout} = require('../controllers/login_controller');
const CheckLogin = require('../middlewares/checklogin');




router.post('/login',login);
router.get('/profile/:username', profile);
router.delete('/logout',logout)

module.exports = router;