const mongoose = require("mongoose");

const conncetDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("MONGODB connected ")

    }
    catch(err){
        console.log("unable to connect",err)
    }
}
module.exports = conncetDB;