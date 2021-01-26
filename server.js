const mongoose = require('mongoose')
const express = require('express')
const userModel = require('./models/User')
const app = express()

//Configure the environment variables with .env 
require('dotenv').config({path:'./config/.env'});

//Connect database locally 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(() => {
    console.error("Database connection error");
  });
mongoose.set("useCreateIndex", true);

app.use(express.json())

//Lunch a server 
const port = process.env.PORT || 5000
app.listen(port, err => err ? console.log(err) : console.log(`server is running on port ${port}`))

//GET route 
app.get('/users', (req, res) => userModel.find({}).exec((err,allUsers) => {
  if (err) res.send(err)
  else res.send(allUsers)
}))

//POST route
app.post('/user', (req,res) => userModel.create(req.body, (err, newUser) => {
  if (err) res.send(err)
  else res.send(newUser)
})) 

//PUT route
app.put('/users/:id', (req,res) => userModel.findOneAndUpdate({_id:req.params.id}, 
  {$set: {name: req.body.name, email: req.body.email, dateOfBirth:req.body.dateOfBirth, phone: req.body.phone}}, {upsert: true},
  (err, updatedUser) => {
  if (err) res.send(err) 
  else res.send(updatedUser)
}))

//DELETE route
app.delete('/user/:id', (req,res) => userModel.findOneAndRemove({_id:req.params.id},
  (err, removedUser) => {
  if (err) res.send(err) 
  else res.send(removedUser)
  }))

