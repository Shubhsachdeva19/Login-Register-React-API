const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
// Authentication Middleware 
const authenticateToken = (request, response, next) => { 
    let jwtToken; 
    const {authorization} = request.headers 
    if (authorization !== undefined) { 
        jwtToken = authorization.replace("Bearer ","") 
    } if (jwtToken == undefined) { 
        response.status(401) 
        response.send("Invalid jwt Token") 
    } else {
        jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
            if (error) {
                response.status(401) 
                response.json("Invalid jwt Toke") 
            } else { 
                next() 
            } 
        }) 
    }
} 
            
module.exports = authenticateToken  
