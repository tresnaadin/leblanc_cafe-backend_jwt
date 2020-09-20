const redis = require("../Config/RedisConnect")
const responsCode = require("../helper/Response")

const GetAll = (req, res, next) => {
    redis.redisdb.get("cache", (err, respon) => {
        if (err) {
            return responsCode(res, 500, err)
        }

        if (respon !== null) {
            const data = JSON.parse(respon)
            return  responsCode(res, 200, data)
        } else {
            next()
        }
    })
}

module.exports = GetAll