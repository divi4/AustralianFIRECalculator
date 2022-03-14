const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo") (session)

const connectDB = require("./config/db")
const calculatorRoutes = require("./routes/calculator")

require("dotenv").config({path: "./config/.env"})

connectDB()

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(require('cors')());

// Sessions
app.use(
  session({
    secret: "nyan cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// app.use(methodOverride('_method'))

// The path parameter just makes the code clean by separating this specific
// code in a separate file
app.use("/", calculatorRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server is now running on localhost:${process.env.PORT}`)
})
