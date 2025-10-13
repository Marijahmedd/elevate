import { Request, Response, NextFunction } from "express"
import { OAuth2Client } from "google-auth-library"
export const authenticatedReq = async (req: Request, res: Response, next: NextFunction) => {
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
        console.log('Google ID Token Payload:');
        next()
    } catch (error) {
        console.error('Error verifying Google ID token:', error);
        res.status(500).send({ error: "Error verifying Google Token" })
    }
}




const signJWT = (token: string) => {

}
