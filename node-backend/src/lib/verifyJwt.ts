import jwt, { JwtPayload } from "jsonwebtoken"

interface decodedJWT extends JwtPayload {
    userId: string
    email: string
}


export const verifyJWT = (token: string) => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    const decoded = jwt.verify(token, secretKey, { algorithms: ["HS256"] })
    return decoded as decodedJWT
}


