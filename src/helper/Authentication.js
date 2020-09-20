const model = require ('../Model/User');
const responseCode = require ('../helper/Response')
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken');
const authentication = {}

authentication.login = async (req, res) => {
    try {
        const dataUser = await model.getByUser(req.body.username)
        if (dataUser.length == 0){
            return responseCode(res, 404, 'Username Not Found!')
        } else {
            const passUser = req.body.password
            const checkPass = await bcr.compare(passUser,dataUser[0].password)

            if (checkPass){
                const username = dataUser[0].username
                const tokenUser = await authentication.TokenUser(req.body.username)
                const token = tokenUser.tokenRefresh
                const RefreshToken = await model.setToken(token, username)
                return responseCode(res, 200, tokenUser)
            }else {
                return responseCode(res, 200, 'Invalid Username & Password!')
            }
        }
    } catch (error) {
        console.log(error)
        return responseCode(res, 500, error)
    }
}
authentication.TokenUser = async (user, role) => {
try {
    const payload = {
        username : user,
        role : role
    }
    const tokenLimit = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 200} )
    const tokenRefresh = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 7000} )
    const result = {
        tokenLimit : tokenLimit, 
        tokenRefresh : tokenRefresh,
        msg : "Token succesfully created!"
    }
  
    return result
} catch (error) {
    return error
}
}
module.exports = authentication