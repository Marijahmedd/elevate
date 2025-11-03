import { jobTypeEnum, locationEnum, ApplicationStatusEnum } from "../../../shared/constants"
export const user = true


export type JobType = typeof jobTypeEnum[number]
export type LocationType = typeof locationEnum[number]
export type applicationStatusType = typeof ApplicationStatusEnum[number]


export const jobTypeLabels: Record<JobType, string> = {
    INTERNSHIP: "Internship",
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time"
}


export const LocationTypeLabels: Record<LocationType, string> = {
    HYBRID: "Hybrid",
    ONSITE: "On-site",
    REMOTE: "Remote"
}


export const applicationStatusLabels: Record<applicationStatusType, string> = {
    ACCEPTED: "Accepted",
    PENDING_REVIEW: "Pending Review",
    REJECTED: "Rejected",
    SHORTLISTED: "Shortlisted"
}



