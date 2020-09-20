const express = require("express")
const controller = require("../Controller/Product")
const validate = require('../Middleware/Validation')
const redis = require('../Middleware/RedisCache')
const access = require('../Middleware/Access')
const role = require
const Route = express.Router()

Route.get("/", validate, access, redis, controller.all)
Route.post("/", controller.add)
Route.put("/", controller.edit)
Route.delete("/delete/:id", controller.delete)
Route.get("/search", controller.search)
Route.get("/filter", controller.filter)

module.exports = Route
