const bcr = require('bcrypt');

async function hashpassword (password){
    try {
        const salt = await bcr.genSalt(10)
        const resultPass = await bcr.hash(password, salt)
        return resultPass
    } catch (error) {
        throw error
    }
}

module.exports = hashpassword