import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { generatePresignedUrl } from "../lib/presigned-url"
import { invokeLambda } from "../lib/aws"


//register as recruiter
export const registerAsRecruiter = async (req: Request, res: Response) => {

    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    const bodySchema = z.object({
        organizationName: z.string().trim().min(1)
    })
    const parseResult = bodySchema.safeParse(req.body)

    if (!parseResult.success) {
        return res.status(400).json({ success: false, error: "Invalid organization name provided" })
    }
    const { organizationName } = parseResult.data

    try {
        await prisma.recruiter.create({
            data: {
                organizationName,
                userId: req.user.id
            }
        })
        return res.status(201).json({ success: true, message: "Registered as recruiter!" })
    } catch (err: any) {
        if (err.code === "P2002") {
            return res.status(400).json({ success: false, error: "User already registered as recruiter" })

        }
        return res.status(500).json({ success: false, error: "Error while registering as recruiter!" })
    }

}

export const updateResume = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    const resumeBodySchema = z.object({
        resumeUrl: z.string().min(10).max(40)
    })
    const parsedData = resumeBodySchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({ success: false, error: "Invalid input" })
    }
    const resumeUrl = parsedData.data.resumeUrl
    try {
        await prisma.user.update({
            data: {
                resumeUrl
            },
            where: {
                id: req.user.id
            }
        })
        return res.status(200).json({ success: true, error: "Successfully Uploaded Resume" })

    } catch (err) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }
}

export const generatePresignedUrlResume = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ success: false, error: "User must be logged in" })
        }

        const bucket = "elevate-s3-marij";
        const key = req.user.id;
        const contentType = "application/pdf"
        const presignedUrl = await generatePresignedUrl(bucket, key, contentType)
        console.log("Presigned PUT URL:", presignedUrl);
        return res.status(200).json({ success: true, presignedUrl, key: `${key}.pdf` })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

export const applyForJob = async (req: Request, res: Response) => {

    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    const jobId = req.body.jobId
    if (!jobId) return res.status(400).json({ success: false, error: "invalid Input" })

    try {
        const userData = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                resumeUrl: true
            }
        })
        if (!userData) return res.status(404).json({ success: false, error: "No User Found" })
        if (!userData?.resumeUrl) return res.status(403).json({ success: false, error: "Please upload a resume to apply." })

        const jobData = await prisma.job.findUnique({
            where: {
                id: jobId
            },
            select: {
                city: true,
                description: true,
                title: true,
                recruiter: {
                    select: {
                        userId: true
                    }
                }
            }

        })
        if (!jobData) return res.status(404).json({ success: false, error: "No Job Found" })
        if (jobData?.recruiter.userId === req.user.id) {
            return res.status(403).json({ success: false, error: "Cannot appply for this job!" })
        }
        const applicationData = await prisma.jobApplication.create({
            data: {
                resumeUrl: userData.resumeUrl,
                applicantId: req.user.id,
                jobId: jobId,
            }
        })


        const jobInfoForLambda = `title:${jobData.title} description: ${jobData.description} + city: ${jobData.city}`


        invokeLambda({
            applicationId: applicationData.id,
            resumeUrl: userData.resumeUrl,
            jobDescription: jobInfoForLambda
        })

        return res.status(201).json({ success: true, message: "You have applied for this job." })
    } catch (err) {
        if ((err as any).code === "P2002")
            return res.status(403).json({ success: false, error: "You have already applied for this job." })

        return res.status(500).json({ success: false, error: "Internal Server Error", })

    }

}

export const isAppliedForJob = async (req: Request, res: Response) => {
    const jobId = req.params.id

    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    try {
        const status = await prisma.jobApplication.findUnique({
            where: {
                jobId_applicantId: {
                    applicantId: req.user.id,
                    jobId: jobId
                }
            },
        })
        return res.status(200).json({ success: true, isApplied: !!status })

    } catch (err) {
        return res.status(500).json({ success: false, error: "Something went wrong!" })
    }
}