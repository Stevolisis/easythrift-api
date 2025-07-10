
exports.isAdmin = (req, res, next) => {
    try{
        if (req?.isAdmin !== true) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};