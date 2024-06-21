const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./db/connection");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");


const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan("combined"))


app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "internal server Error"

    return res.status(errStatus).send(errMessage)
})

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)


const port = 9000 || process.env.PORT;

app.listen(port,()=>{
    connection();
    console.log(`server is running at the port ${port}`)
})