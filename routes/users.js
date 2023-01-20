const express = require('express');
const user = require('../models/user');
const router = express.Router();
const User= require('../models/user')
const jwt = require('jsonwebtoken')
const authenticate= require('../middleware/authenticate')


// GETTING ALL
router.get('/', async(req,res)=>{
    try{
        const users =  await User.find()
        res.json(users)
    }catch (err) {
        res.json({message: err.message}).status(500)
    }
})


// GETTING ONE
router.get('/:id',getUser,(req,res)=>{
    res.send(req.rootUser)
})


// CREATING ONE
router.post('/',async(req,res)=>{
    let token;
    const user= new User({
        name:req.body.name,
        email:req.body.email
    })

    // Authentication
    token = await user.generateAuthToken();
    // console.log(token)
    res.cookie('jwtoken',token,{
        expires: new Date(Date.now()+25892000000),
        // httpOnly:true
    })

    try{
        const newUser=await user.save();
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message :err.message})
    }
})


// UPDATING ONE
router.put('/:id',getUser,authenticate,async(req,res)=>{

    if (req.body.name != null){
        res.user.name = req.body.name
    }
    if (req.body.email != null){
        res.user.email = req.body.email
    }

    try {
        const updatedUser= await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        return res.status(500).json({message:err.message})
    }
})


// DELETING ONE
router.delete('/:id',getUser,async(req,res)=>{
    try {
        await res.user.remove()
        res.json({message:'Deleted User'})
    }catch(err){
        res.status(400).json({message :err.message})
    }
})


// CREATING MIDDLE WARE
async function getUser(req,res,next){
    let user
    try {
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({message:err.message})
    }
    res.user=user
    next()
}



module.exports = router