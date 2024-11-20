module.exports.authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        console.error('Access token missing in Authorization header');
        return res.status(401).json({ error: 'Please login first' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.role = decodedToken.role;
        req.id = decodedToken.id;

        console.log('Token decoded successfully:', decodedToken);
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Please login' });
    }
};
