import { Request, Response, NextFunction } from "express"
import { verifyJWT } from "./verifyJwt"
import { JwtPayload } from "jsonwebtoken"


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
            }
        }
    }

}

export const authenticatedReq = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers["authorization"]

    if (!auth?.startsWith("Bearer ")) {
        return res.status(401).send({ error: "Missing token header." })
    }
    const token = auth.split(" ")[1]
    try {
        const decoded = verifyJWT(token)
        console.log(decoded)
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
        return res.status(401).send({ error: "JWT verification failed", err })
    }
}
