import { Request, Response } from "express"
import z, { success } from "zod"
import { prisma } from "../lib/prisma"

export const updateAiScore = async (req: Request, res: Response) => {
    console.log("Request recieved in webhook")
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(403).json({ success: false, error: "Auth header missing" })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        console.log("Request recieved in first check", token)
        return res.status(403).json({ success: false, error: "Token missing" })

    }


    if (!(token === process.env.INTERNAL_TOKEN as string)) {
        console.log("Request recieved in second check", token)

        return res.status(403).json({ success: false, error: "Invalid token." })
    }


    const lambdaSchema = z.object({
        applicationId: z.string().min(30).max(40),
        aiScore: z.number().gt(-1).lt(11)
    })


    const parsedData = lambdaSchema.safeParse(req.body)

    if (!parsedData.success) {
        console.log("Request in parse check ", parsedData.data)
        return res.status(400).json({ success: false, error: "Invalid input!" })
    }
    const { applicationId, aiScore } = parsedData.data
    try {

        const response = await prisma.jobApplication.update({
            where: {
                id: applicationId
            },
            data: {
                ai_score: aiScore
            }
        })

        console.log(response)

        return res.status(200).json({ success: true, message: "Successfully updated ai score for application ID", applicationId })




    } catch (error: any) {
        console.log(error)
        if (error.code === "P2025") {
            return res.status(404).json({ success: false, error: "No such job application exists" })

        }

        return res.status(500).json({ success: false, error: "Internal Server Error" })
    }


}