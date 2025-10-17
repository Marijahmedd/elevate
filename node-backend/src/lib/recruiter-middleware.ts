import { Request, Response, NextFunction } from "express"
import { prisma } from "./prisma"



export const recruiterRequest = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "Unauthenticated request" })
    }
    try {
        const recruiterData = await prisma.recruiter.findUnique({
            where: {
                userId: req.user.id
            },
            select: {
                id: true
            }
        })
        if (!recruiterData) {
            return res.status(403).json({ success: false, error: "User is not registered as recruiter" })
        }
        req.user.recruiterId = recruiterData.id
        console.log(req.user)
        next()

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" })
    }
}