function response(res, status, result = ""){
    let message = ""
    
    switch (status) {
        case 200: 
            message = "OK"
            break
        case 201:
            message = "Created!"
            break
        case 401: 
            message = "Unauthorized"
            break
        case 403: 
            message = "Forbidden"
            break
        case 404:
            message = "Not Found"
            break
        case 500:
            message = "Internal Server Error"
            break
        default:
            message = ""
    }

    const isObject =  (data) => {
        return !!data && data.constructor === Object
    }

    const results =  {
        status: status,
        description : message,
        result: isObject(result) ? [result] : Array.isArray(result) ? result : result,
    }
    res.status(status).json(results)
}

module.exports = response
