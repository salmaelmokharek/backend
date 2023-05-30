
exports.handlerError = (err, req, res, next) => {
    if(err.name ==="FileError"){
        return res.status(401).json({success : false, message : "file not authorized"})
    }
    if(err.name ==="UnauthorizedError"){
        return res.status(401).json({success : false, message : "resource not authorized"})
    }
    if(err.name ==="ValidationError"){
        return res.status(400).json({success : false, message : "bad request, invalidate data!"})
    }
    res.status(500).json({success: false, err})

       next()
}
