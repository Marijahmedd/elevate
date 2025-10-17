import jwt from "jsonwebtoken"

export const signJWT = (payload: Record<string, string | boolean | number>): string => {
    const secretKey = process.env.JWT_SECRET_KEY as string
    const token = jwt.sign(payload, secretKey, { algorithm: "HS256", expiresIn: "7d" })
    return token
}   