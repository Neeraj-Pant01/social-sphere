const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

module.exports = verifyToken = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];

        jwt.verify(token, process.env.JWTKEY, (err, payload) => {
            if (err) return next(createError(404, "invalid token"))

            req.user = payload;
            next();

        })
    } else {
        return next(createError(403, "auth header is not present"))
    }
}

module.exports = verifyToken;
