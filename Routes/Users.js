const express = require('express');
const Users = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../schema/userData');
const User = mongoose.model('userData');
const basicAuth = require("basic-auth");
const dotenv =  require('dotenv');

Users.get('/', (req, res) => {
    res.send('Welcome to COKE-N-CODE');
});

function auth(req, res, next) {
    dotenv.config();
    const user = basicAuth(req);
  
    if (!user || !user.name || !user.pass) {
        res.set("WWW-Authenticate", 'Basic realm="Enter username and password"');
        res.status(401).send({msg: 'Authentication required'});
        return;
    }

    if (user.name === process.env.USER_NAME && user.pass === process.env.PASS_WORD) {
        next();
    } else {
        res.set("WWW-Authenticate", 'Basic realm="Enter username and password"');
        res.status(401).send({msg: 'Invalid credentials'});
        return;
    }
}


//SIGNUP USER
Users.post('/signup', async (req, res) => {
    const { fullName, username, email, password } = req.body;
    const mailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (mailExists) {
        return res.send({ msg: 'User already exists. Please login' });
    }
    if (usernameExists) {
        return res.send({ msg: 'Username already taken. Please try another one' });
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                fullName,
                username,
                email,
                password: hashedPassword,
                avatar: Math.floor(Math.random() * 10) + 1,
            });
            res.send({ msg: 'User created successfully' }).status(200);
        } catch (error) {
            console.log('error', error);
            res
                .send({ msg: 'Something went wrong. Please try again later' })
                .status(500);
        }
    }
});

//LOGIN USER
Users.post('/login-user', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    try {
        if (!user) {
            return res.send({ msg: 'User not found' });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return res.send({ msg: 'Logged in successfully' });
            } else {
                return res.send({
                    msg: 'Incorrect password. Please try again',
                });
            }
        }
    } catch (error) {
        console.log(error);
        res
            .send({ msg: 'Something went wrong. Please try again later' })
            .status(500);
    }
});


//GET ALL USERS
Users.get('/getUsers', auth ,async (req, res) => {
    const allUsers = await User.find();
    if (allUsers) {
        res.send(allUsers).status(200);
    }
    else {
        res.send({ msg: 'No users found' }).status(404);
    }
});

//GET USER BY USERNAME
Users.get('/getUsers/:username',  async (req, res) => {
    const singleUser = await User.find({ username: req.params.username });
    if (singleUser) {
        res.send(singleUser).status(200);
    }
    else {
        res.send({ msg: 'User not found' }).status(404);
    }
});

//DELETE USER BY USERNAME
Users.delete('/deleteUser/:username', auth, async (req, res) => {
    const userExist = await User.deleteOne({ username: req.params.username });
    if (userExist) {
        res.send({ msg: 'User deleted successfully' }).status(200);
    } else {
        res.send({ msg: 'User not found' }).status(404);
    }
});

//DELETE ALL USERS
Users.delete('/deleteAllUsers', auth ,async (req, res) => {
    const userExist = await User.deleteMany();
    if (userExist) {
        res.send({ msg: 'All users deleted successfully' }).status(200);
    } else {
        res.send({ msg: 'No users found' }).status(404);
    }
});

//CHANGE PASSWORD
Users.put('/changePassword', async (req, res) => {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });

    try {
        if (!user) {
            return res.send({ msg: 'User not found' }).status(404);
        } else {
            if (password === newPassword) {
                return res.send({ msg: 'New password cannot be same as old password' }).status(400);
            }
            else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(newPassword, salt);
                    user.password = hashedPassword;
                    await user.save();
                    return res.send({ msg: "Password changed successfully" });
                } else {
                    return res.send({ msg: "Incorrect password. Please try again" });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.send({ msg: "Something went wrong. Please try again later" }).status(500);
    }
});


module.exports = Users;