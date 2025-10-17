import { Request, Response, NextFunction } from "express"
import { verifyJWT } from "./verifyJwt"


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                recruiterId?: string
            }
        }
    }
}

export const authenticatedReq = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers["authorization"]

    if (!auth?.startsWith("Bearer ")) {
        return res.status(401).json({ success: "false", error: "Missing token header." })
    }
    const token = auth.split(" ")[1]
    try {
        const decoded = verifyJWT(token)
        if (!decoded) {
            throw new Error("Jwt verification error")
        }
        const { userId, email } = decoded
        req.user = {
            id: userId,
            email
        }
        next()
    } catch (err) {
        return res.status(401).json({ success: false, error: "JWT verification failed", err })
    }
}
