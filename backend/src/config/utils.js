import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId, role, res) => {
    const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d' // 1 day
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    })

    return accessToken
}


export const generateRefreshToken = (userId, role, res) => {
    const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return refreshToken
}