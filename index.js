require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db")
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const bodyParser = require('body-parser');
const methodOverride = require("method-override");


const app = express();

// database 
connectDB();

// app.use(bodyParser)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static("./public"));
app.use(methodOverride('_method'))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl:process.env.MONGO_URI
    })
  }));

app.use(passport.initialize())
app.use(passport.session())

app.use(expressLayouts)
app.set("layout",'./layouts/main')
app.set("view engine","ejs")


// Routes 
app.use(require("./routers/auth.routes"));
app.use(require("./routers/main.routes"));
app.use('/dashboard',require("./routers/dashboard.routes"));

const PORT = 8800 || process.env.PORT;
app.listen(PORT,(err)=>{
    if(err) console.log(err);
});