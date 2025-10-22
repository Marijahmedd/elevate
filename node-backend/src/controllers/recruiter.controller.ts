import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { lowerCaseCities } from "../data/cities"
import { ApplicationStatusEnum, jobTypeEnum, locationEnum } from "../data/constants"
export const postJob = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    if (!req.user.recruiterId) {
        return res.status(403).json({ success: false, error: "User is not registered as a recruiter!" })
    }
    const jobBodySchema = z.object({
        city: z.enum(lowerCaseCities),
        description: z.string().trim().min(30).max(3000),
        location: z.enum(locationEnum),
        title: z.string().trim().min(10).max(100),
        salaryMin: z.number().gt(0).lt(100000000), //1crore
        salaryMax: z.number().gt(0).lt(100000000),//1crore
        jobType: z.enum(jobTypeEnum)
    })
    let lowerCaseCity
    if (req.body.city && typeof req.body.city === "string") {
        const cityFromBody = req.body.city
        lowerCaseCity = cityFromBody.toLowerCase()
    }
    let upperCaseLocation
    if (req.body.location && typeof req.body.location === "string") {
        const locationFromBody = req.body.location
        upperCaseLocation = locationFromBody.toUpperCase()
    }
    let upperCaseJobType
    if (req.body.jobType && typeof req.body.jobType === "string") {
        const jobTypeFromBody = req.body.jobType
        upperCaseJobType = jobTypeFromBody.toUpperCase()
    }
    req.body = { ...req.body, city: lowerCaseCity, location: upperCaseLocation, jobType: upperCaseJobType }

    const parseResult = jobBodySchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ success: false, error: "Invalid input provided" })
    }

    const { city,
        description,
        location,
        title,
        salaryMin,
        salaryMax, jobType } = parseResult.data

    if (salaryMin > salaryMax) {
        return res.status(400).json({ success: false, error: "Minimum salary cannot be more than maximum salary" })
    }

    try {
        const job = await prisma.job.create({
            data: {
                city,
                description,
                location,
                title,
                recruiterId: req.user.recruiterId,
                salaryMin,
                salaryMax,
                jobType,
            }
        })
        return res.status(201).json({ success: true, message: "New job has been posted!" })

    } catch (err) {
        return res.status(500).json({ success: false, error: "Unable to post new job!" })

    }
}


export const getPostedJobs = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in." })
    }
    if (!req.user.recruiterId) {
        return res.status(403).json({ success: false, error: "User is not registered as recruiter recruiter." })
    }
    try {
        const jobsPosted = await prisma.job.findMany({
            where: {
                recruiterId: req.user.recruiterId

            },

            select: {
                id: true,
                title: true,
                jobType: true,
                location: true,
                salaryMax: true,
                salaryMin: true,
                createdAt: true,
                city: true,
                recruiter: {
                    select: {
                        organizationName: true,
                    }
                }
            }
            , orderBy: {
                createdAt: "desc"
            }
        })
        return res.status(200).json({ success: true, jobsPosted })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Unable to fetch data" })
    }

}


export const getJobDetails = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    if (!req.user.recruiterId) {
        return res.status(403).json({ success: false, error: "User is not registered as a recruiter!" })
    }
    const jobId = req.params.id
    try {
        const jobDetails = await prisma.job.findUnique({
            where: {
                id: jobId,
                recruiterId: req.user.recruiterId
            },
            select: {
                id: true, city: true,
                createdAt: true, jobType: true, location: true, salaryMax: true, salaryMin: true, title: true, description: true,
                applications: {
                    select: {
                        id: true,
                        ai_score: true,
                        resumeUrl: true,
                        status: true,
                        createdAt: true,
                        applicant: {
                            select: {
                                name: true,
                                email: true,
                                pictureUrl: true,
                                resumeUrl: true
                            }
                        }
                    }
                }
            }
        })
        if (!jobDetails) {
            return res.status(404).json({ success: false, error: "This job does not exist" })

        }
        return res.status(200).json({ success: true, jobDetails })
    } catch (err) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })
    }

}


export const updateApplicationStatus = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, error: "User must be logged in" })
    }
    if (!req.user.recruiterId) {
        return res.status(403).json({ success: false, error: "User is not registered as a recruiter!" })
    }

    const applicationStatusSchema = z.object({
        applicationId: z.string().min(30).max(40),
        status: z.enum(ApplicationStatusEnum),
    })

    const { applicationId, status } = req.body

    if (!applicationId && typeof status !== "string") {
        return res.status(400).json({ success: false, error: "Invalid input" })
    }

    const upperStatus = status.toUpperCase()

    const parsedData = applicationStatusSchema.safeParse({ applicationId: applicationId, status: upperStatus })
    if (!parsedData.success) {
        return res.status(400).json({ success: false, error: "Invalid input" })
    }
    try {
        const updateStatus = await prisma.jobApplication.updateMany({
            where: {
                id: parsedData.data.applicationId,
                job: {
                    recruiterId: req.user.recruiterId
                }
            },
            data: {
                status: parsedData.data.status
            }
        })
        if (updateStatus.count === 0) {
            return res.status(404).json({ success: false, message: "No such application found!" })

        }
        console.log(updateStatus)
        return res.status(200).json({ success: true, message: "Successfully updated status!" })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}



