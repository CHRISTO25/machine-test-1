import jwt from 'jsonwebtoken';

export const generateUserToken = (res, userData) => {
console.log("====================================================token generate il vannu");
    const { _id, name, email, phone } = userData
    const jwtSecretKey = process.env.JWT_SECRET
    if (!jwtSecretKey) {
        throw new Error("JWT Secret key must be set!");
    }
    const token = jwt.sign({ _id, name, email, phone }, jwtSecretKey, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return token;
}

