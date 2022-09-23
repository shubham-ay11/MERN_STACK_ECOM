const express= require('express');
const errorMiddleware = require ("./middleware/error");
const cors = require("cors");
const cookieParse= require("cookie-parser");
const app= express();
app.use(express.json());
app.use(cookieParse());
//Route Import

const product =require ("./routes/productRoute");
const user =require("./routes/userRoutes")
const order =require("./routes/orderRoutes")


app.use(cors());
 app.use(cors({
    exposedHeaders: ['Authorization', 'authorization','x-api-key','x-token','x-authorization','x-Authorization',],
  }));

app.use("/api/v1", product);
app.use("/api/v1",user);
app.use("/api/v1",order);


//middleware for error 
app.use(errorMiddleware)





module.exports=app