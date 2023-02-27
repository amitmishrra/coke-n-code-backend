const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://gigacode_xyz:noBitchesFound@gigacode.jahasu6.mongodb.net/?retryWrites=true&w=majority"
module.exports  = mongoose.connect(mongoURL, {
    useNewUrlParser : true
}).then(()=>{
    console.log("connected with database;")
}).catch(e=>{
    console.log("error in connection;", e)
})