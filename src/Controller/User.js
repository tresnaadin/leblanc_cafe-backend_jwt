const model = require('../Model/User')
const responseCode = require('../helper/Response')
const hash = require('../helper/HashPass')
const users = {}

users.all = async (request, response) => {
    try {
        const data = await model.getAll()
        console.log(data)
        return responseCode(response, 200 ,data)  
    } catch  {
        return responseCode(response, 500)
    }
}    
users.add = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(500).json("Fill your picture first!")
        } else {
            const hashPass = await hash(req.body.password)
            const data = {
                name : req.body.name,
                username : req.body.username,
                picture : req.file.path,
                password : hashPass,
                role : req.body.role
            }
            const dataUser = model.add(data)
            console.log(data)
            return responseCode(res, 201, 'User has been registered!')
        }

    } catch  {
        return responseCode(res, 500, 'User registration error!')    
    }
} 


module.exports = users
