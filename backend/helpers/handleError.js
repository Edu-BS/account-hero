const handleError = (res, err, status, tipo) => {
    let type = JSON.parse(`{"${tipo}" :{ "message" : "${err}"}}`)
    return res.status(status).json({ errors: type })
}


module.exports = { handleError } 