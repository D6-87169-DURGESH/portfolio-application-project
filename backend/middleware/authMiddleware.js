const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    //console.log("Authorization Header:", authHeader); 

    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract only the token part
    //console.log("Extracted Token:", token); // Debugging

    if (!token) {
        return res.status(401).json({ error: "Token format invalid" });
    }

    try {
        const verified = jwt.verify(token, config.JWT_SECRET); // Use correct secret key
        req.user = verified;
        next();
    } catch (error) {
        //console.error("JWT Verification Error:", error.message); // Debugging
        res.status(400).json({ error: "Invalid Token", details: error.message });
    }
};
