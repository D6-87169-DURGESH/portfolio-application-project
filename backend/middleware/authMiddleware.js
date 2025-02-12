const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, "your_secret_key");  
        req.user = verified;                 
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};
