import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

export const createToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { data: user },
            process.env.JWT_ACCESS_TOKEN,
            {
                algorithm: 'HS256',
                expiresIn: process.env.TOKEN_TIME_LIFE
            },
            (err, _token) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(_token)
                }
            }
        )
    })
}
