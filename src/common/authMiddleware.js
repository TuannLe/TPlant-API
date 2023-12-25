import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

export const verifyToken = async (req, res, next) => {
    const _token = req.headers.token
    if (_token) {
        try {
            const accessToken = _token.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
                if (err) {
                    res.status(403).json("Token không hợp lệ 1")
                } else {
                    req.user = user
                    next()
                }
            })
        } catch (error) {
            return res.status(403).json("Token không hợp lệ 2")
        }
    } else {
        return res.status(401).json("Bạn chưa gủi kèm mã token")
    }
}