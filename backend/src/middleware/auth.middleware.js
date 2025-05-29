import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};