const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors= require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authenticate = require('./middleware/authenticate')
app.use(cors())
dotenv.config({ path: './config.env'});

//database connection
require('./db/conn')

//database schema
const User = require('./schema/userSchema');

// const post = mongoose.model("User")

app.use(bodyParser.json())
    .use(morgan())
// app.use(require('./router/auth'));
// const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello from Express, Backend is running at port => 5000")
});

app.get('/register',async (req, res) =>{
        try{
            const post = await User.find({})
            res.send(post)
        } catch(error){
            res.status(500)
        }
});

app.get('/register/:registerId', async (req, res) =>{
    try {
        const post = await User.findOne({ _id: req.params.registerId })
        res.send(post)
    } catch (error) {
        res.status(500)
    }
})

app.post("/register", async (req, res, next) => { 
    const {email, contact_no} = req.body 
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    // search for user is already exists 
    const isUserFound = await User.findOne({email}) 
    // if user is already exists 
    if(isUserFound){ 
        res.status(400).json({message : "user is already existed"}) 
    }
    else{ 
        // is user is not exists then proceed to signup 
        const user = new User({ 
            _id: new mongoose.Types.ObjectId(), 
            username: req.body.username, 
            email: req.body.email, 
            phone: req.body.phone,
            password: hashedPassword
        }); 
        // posting the new user to the collections 
        user .save() .then(result => { 
            // console.log(result); 
            res.status(201).json({
                message: "user is succesfully registered", createdUser: result }); 
        }) 
        // if get any error show that error 
        .catch(err => { 
            res.status(500).json({ error: err }); 
        }); 
    } 
});

app.post("/login", async (req, res, next) => {
    const {email, password} = req.body 
    // find the user by email 
    const isUserFound = await User.findOne({email}) 
    const isPasswordMatched = await bcrypt.compare(password, isUserFound.password); 
    if(isUserFound){ 
        // if user found validate the email and password and send the message to user 
        if(isUserFound.email === email && isPasswordMatched){ 
            // res.status(200).json({message : `welcome ${isUserFound.name}`}) 
            const payload = { email }; 
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN"); 
            res.send({isUserFound, "Token" : jwtToken }); 
        }
        else{ 
            res.status(400).json({message : "please check your email or password"}) 
        } 
    }
    else{
        // if the user is not found send the message 
        res.status(404).json({message : "User is not found"}) } 
    });


// app.post('/login', (req, res) =>{
//         const {email, password} = req.body
//     // if(!email || !password){
//     //     return res.status(422).json({error:"please add email or password"})
//     // }
//     console.log(email)
//     User.findOne({email:email})
//         .then(savedUser =>{
//             //it will check the email is present or not
//             if (savedUser) {
//                 return res.json({message:"Logged in sucessfully"})
//             }
//             else{
//                 return res.json({error:"Invalid Email or password"})
//             }
// })
// })

// app.get('/about', (req, res) => {
//     res.send("Hello from Express About")
// });app.get('/contact', (req, res) => {
//     res.send("Hello from Express Contact")
// });app.get('/service', (req, res) => {
//     res.send("Hello from Express Service")
// });


app.listen(5000, () =>{
    console.log("Server is listening to port: 5000");
})
