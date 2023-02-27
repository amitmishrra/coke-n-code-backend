const express = require("express");
const connection = require("./connection");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("./schema/userData");
const createUser = require("./routes/createUser")
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is running");
});


const User = mongoose.model("userData");
app.post('/postData',async (req,res)=>{
    const {fullName, email, number, password} = req.body;
    try {

        await User.create({
            fullName,
            email,
            number,
            password
        })
        res.send({msg : "acc created"})
    } catch (error) {
        // console.log("error", error);
        res.send({msg : "User Already exists"})
    }
        
})


app.post("/login-user",async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})

    try{
        if(!user){
            return res.send({msg : "User not found"})
        }
        if(user && user.password == password){
            return res.send({msg : "Logged in succesfully"})
        }
    
        if(user && user.password != password){
            return res.send({msg : "Incorrect Password"})
        }
    }catch(e){
        console.log(e)
    }

})

app.get("/getUsers",async (req, res)=>{
    const users = await User.find()
   res.send(users);
})