const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Router = express.Router();
require("../schema/userData")
const User = mongoose.model("userData");

//  Router.post('/postData',async (req,res)=>{
//     const {fullName, email, number, password} = req.body;
//     try {
        // await User.create({
        //     fullName,
        //     email,
        //     number,
        //     password
        // })
        // res.send({msg : "acc created"})
//     } catch (error) {
//         console.log("error", error)
//     }
        
// })

module.exports = Router;