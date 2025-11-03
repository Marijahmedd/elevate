import JobCard from "@/components/JobCard"
import JobDetail from "@/components/JobDetail";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { api } from "@/lib/axios"
import { useStore } from "@/store/useStore";
import type { Job } from "@/types/job"
// import { jobList } from "@/lib/mock-data"
import { useQuery } from "@tanstack/react-query"
import { Pagination } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";


const RecruiterDashboard = () => {

    const navigate = useNavigate()
    const user = useStore(state => state.user)
    const [searchParams, setSearchParams] = useSearchParams();
    const jobId: string | null = searchParams.get("job_id")
    let pageNumber = Number(searchParams.get("page")) || 1
    if (pageNumber < 1) {
        pageNumber = 1
    }
    const params = searchParams.toString();
    const filterParams = new URLSearchParams(searchParams) //Seperating so irrelevant params donot refetch job listings
    filterParams.delete("job_id")

    const { isPending, isError, data } = useQuery({
        queryKey: ['recruiterJobs', filterParams.toString(), user?.id],
        queryFn: async () => {
            const data = await api.get(`/recruiter/jobs?${params}`)
            return data
        },
        staleTime: 1000 * 60 * 5
    })

    if (isPending) {
        return <span className="flex items-center justify-center h-150 text-2xl">Loading...</span>
    }

    if (isError) {
        return <span className="flex items-center justify-center h-150 text-2xl">{"Something went Wrong!"}</span>
    }



    const jobList: Job[] = data.data.jobsPosted
    const jobCount: number = jobList.length < 1 ? 1 : jobList.length
    console.log(jobList)

    return (
        <div>
            {jobList.length === 0 ? (
                <div className="flex items-center justify-center h-150 text-2xl">No Jobs Found!</div>
            ) :
                <>
                    <ul className="px-4 min-h-svh">
                        {jobList.map((job) => (
                            <li key={job.id} onClick={() => {
                                navigate(`/recruiter/jobs/${job.id}`)
                            }}>
                                <JobCard job={job} />
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mb-10">
                        <Pagination
                            currentPage={pageNumber}
                            totalPages={Math.ceil(jobCount / 10)}
                            onPageChange={(page: number) => {
                                searchParams.set("page", page.toString());
                                setSearchParams(searchParams);
                            }}
                        />
                    </div>
                </>
            }


            {/* JOB DETAILS PAGE */}



            <Sheet open={!!jobId}>
                <SheetContent side="right" className="sm:w-[600px] w-screen ">
                    <JobDetail />
                </SheetContent>
            </Sheet>

        </div >
    )


}

export default RecruiterDashboard