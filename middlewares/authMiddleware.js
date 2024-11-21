const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    const  accessToken  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UzYmQzMGY4YmNkYTJiMjdmMjRiZiIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE3MzIxMzcwMDcsImV4cCI6MTczMjc0MTgwN30.gIQ6T55vTs0Gw_SB00CQ4OFaqkGFntUqDFbI79lOFp4
    if (!accessToken) {
        return res.status(409).json({ error: 'Please login first' })
    } else {
        try {
            const deCodeToken = await jwt.verify(accessToken, process.env.SECRET)
            req.role = deCodeToken.role
            req.id = deCodeToken.id
            next()
        } catch (error) {
            return res.status(409).json({ error: 'Please login' })
        }
    }
}