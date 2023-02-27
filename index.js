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
app.post('/signup',async (req,res)=>{
    const {fullName, username,  email, number, password} = req.body;
    const mailExists = await User.findOne({email})
    const usernameExists = await User.findOne({username})
    const numberExists = await User.findOne({number})
    if(mailExists){
        return res.send({msg : "User already exists. Please login"})
    }
    if(usernameExists){
        return res.send({msg : "Username already taken. Please try another one"})
    }
    if(numberExists){
        return res.send({msg : "Number already exists. Please try another one"})
    }
    else{
        try {
            await User.create({
                fullName,
                username,
                email,
                number,
                password
            })
            res.send({msg : "User created successfully"}).status(200)
        } catch (error) {
            console.log("error", error);
            res.send({msg : "Something went wrong. Please try again later"}).status(500)
        }
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
            return res.send({msg : "Incorrect Password. Please try again"})
        }
    }catch(e){
        console.log(e)
    }

})

app.get("/getUsers/edWnUT1XmSiN2p4Ld2gxYxo2EkNpRjbH",async (req, res)=>{
    const users = await User.find()
   res.send(users);
})