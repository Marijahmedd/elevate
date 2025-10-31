import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import { prisma } from "../lib/prisma"
import { signJWT } from "../lib/signJwt"


export const GoogleLogin = async (req: Request, res: Response) => {
    const token = req.body.token
    if (!token) {
        res.status(403).json({ success: false, error: "Missing token" })
        return
    }
    console.log("req recieved in login api")
    const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(403).json({ success: false, error: "Unable to Sign In" })
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

            return res.status(200).json({ success: true, message: "successfully logged in", user, accessToken })

        } catch (err) {
            return res.status(500).json({ success: false, error: "Internal server error", })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Error verifying Google Token" })
    }
}






