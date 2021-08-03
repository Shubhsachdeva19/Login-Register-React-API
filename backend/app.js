const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors= require("cors")
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

app.post('/register', async (req, res) =>{
    try {
        const post = await User();
        post.username = req.body.username;
        post.email = req.body.email;
        post.phone = req.body.phone;
        post.password = req.body.password;

        await post.save()
        res.send(post)
    } catch (error) {
        req.status(500)
    }

})

app.post('/login', (req, res) =>{
        const {email, password} = req.body
    // if(!email || !password){
    //     return res.status(422).json({error:"please add email or password"})
    // }
    console.log(email)
    User.findOne({email:email})
        .then(savedUser =>{
            //it will check the email is present or not
            if (savedUser) {
                return res.json({message:"Logged in sucessfully"})
            }
            else{
                return res.json({error:"Invalid Email or password"})
            }
})
})

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