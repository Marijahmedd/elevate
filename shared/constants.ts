const jobTypeEnum = ["INTERNSHIP", "FULL_TIME", "PART_TIME"] as const


const locationEnum = ["REMOTE", "ONSITE", "HYBRID"] as const

const ApplicationStatusEnum = [
    "PENDING_REVIEW",
    "SHORTLISTED",
    "REJECTED",
    "ACCEPTED"
] as const



export { jobTypeEnum, locationEnum, ApplicationStatusEnum }