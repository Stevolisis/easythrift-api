// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.walletAddress = decoded.walletAddress;
        req.role = decoded.role;
        req.id = decoded.id;

        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};