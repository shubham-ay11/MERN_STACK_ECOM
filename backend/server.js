const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// handling uncaught exception errors

process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log("shutting down due to unhandle uncaugth errors");
  process.exit(1);
})
//config

dotenv.config({ path: "backend/config/config.env" });
//connecting DB

connectDB();

const server=app.listen(process.env.PORT, () => {
  console.log(`Server working on on http://localhost:${process.env.PORT}`);
});


//Unhandled promise rejections

process.prependListener("unhandledRejection", (err)=>{
console.log(`Error: ${err.message}`);
console.log("Shuting down server due to unhandled promises");

server.close(()=>{
  process.exit(1);
})

})