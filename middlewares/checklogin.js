const jwt = require("jsonwebtoken");





const CheckLogin  = (req,res,next)=>{


        let authorization  = req.cookies[process.env.COOKIE_NAME];


        
        try{
            const decoded = jwt.verify(authorization,process.env.secret_key);
            req.username = decoded;
            next();


        }
        catch(err){

            return res.send("Server Error");

        }


    }
    




module.exports = CheckLogin;