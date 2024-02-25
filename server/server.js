const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/locationRoutes"));

const port = process.env.PORT || 9090

//listen port
app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}`)
})
