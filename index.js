const express=require("express");
const app=express();
let port =8080;
let path =require("path");

app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.static(path.join(__dirname,"public/css")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/",(req,res)=>{
    res.send("promise file");
});

app.get("/roldice",(req,res)=>{
    let diceVal=Math.floor(Math.random()*6)+1;

    res.render("roldice.ejs",{diceVal});
});

app.get("/ig/:username",(req,res)=>{
    const {username}=req.params;
    const instaData=require("./data.json");
    const data=instaData[username];
    if(data){
        res.render("instagram.ejs",{data});
    }
    else{
        res.render("error.ejs");
    }
});

app.get("/is/:usernames",(req,res)=>{
    const fbData=require("./fb.json");
    const {usernames}=req.params;
    // let data=fbData[usernames];
    res.render("facebook.ejs",{fbData});
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
