export const authenticateJWT = (c: any, next: () => Promise<void>) => {
    const authHeader = c.req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return c.status(401).json({ error: 'Token not found' });
    }

    try {
        var jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        c.set('user', decoded);
        return next();
    } catch (error) {
        return c.status(403).json({ error: 'Invalid token' });
    }
};
