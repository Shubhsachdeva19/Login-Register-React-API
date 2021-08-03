const mongoose = require('mongoose')

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    // useNewUrlParser=true,
    // useCreateIndex=true,
    // useUnifiedTopology=true,
    // useFindAndModify=true
}).then(() =>{
    console.log("Connection Sucessful");
}).catch((err) => console.log('no connection'));