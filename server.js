require('dotenv').config();
const express =require("express");
const app =express();
const mongoose =require("mongoose");

// CONNECTING TO DATABASE
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
const db=mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))

// ACCEPTING JSON IN BODY
app.use(express.json());

// CREATING ROUTES
const usersRouter=require('./routes/users')
app.use('/users',usersRouter)


// SET LISTENING PORT
app.listen(3000,() =>(console.log("Listening on port 3000")));