const responseCode = require('../helper/Response')
const DBuser = require('../Model/User')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const checkRole = async (req, res, next) => {
    try {
        const {token} = req.headers

        const jwtToken = jwtDecode(token)
        const userRole = jwtToken.username
        const dataUser = await DBuser.getByUser(userRole)

        if (dataUser[0].role == 'admin'){
            next()
        }else{
            responseCode(res, 401, 'ACCESS BLOCKED!')
        }
    } catch (error) {
        return responseCode(res, 500, 'ACCESS ERROR!')
    }
}
module.exports = checkRole