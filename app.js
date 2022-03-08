const path = require("path")
const express = require("express")
const methodOverride = require('method-override')
const app = express()
// This project doesn't need to store data
// const mongoose = require("mongoose")
// const session = require("express-session")
// const MongoStore = require("connect-mongo") (session)

// const connectDB = require("./config/db")
const calculatorRoutes = require("./routes/calculator")

require("dotenv").config({path: "./config/.env"})

// connectDB()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use("/", calculatorRoutes)
// app.use("/post", calculatorRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is now running on PORT: ${process.env.PORT}`)
})
