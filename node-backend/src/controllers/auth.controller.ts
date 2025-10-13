import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import { prisma } from "../lib/prisma"
import { signJWT } from "../lib/signJwt"
export const GoogleLogin = async (req: Request, res: Response) => {
    const token = req.body.token
    if (!token) {
        res.status(403).send({ error: "Missing token" })
        return
    }
    const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(403).send({ "error": "Unable to Sign In" })
        }
        try {
            const userData = {
                email: payload.email,
                pictureUrl: payload?.picture ?? null,
                name: payload?.name ?? null
            }
            const user = await prisma.user.upsert({
                where: {
                    email: userData.email
                },
                update: {
                },
                create: userData
            })

            const jwtData = { userId: user.id, email: user.email }

            const accessToken = signJWT(jwtData)

            return res.status(200).send({ message: "successfully logged in", user, accessToken })

        } catch (error) {
            return res.status(500).send({ "message": "Internal server error", error })
        }
    } catch (error) {
        res.status(500).send({ message: "Error verifying Google Token", error })
    }
}




