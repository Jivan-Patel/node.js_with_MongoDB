function auth(req,res, next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({"msg": "Token not found"});
    }
    else if(token != "valid_token") {
        return res.status(401).json({"msg": "Token does not match"});
    }

    console.log("Token verified");

    next();
}

module.exports = auth;