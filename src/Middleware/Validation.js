const responseCode = require('../helper/Response')
const model = require('../Model/User')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const response = require('../helper/Response')

const tokenize = (req, res, next) => {
    const {token} = req.headers

    if(!token) {
        const result = {
            msg : "Required token!"
        }
        return responseCode(res, 401, result)
    }
    decodeUser = jwtDecode(token)

    jwt.verify(token, process.env.SECRET_KEY, async (err) => {
        const payload = {
            error : err
        }
        if (err){
            return responseCode(res, 401, err)
        }
        if (err == 'jwt expired') {
            const newToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 1500})
            const updateToken = await model.setToken(newToken, decodeUser.username)
        }
        next()
    })
}
module.exports = tokenize