import { Request, Response, NextFunction } from "express"
import { OAuth2Client } from "google-auth-library"
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

        try {
            if (!payload || !payload.email) {
                return res.status(403).send({ "error": "Unable to Sign In" })
            }
            const userData = {
                email: payload.email,
                picture: payload?.picture ?? null,
                fullName: payload?.name ?? null
            }
            // store user in prisma table , using upsert, so that only 1 query because otherwise we will make 1 query to find if user exists then if exist we will sign base upon it otherwise we will create new user
        } catch (error) {
            return res.status(500).send({ "error": "Internal server error" })

        }

    } catch (error) {
        res.status(500).send({ error: "Error verifying Google Token" })
    }


}




const signJWT = (token: string) => {

}
