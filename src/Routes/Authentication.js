const { Router } = require('express')
const express = require('express')
const helper = require ('../helper/Authentication')
const Route = express.Router()

Route.post("/", helper.login)

module.exports = Route