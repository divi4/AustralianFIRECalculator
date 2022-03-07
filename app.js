const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo") (session)
const connectDB = require("./config/db")

require("dotenv").config({path: "./config/.env"})

// connectDB()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log("Server is running")
})
