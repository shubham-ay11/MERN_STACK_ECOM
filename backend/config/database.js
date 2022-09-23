const mongoose= require('mongoose');
const dotenv= require("dotenv");

const connectDB = () =>{

    mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

        console.log(`MongoDb conneted with server: ${process.env.PORT}`);
        
        
        })
}

module.exports= connectDB;