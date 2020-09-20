const express = require('express')
const controller = require("../Controller/User")
const upload = require('../Middleware/PicUpload')
const redis = require('../Middleware/RedisCache')
const Route = express.Router()

Route.get("/",redis, controller.all)
Route.post("/",upload.single("picture"), controller.add)

module.exports = Route