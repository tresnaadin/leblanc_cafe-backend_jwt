const database = require('../Config/Databases')
const user = {}

user.getAll = () => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM public."user" ORDER BY "userID" ASC`)
        .then((res) => {
            console.log(res)
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

user.getByUser = (user) => {
    return new Promise((resolve, reject) =>{
        database
            .query(`SELECT * FROM public."user" WHERE username = '${user}' ` )
                .then((result) => {
                    resolve(result.rows)
                }).catch((err) => {
                    reject(err)
                });
    })
}

user.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO "user" (name, username, picture, password, role) VALUES ('${data.name}', '${data.username}', '${data.picture}', '${data.password}', '${data.role}')`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

user.setToken = (token, username) => {
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public."user" SET token = '${token}' WHERE username = '${username}'`)
        .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
    })
}

module.exports = user