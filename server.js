const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const upload = require('express-fileupload');
const path = require("path");
const fs = require("fs");

let adminRoutes = require("./routes/admin");
let userRoute = require("./routes/user");

const app = express();

app.use(bodyparser.urlencoded({extended : true}));
app.use(upload());
app.use(express.static("public"));


app.use(session({
    secret : "vip_tech",
    resave : false ,
    saveUninitialized : true 
}));




app.use("/" , userRoute);
app.use("/admin" , adminRoutes);




app.listen(3000, ()=>{
    console.log("project running on 3000");
    
});