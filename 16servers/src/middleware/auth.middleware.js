function auth (req, res, next) {
    const token = req.header.token;
    
    if(!token) 
        return res.status(401).json({msg: "Token not found"});

    if(token != 'Valid_Token') 
        return res.status(401).json({msg: "Token is not match"});

    next();
}

module.exports = auth;