const model = require("../Model/Product")
const response = require("../helper/Response")
const redis = require('../Config/RedisConnect')
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("cache", 25,  data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.add = async (req, res) => {
    try {
        const { name, image, price, category } = req.body
        const data = await model.Add(name, image, price, category)
        return res.status(200).json({ success: true })
    } catch (error) {
        if (error.routine.includes("_bt_check_unique")) {
            return res.status(500).json({ success: false, message: "Name product already on databases!" })
        } else {
            return res.status(500).json(error.routine)
        }
    }

}

Product.edit = async (req, res) => {
    try {
        const { id, name, image, price, category } = req.body
        const data = await model.Edit(id, name, image, price, category)
        return res.send({ success: true, message: "Update successfuly!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

Product.delete = async (req, res) => {
    try {
        const { id } = req.params
        const data = await model.Delete(id)
        if (data.rowCount > 0) {
            return res.send({ success: true, message: "Delete successfuly!" })
        } else {
            return res.status(500).send({ success: false, message: `Data with id ${id} is not found` })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

Product.search = async (req, res) => {
    try {
        const name = req.query.name
        const sensitive = req.query.sensitive
        const data = await model.Search(name, sensitive)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.send({ success: true, message: "not found!" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.filter = async (req, res) => {
    try {
        const type = req.query.type
        const orderBy = req.query.order
        const data = await model.Filter(type, orderBy)
        if (data != false) {
            return res.send(data.rows)
        } else {
            return res.send({ success: false, message: "wrong query!" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = Product
