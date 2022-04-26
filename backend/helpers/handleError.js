

const handleError = (res,err,status) => {
    return res.status(status).json({errors : [{message: err}]})
}


module.exports = { handleError } 