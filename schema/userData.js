const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
    {
        fullName : String,
        username : {
            type: String,
            required: true,
            unique: true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : String, 
        avatar : Number
    },{
        collection : "userData"
    }
);

mongoose.model("userData", userDataSchema);