const mongoose = require("mongoose");

const connection = async () =>{
    try{
        await mongoose.connect(`${process.env.DBURI}`);
        console.log("database is connected successfully !")

        mongoose.connection.on("disconnected", ()=>{
            console.log("databse connection lost attempting to reconnect again ....")
        })
        
    }catch(err){
        console.log(err.message)
    }
}

module.exports = connection;