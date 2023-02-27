const express = require("express");
const connection = require("./connection");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("./schema/userData");
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is running");
});


app.get("/", (req, res) => {
    res.send("Welcome to COKE-N-CODE");
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
        return res.send({msg : "Number already exists. Please login"})
    }
    else{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            await User.create({
              fullName,
              username,
              email,
              number,
              password: hashedPassword,
              avatar :  Math.floor(Math.random() * 10) + 1
            });
            res.send({msg : "User created successfully"}).status(200)
        } catch (error) {
            console.log("error", error);
            res.send({msg : "Something went wrong. Please try again later"}).status(500)
        }
    }      
})


app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    try {
      if (!user) {
        return res.send({ msg: "User not found" });
      }
      else{
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return res.send({ msg: "Logged in successfully" });
        } else {
          return res.send({ msg: "Incorrect password. Please try again" });
        }
      }
    } catch (error) {
      console.log(error);
      res.send({ msg: "Something went wrong. Please try again later" }).status(500);
    }
  });

app.get("/getUsers/edWnUT1XmSiN2p4Ld2gxYxo2EkNpRjbH",async (req, res)=>{
    const users = await User.find()
   res.send(users);
})

app.get("/getUsers/:username",async (req, res)=>{
    const users = await User.find({username : req.params.username})
   res.send(users);
})