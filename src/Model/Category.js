const database = require("../Config/Databases")
const Category = {}

Category.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM category ORDER BY id ASC")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Category.Add = (id, category) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO category (id, category) VALUES (${id}, '${category}');`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

Category.Edit = (id, category) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE category SET category='${category}' WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

Category.Delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM category WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}
module.exports = Category