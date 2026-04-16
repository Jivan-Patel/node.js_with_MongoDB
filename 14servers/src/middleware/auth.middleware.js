function auth(req,res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({"msg": "Token not found"});
    }
    next();
}

module.exports = auth;