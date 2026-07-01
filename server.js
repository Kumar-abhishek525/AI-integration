const express = require("express")
const dotenv =require("dotenv")
const connectDB = require("./config/db")
const chatRoutes = require("./routes/chatRoutes")
const cors = require("cors")
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("student double solver is running");
});
app.use("/api",chatRoutes);
const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
        console.log(`server stared at  http://localhost:${PORT}`);
});