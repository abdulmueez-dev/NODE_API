require('dotenv').config();
const express =require("express");
const app =express();
const mongoose =require("mongoose");
const cookieParser = require('cookie-parser')

// CONNECTING TO DATABASE
// mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
// const db=mongoose.connection
// db.on('error',(error) => console.log(error))
// db.once('open', () => console.log('Connected to DB'))
const DB=process.env.DATABASE_URL
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() =>{
     console.log("Connected to database");
}).catch((err)=>console.log(err));


// ACCEPTING JSON IN BODY
app.use(express.json());

// CREATING ROUTES
const usersRouter=require('./routes/users')
app.use(cookieParser())
app.use('/users',usersRouter)


// SET LISTENING PORT
const PORT= process.env.PORT || 3000
app.listen(PORT,() =>(console.log(`Listening on port ${PORT} `)));