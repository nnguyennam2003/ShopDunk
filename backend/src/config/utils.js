import jwt from 'jsonwebtoken'

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production'

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
    }
}

export const generateAccessToken = (userId, role, res) => {
    const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    })

    res.cookie('accessToken', accessToken, {
        ...getCookieOptions(),
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    })

    return accessToken
}

export const generateRefreshToken = (userId, role, res) => {
    const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })

    res.cookie('refreshToken', refreshToken, {
        ...getCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return refreshToken
}
