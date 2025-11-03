import type { JobType, LocationType } from "@/lib/constants";


export type Recruiter = {
    organizationName: string
    organizationImageKey: string


}

export type Job = {
    id: string;
    title: string;
    city: string;
    jobType: JobType;
    location: LocationType;
    salaryMin: number;
    salaryMax: number;
    recruiter: Recruiter
}


export type JobDetails = {
    location: LocationType;
    recruiter: Recruiter
    city: string;
    id: string;
    salaryMin: number | null;
    salaryMax: number | null;
    title: string;
    jobType: JobType;
    description: string;
    createdAt: string;
}


