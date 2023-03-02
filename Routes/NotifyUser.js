// const express = require('express');
// const NotifyUsers = express.Router();
// const mongoose = require('mongoose');
// require('../schema/notifyUsers');

// const NotifyUser = mongoose.model('notifyUsers');

// NotifyUsers.post('/notify-user', async (req, res) => {
//     const userExist = NotifyUser.findOne({ email: req.body.email });

//     if (userExist) {
//         return res.send({ msg: 'User already exists' });
//     }
//     else {
//         try {
//             await NotifyUser.create({
//                 fullName: req.body.fullName,
//                 email: req.body.email,
//             });
//             res.send({ msg: "You'll be notified when hackathon is live " }).status(200);
//         } catch (error) {
//             console.log('error', error);
//             res
//                 .send({ msg: 'Something went wrong. Please try again later' })
//                 .status(500);
//         }
//     }

// });

// NotifyUsers.get('/get-notify-users', async (req, res) => {
//     const users = await NotifyUser.find();
//    if(users){
//        res.send(users).status(200);
//     }
//     else{
//         res.send({msg: 'No users found'});
//     }
// });

// NotifyUsers.delete('/delete-notify-user/:email', async (req, res) => { 
//     const user = await NotifyUser.deleteOne({email: req.params.email});
//     if(user){
//         res.send({msg: 'User deleted successfully'}).status(200);
//     }
//     else{
//         res.send({msg: 'User not found'}).status(404);
//     }
// });

// NotifyUsers.delete('/delete-all-notify-users', async (req, res) => {
//     const users = await NotifyUser.deleteMany();
//     if(users){
//         res.send({msg: 'All users deleted successfully'}).status(200);
//     }
//     else{
//         res.send({msg: 'No users found'}).status(404);
//     }
// });