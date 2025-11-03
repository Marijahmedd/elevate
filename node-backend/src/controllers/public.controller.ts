import { Prisma } from "../generated/prisma"
import { lowerCaseCities } from "../../../shared/cities.js"
import { jobTypeEnum, locationEnum } from "../../../shared/constants.js"
import { Request, Response } from "express"
import { prisma } from "../lib/prisma"


export const getPublicJobs = async (req: Request, res: Response) => {
    const pageSize: number = 10
    let skip: number = 0

    const where: Prisma.JobWhereInput = {}
    const { q, location, city, jobtype: jobType, page } = req.query
    console.log(jobType)
    if (typeof location === "string") {
        const upper = location.toUpperCase()
        const validEnum = locationEnum.includes(upper as any)
        if (validEnum) where.location = upper as any
    }
    if (typeof jobType === "string") {
        const upper = jobType.toUpperCase()
        const validEnum = jobTypeEnum.includes(upper as any)
        if (validEnum) where.jobType = upper as any
    }
    if (typeof city === "string") {
        const lower = city.toLowerCase()
        const validEnum = lowerCaseCities.includes(lower)
        if (validEnum) where.city = lower
    }
    if (typeof q === "string" && q.trim().length > 0) {
        where.title = { contains: q, mode: "insensitive" }
    }

    if (typeof page === "string" && !Number.isNaN(parseInt(page))) {
        const pageNumber = Math.floor(parseInt(page))
        if (pageNumber > 0) {
            skip = pageSize * (pageNumber - 1)
        }
    }

    console.log("take " + pageSize + " Skip " + skip)
    console.log("final payload", where)
    try {
        const jobs = await prisma.job.findMany({
            where,
            select: {
                id: true,
                title: true,
                city: true,
                jobType: true,
                location: true,
                salaryMin: true,
                salaryMax: true,
                recruiter: {
                    select: { organizationName: true, organizationImageKey: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: pageSize, skip: skip

        })

        const count = await prisma.job.count({ where })
        return res.status(200).json({ success: true, jobs, count })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Cannot fetch data." })

    }
}


export const getPublicJobDetails = async (req: Request, res: Response) => {
    const jobId = req.params.id
    try {
        const jobDetails = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
            select: {
                id: true, city: true,
                createdAt: true, jobType: true, location: true, salaryMax: true, salaryMin: true, title: true, description: true,
                recruiter: {
                    select: {
                        organizationName: true,
                        organizationImageKey: true
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






