const express = require("express");
const connection = require("./connection");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Users = require("./Routes/Users");

require('./schema/userData');

app.use(express.json());
app.use(cors());
app.use('/', Users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running');
});
