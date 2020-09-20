const database = require("../Config/Databases")
const History = {}

History.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM history ORDER BY id ASC")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

History.Add = (invoice, date, orders, amount, cashier) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO history (invoice, date, orders, amount, cashier) VALUES ('${invoice}', '${date}', '${orders}', '${amount}', '${cashier}');`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

History.Edit = (id, invoice, date, orders, amount, cashier) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE history SET invoice='${invoice}', date='${date}', orders='${orders}', amount='${amount}', cashier='${cashier}' WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

History.Delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM history WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}
module.exports = History