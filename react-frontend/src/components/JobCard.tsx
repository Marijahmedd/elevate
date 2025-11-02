import { jobTypeLabels, LocationTypeLabels } from "@/lib/constants"
import { capitalizeFirst, convertIntoK } from "@/lib/utility"
import type { Job } from "@/types/job"
import { Banknote, Briefcase, Clock, MapPin } from "lucide-react"
const JobCard = ({ job }: { job: Job }) => {
    const capsuleStyle: string = "flex items-center gap-2 text-white text-sm border-1 px-3 py-1 rounded-lg w-max hover:bg-neutral-700 whitespace-nowrap truncate"
    return (
        <div className="flex flex-col bg-[#212121] w-full my-5 p-5 rounded-lg gap-10 min-h-[150px]">

            <div className="flex items-center gap-4">
                <img
                    src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_1920,c_limit/google-logo.jpg"
                    alt="User"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h1 className="font-bold text-lg truncate">{job.title}</h1>
                    <div className="text-gray-300 text-sm truncate">{job.recruiter.organizationName}</div>
                </div>
            </div>



            <div className="flex flex-wrap gap-2">
                <div className={capsuleStyle}>
                    <MapPin size={14} className="shrink-0" />
                    <span>{capitalizeFirst(job.city)}</span>
                </div>
                <div className={capsuleStyle}>
                    <Clock size={14} className="shrink-0" />
                    <span>{jobTypeLabels[job.jobType]}</span>
                </div>
                <div className={capsuleStyle}>
                    <Briefcase size={14} className="shrink-0" />
                    <span>{LocationTypeLabels[job.location]}</span>
                </div>
                {
                    job.salaryMax && job.salaryMin &&
                    <div className={capsuleStyle}>
                        <Banknote size={14} className="shrink-0" />
                        <span>{convertIntoK(job.salaryMin)}-{convertIntoK(job.salaryMax)}</span>
                    </div>
                }
                <div>
                </div>
            </div>

        </div >
    )
}

export default JobCard