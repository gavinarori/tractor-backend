const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    console.log('Cookies received in authMiddleware:', req.cookies); 

    const { accessToken } = req.cookies;

    if (!accessToken) {
        console.error('Access token missing in cookies');
        return res.status(401).json({ error: 'Please login first' }); 
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);
        req.role = decodedToken.role;
        req.id = decodedToken.id;

        console.log('Token decoded successfully:', decodedToken); 
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Please login' });
    }
};
