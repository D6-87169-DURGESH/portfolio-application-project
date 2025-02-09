const jwt = require("jsonwebtoken");

exports.authMiddleware = (request, response, next) => {
    const token = request.header("Authorization");
    if (!token) return response.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, "SECRET"); 
        request.user = verified;
        next();
    } catch (error) {
        response.status(400).json({ error: "Invalid Token" });
    }
     
};
