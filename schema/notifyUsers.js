const mongoose = require("mongoose");
 
const notifyUsersSchema = new mongoose.Schema(
    {
        fullName : String,
        email : String,
    },{
        collection : "notifyUsers"
    }
);

mongoose.model("notifyUsers", notifyUsersSchema);