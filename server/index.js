const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect("mongodb+srv://skywalk:aBUU2zaejGBhU3P@cluster1.ob5wcgb.mongodb.net/chatting-app",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then(() => console.log("connected successfully to the database...."))
    .catch(err => console.error("can not connect due to an error", err));
    require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.get("/", (req, res)=>{
    res.json({msg:'welcome to my chatting API'});
})
const port = process.env.PORT || 3000;
//const uri = process.env.ATLAS_URI;
app.listen(port, (req, res) =>{
    console.log(`server connected to the port number ${port}`);    
});
/*mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connected successfully to the database...."))
.catch(err => console.error("can not connect due to an error", err));*/