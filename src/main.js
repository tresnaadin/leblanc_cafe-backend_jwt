const express = require("express")
const product = require('./Routes/Product')
const history = require('./Routes/History')
const category = require('./Routes/Category')
const user = require('./Routes/User')
const auth = require('./Routes/Authentication')
const Routes = express.Router()

Routes.use("/product", product)
Routes.use("/history", history)
Routes.use("/category", category)
Routes.use("/user", user)
Routes.use('/auth', auth)
Routes.use("/public", express.static("public"))

Routes.get("*", (req, res) =>{
    res.status(500).json('OOPS! PAGE NOT FOUND.')
})

module.exports = Routes